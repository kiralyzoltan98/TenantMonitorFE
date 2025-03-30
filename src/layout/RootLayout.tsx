import { API_BASE_URL } from "@/config"
import { ApiError } from "@/error/ApiError"
import useTokens from "@/hooks/useTokens"
import { PageContainer } from "@/pages/PageContainer"
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Outlet, useNavigate } from "@tanstack/react-router"
import { useCallback, useRef, useState } from "react"
import { toast, Toaster } from "sonner"

export default function RootLayout() {
    const { refreshToken, setAccessToken, removeAuthTokens } = useTokens()
    const navigate = useNavigate()

    // Use a ref to track the refresh promise to prevent race conditions
    const refreshTokenPromise = useRef<Promise<string | void> | null>(null)

    // Wrap refresh logic in useCallback for stability
    const refreshAuthToken = useCallback(async (): Promise<string | void> => {
        const currentRefreshToken = refreshToken // Capture current refresh token

        if (!currentRefreshToken) {
            console.log("No refresh token found, cannot refresh.")
            removeAuthTokens()
            navigate({ to: "/login", replace: true }) // Redirect to login
            return Promise.reject(new Error("No refresh token"))
        }

        // If a refresh is already in progress, return the existing promise
        if (refreshTokenPromise.current) {
            console.log("Refresh already in progress, waiting...")
            return refreshTokenPromise.current
        }

        console.log("Attempting to refresh token...")
        refreshTokenPromise.current = (async () => {
            try {
                const refreshUrl = `${API_BASE_URL}/v1/refresh/${currentRefreshToken}`
                const response = await fetch(refreshUrl, {
                    method: "POST",
                    headers: new Headers({ "Content-Type": "application/json" }),
                })

                if (!response.ok) {
                    // Handle specific errors from refresh endpoint if necessary
                    const errorData = await response.text() // Or .json() if applicable
                    console.error("Failed to refresh token:", response.status, errorData)
                    throw new Error(`Failed to refresh token (status: ${response.status})`)
                }

                const data = await response.json()
                if (!data.accessToken) {
                    throw new Error("Refresh response did not contain accessToken")
                }
                console.log("Token refreshed successfully.")
                setAccessToken(data.accessToken)
                return data.accessToken // Resolve with the new access token
            } catch (error) {
                console.error("Error during token refresh:", error)
                // If refreshing token fails, log out
                removeAuthTokens()
                navigate({ to: "/login", replace: true }) // Use replace to avoid history stack issues
                toast.error("Session expired. Please log in again.")
                throw error // Re-throw the error to signal failure
            } finally {
                // Clear the promise ref once the refresh attempt is complete
                refreshTokenPromise.current = null
                console.log("Refresh attempt finished.")
            }
        })()

        return refreshTokenPromise.current
    }, [refreshToken, setAccessToken, removeAuthTokens, navigate]) // Add dependencies

    // Keep state for the QueryClient instance to avoid re-creation on every render
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 30 * 1000, // 30 seconds
                        refetchOnWindowFocus: false, // Optional: disable refetch on focus during debugging
                        retry: (failureCount, error) => {
                            // Use instanceof if using custom error class
                            const apiError = error instanceof ApiError ? error : null
                            const status = apiError?.status

                            // Don't retry on 401/400 using Tanstack Query's mechanism,
                            // because we will handle it manually after refresh attempt.
                            if (status === 400 || status === 401) {
                                console.log(`Tanstack retry: Denying retry for status ${status} (handled by onError)`)
                                return false
                            }

                            // Standard retry logic for other errors
                            const shouldRetry = failureCount < 2
                            console.log(
                                `Tanstack retry: ${shouldRetry ? "Allowing" : "Denying"} retry #${
                                    failureCount + 1
                                } for error:`,
                                error
                            )
                            return shouldRetry
                        },
                        // Important: Tell queries to use the latest access token
                        // This isn't strictly necessary if getAccessToken() reads directly
                        // from your up-to-date state/storage, but shows intent.
                        // You'll need to structure your query functions to accept context/meta if you use this.
                        // meta: { getAccessToken: getAccessToken } // Example
                    },
                },
                queryCache: new QueryCache({
                    onError: async (error, query) => {
                        // Check if it's our custom ApiError or has a status property
                        const apiError = error instanceof ApiError ? error : null
                        const status = apiError?.status ?? (error as any)?.status // Fallback check

                        console.log(
                            `QueryCache onError: Detected error for query [${query.queryKey.join(
                                ", "
                            )}] with status ${status}`,
                            error
                        )

                        if (status === 400 || status === 401) {
                            // Check if this query was already retried after a refresh attempt
                            // This meta flag prevents infinite loops if refresh works but the request *still* fails with 401
                            if (query.state.meta?.isRetrying) {
                                console.log(
                                    `QueryCache onError: Query [${query.queryKey.join(
                                        ", "
                                    )}] failed even after retry. Logging out.`
                                )
                                removeAuthTokens()
                                navigate({ to: "/login", replace: true })
                                toast.error("Authentication failed. Please log in again.")
                                return // Stop processing
                            }

                            console.log(
                                `QueryCache onError: Status ${status} detected for query [${query.queryKey.join(
                                    ", "
                                )}]. Attempting token refresh.`
                            )
                            try {
                                await refreshAuthToken() // Wait for the refresh attempt
                                console.log(
                                    `QueryCache onError: Token refresh successful. Invalidating query [${query.queryKey.join(
                                        ", "
                                    )}] to trigger refetch.`
                                )

                                // Instead of directly retrying here (which is complex from QueryCache),
                                // invalidate the specific query. If the component using it is still mounted,
                                // Tanstack Query will refetch it automatically with the new token.
                                // Mark the query so we know it's a retry attempt.
                                queryClient.invalidateQueries({
                                    queryKey: query.queryKey,
                                    // Optional: Add meta to indicate this is a retry post-refresh
                                    // You might need a different mechanism if invalidate doesn't trigger immediately
                                    // or if the component unmounted.
                                    // A more direct retry mechanism often involves fetch wrappers/interceptors.
                                })
                                // A slightly more direct way, but relies on internal state update timing:
                                // queryClient.setQueryDefaults(query.queryKey, { meta: { isRetrying: true } });
                                // queryClient.refetchQueries({ queryKey: query.queryKey });
                            } catch (refreshError) {
                                console.error(
                                    `QueryCache onError: Token refresh failed for query [${query.queryKey.join(
                                        ", "
                                    )}]. Error:`,
                                    refreshError
                                )
                                // Logout is handled within refreshAuthToken's catch block
                            }
                        } else {
                            // Handle other errors globally
                            console.error(
                                `QueryCache onError: Unhandled error for query [${query.queryKey.join(", ")}]:`,
                                error
                            )
                            toast.error(`An error occurred: ${error.message || "Unknown error"}`)
                        }
                    },
                }),
            })
    )

    return (
        <QueryClientProvider client={queryClient}>
            <PageContainer className='flex flex-col min-h-screen'>
                <Outlet />
            </PageContainer>
            <Toaster />
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
    )
}

import useServiceContext from "@/hooks/useServiceContext"
import { useQuery } from "@tanstack/react-query"

export function useGetUserInfoQuery() {
    const { userService } = useServiceContext()

    return useQuery({
        queryKey: ["getUserInfo", userService],
        queryFn: () => userService.getUserInfo(),
    })
}

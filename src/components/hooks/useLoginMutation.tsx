import useServiceContext from "@/hooks/useServiceContext"
import { AuthService } from "@/models/serviceModels"
import { useMutation, type MutateOptions } from "@tanstack/react-query"

type Params = Parameters<AuthService["login"]>

interface LoginMutationParams {
    onSuccess: MutateOptions<Awaited<ReturnType<AuthService["login"]>>, Error, Params[0], unknown>["onSuccess"]
}

export function useLoginMutation(options?: LoginMutationParams) {
    const { authService } = useServiceContext()

    return useMutation({
        mutationFn: (...[config]: Params) => authService!.login(config),
        onSuccess: options?.onSuccess,
    })
}

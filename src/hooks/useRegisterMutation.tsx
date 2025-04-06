import { AuthService } from "@/models/serviceModels"
import { MutateOptions, useMutation } from "@tanstack/react-query"
import useServiceContext from "./useServiceContext"

type Params = Parameters<AuthService["register"]>

interface RegisterMutationParams {
    onSuccess: MutateOptions<Awaited<ReturnType<AuthService["register"]>>, Error, Params[0], unknown>["onSuccess"]
}

export function useRegisterMutation(options?: RegisterMutationParams) {
    const { authService } = useServiceContext()

    return useMutation({
        mutationFn: (...[config]: Params) => authService!.register(config),
        onSuccess: options?.onSuccess,
    })
}

import { AuthService, UserService } from "@/models/serviceModels"
import { authService } from "../services/authService"
import { createContext } from "react"
import { userService } from "@/services/userService"

export interface AppServices {
    authService: AuthService
    userService: UserService
}

export const ServiceContext = createContext<AppServices | undefined>(undefined)

export function ServiceProvider(props: React.PropsWithChildren) {
    return <ServiceContext.Provider value={{ authService, userService }}>{props.children}</ServiceContext.Provider>
}

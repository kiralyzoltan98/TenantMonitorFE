import { AuthService } from "@/models/serviceModels"
import { authService } from "../services/authService"
import { createContext } from "react"

export interface AppServices {
    authService: AuthService
}

export const ServiceContext = createContext<AppServices | undefined>(undefined)

export function ServiceProvider(props: React.PropsWithChildren) {
    return <ServiceContext.Provider value={{ authService }}>{props.children}</ServiceContext.Provider>
}

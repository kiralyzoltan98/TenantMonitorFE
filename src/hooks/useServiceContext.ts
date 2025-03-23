import { useContext } from "react";
import { ServiceContext, type AppServices } from "../context/serviceContext";

function useServiceContext() {
  return useContext(ServiceContext) as AppServices;
}

export default useServiceContext;
import { useContext } from "react";
import { LoaderContext } from "../Models/LoaderContext";
import { LoaderContextType } from "../Types/LoaderContextType";

export const useLoader = (): LoaderContextType => {
    const context = useContext(LoaderContext);

    if (!context) {
        throw new Error(
            'useLoader must be wrapped with LoaderProvider'
        );
    }

    return context;
}
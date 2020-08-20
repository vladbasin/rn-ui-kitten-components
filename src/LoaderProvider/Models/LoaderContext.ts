import { Maybe } from "@vladbasin/ts-types";
import { createContext } from "react";
import { LoaderContextType } from "../Types/LoaderContextType";

export const LoaderContext = createContext<Maybe<LoaderContextType>>(undefined);

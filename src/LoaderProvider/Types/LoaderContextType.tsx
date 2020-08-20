import { Maybe } from "@vladbasin/ts-types";

export type LoaderContextType = {
    setLoading: (id: string, value: boolean, name?: string) => void;
    setCancelHandler: (id: string, handler: Maybe<() => void>) => void;
    setProgress: (id: string, progress: Maybe<number>) => void;
};

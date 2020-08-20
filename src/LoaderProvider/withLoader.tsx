import React, { ComponentType } from "react";
import { LoaderProvider } from './LoaderProvider';

export const withLoader = function<T = {}>(Component: ComponentType<T>, cancelLabel: string) {
    return (props: T) => (
        <LoaderProvider cancelLabel={cancelLabel}>
            <Component {...props} />
        </LoaderProvider>
    )
}
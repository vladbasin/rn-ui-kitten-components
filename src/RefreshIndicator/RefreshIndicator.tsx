import React from "react";
import { RefreshControl } from "react-native";

type RefreshIndicatorPropsType = {
    tintColor?: string, 
    refreshing: boolean,
    onRefresh: () => void,
}

export const RefreshIndicator = (props: RefreshIndicatorPropsType) => {
    return (
        <RefreshControl 
            tintColor={props.tintColor} 
            {...props}
        />
    );
}
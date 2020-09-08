import { Text, useTheme } from "@ui-kitten/components";
import { Maybe } from "@vladbasin/ts-types";
import { isNil } from 'lodash';
import React from "react";
import { View } from 'react-native';
import { ErrorBoxStyles } from "./ErrorBoxStyles";

type ErrorBoxPropsType = {
    error: Maybe<string>,
}

export const ErrorBox = (props: ErrorBoxPropsType) => {
    const theme = useTheme();

    return (
        <>
            {!isNil(props.error) &&
                <View style={[ErrorBoxStyles.transactionErrorContainer, { backgroundColor: theme["color-danger-800"] }]}>
                    <Text>{props.error}</Text>
                </View>
            }
        </>
    )
}
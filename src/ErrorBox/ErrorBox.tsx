import { Text, useTheme } from "@ui-kitten/components";
import { Maybe } from "@vladbasin/ts-types";
import { isNil } from 'lodash';
import React from "react";
import { View } from 'react-native';
import { Styles } from "./Styles";

type ErrorBoxPropsType = {
    error: Maybe<string>,
}

export const ErrorBox = (props: ErrorBoxPropsType) => {
    const theme = useTheme();

    return (
        <>
            {!isNil(props.error) &&
                <View style={[Styles.transactionErrorContainer, { backgroundColor: theme["color-danger-800"] }]}>
                    <Text>{props.error}</Text>
                </View>
            }
        </>
    )
}
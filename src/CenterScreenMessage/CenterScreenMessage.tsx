import { Text } from "@ui-kitten/components";
import React from "react";
import { StyleProp, View, ViewStyle } from 'react-native';
import { Styles } from './Styles';

type CenterScreenMessagePropsType = {
    title: string,
    children?: JSX.Element | JSX.Element[],
    styles?: StyleProp<ViewStyle>,
}

export const CenterScreenMessage = (props: CenterScreenMessagePropsType) => {
    return (
        <View style={[Styles.container, props.styles]} pointerEvents="box-none">
            <Text style={Styles.label} category="h6" appearance="hint">
                {props.title}
            </Text>
            <View style={Styles.childrenContainer}>
                {props.children}
            </View>
        </View>
    );
}
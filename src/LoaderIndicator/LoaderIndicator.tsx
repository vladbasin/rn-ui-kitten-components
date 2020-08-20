import { Text, useTheme } from "@ui-kitten/components";
import { isNil } from "lodash";
import React, { Fragment, useMemo } from "react";
import { ActivityIndicator } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

type LoaderIndicatorPropsType = {
    progress: number | undefined,
}

export const LoaderIndicator = (props: LoaderIndicatorPropsType) => {
    const currentProgressPercent = useMemo<number | undefined>(() => props.progress && Math.floor(props.progress * 100), [props.progress]);

    const theme = useTheme();

    return (
        <Fragment>
            {isNil(props.progress) && 
                <ActivityIndicator size="large" color={theme["color-basic-100"]} />
            }
            {!isNil(props.progress) &&
                <ProgressCircle
                    percent={currentProgressPercent || 0}
                    radius={30}
                    borderWidth={0}
                    color={theme["color-basic-700"]}
                    shadowColor={theme["color-basic-1000"]}
                    bgColor="transparent"
                >
                    <Text>{`${currentProgressPercent}%`}</Text>
                </ProgressCircle>
            }
        </Fragment>
    );
}
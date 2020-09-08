import { Button } from "@ui-kitten/components";
import { Maybe } from '@vladbasin/ts-types';
import { isNil } from 'lodash';
import React, { useEffect, useMemo, useState } from "react";
import { View } from 'react-native';
import { LoaderIndicator } from '../LoaderIndicator/LoaderIndicator';
import { LoaderContext } from './Models/LoaderContext';
import { LoaderProviderStyles } from './LoaderProviderStyles';
import { LoaderTaskType } from './Types/LoaderTaskType';

type LoaderProviderPropsType = {
    children: JSX.Element | JSX.Element[],
    cancelLabel: string,
}

export const LoaderProvider = (props: LoaderProviderPropsType) => {
    const [loaderTasksMap, _] = useState<Map<string, LoaderTaskType>>(new Map());
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [updatesCount, setUpdatesCount] = useState<number>(0);
    const [currentTask, setCurrentTask] = useState<LoaderTaskType>();

    const currentHandler = useMemo<Maybe<() => void>>(() => currentTask && currentTask.handler, [updatesCount]);
    const currentProgress = useMemo<number | undefined>(() => !isNil(currentTask) && !isNil(currentTask.progress) && currentTask.progress > 0
        ? currentTask.progress
        : undefined, 
        [updatesCount]
    );

    const onSetLoading = (id: string, value: boolean, name?: string) => {
        const task = loaderTasksMap.get(id) || { progress: undefined }; 
        const progress = value ? task.progress : undefined;
        loaderTasksMap.set(id, { ...task, progress, isLoading: value, id, name });

        setUpdatesCount(updatesCount + 1);
    };

    const onSetCancelHandler = (id: string, handler: Maybe<() => void>) => {
        SetTaskProperty(loaderTasksMap, id, task => task.handler = handler);

        setUpdatesCount(updatesCount + 1);
    }

    const onSetProgress = (id: string, progress: number | undefined) => {
        SetTaskProperty(loaderTasksMap, id, task => task.progress = progress);

        setUpdatesCount(updatesCount + 1);
    }

    const onCancel = () => {
        currentHandler && currentHandler();
    }

    useEffect(() => {
        let shouldBeVisible = false;
        let shouldBeCurrentTask: Maybe<LoaderTaskType>;
        
        loaderTasksMap.forEach(task => {
            if (task.isLoading) {
                shouldBeCurrentTask = task;
            }
        });

        setCurrentTask(shouldBeCurrentTask)

        if (shouldBeCurrentTask) {
            shouldBeVisible = true;
        }

        if (shouldBeVisible != isVisible) {
            setIsVisible(shouldBeVisible);
        }
    }, [updatesCount]);

    return (
        <LoaderContext.Provider 
            value={{ 
                setLoading: onSetLoading, 
                setCancelHandler: onSetCancelHandler,
                setProgress: onSetProgress,
            }}
        >
            {props.children}
            {isVisible &&
                <View style={LoaderProviderStyles.container}>
                    <View style={LoaderProviderStyles.background} />
                    <LoaderIndicator progress={currentProgress} />
                    {!isNil(currentHandler) &&
                        <Button 
                            status="basic" 
                            style={LoaderProviderStyles.cancelButton}
                            onPress={onCancel}
                        >
                            {props.cancelLabel}
                        </Button>
                    }
                </View>
            }
        </LoaderContext.Provider>
    ); 
}

const SetTaskProperty = (map: Map<string, LoaderTaskType>, id: string, setter: (arg: LoaderTaskType) => void) => {
    const task = map.get(id);

    if (!task) {
        return;
    }

    setter(task);
}
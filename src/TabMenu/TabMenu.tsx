import { BottomNavigation, BottomNavigationTab, useTheme } from '@ui-kitten/components';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useNavigation } from "react-navigation-hooks";
import { TabMenuItemType } from './Types/TabMenuItemType';

export type TabMenuPropsType = {
    items: TabMenuItemType[],
    fontSize?: number,
    containerStyle?: StyleProp<ViewStyle>,
}

const navigationKey = "TabMenu";

export const TabMenu = (props: TabMenuPropsType) => {
    const navigation = useNavigation();
    const theme = useTheme();

    const onItemSelect = (index: number) => {
        const selectedRoute = navigation.state.routes[index];

        navigation.navigate({
            key: navigationKey,
            routeName: selectedRoute.routeName,
        });
    }

    return (
        <BottomNavigation
            appearance="default"
            style={[{ backgroundColor: theme["color-basic-1100"] }, props.containerStyle]}
            selectedIndex={navigation.state.index}
            onSelect={onItemSelect}
        >
            {props.items.map(item =>
                <BottomNavigationTab
                    title={item.title}
                    icon={item.icon}
                />
            )}
        </BottomNavigation>
    );
};
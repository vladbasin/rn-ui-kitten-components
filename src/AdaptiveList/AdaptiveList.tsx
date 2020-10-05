import { Button, List } from '@ui-kitten/components';
import { EvaSize } from '@ui-kitten/components/devsupport';
import { useEventAggregator } from '@vladbasin/ts-services-reactjs';
import { Maybe } from '@vladbasin/ts-types';
import { isNil } from 'lodash';
import React, { Fragment, ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { LayoutChangeEvent, ListRenderItemInfo, StyleProp, View, ViewStyle } from 'react-native';
import { CenterScreenMessage } from '../CenterScreenMessage/CenterScreenMessage';
import { useWindowDimensions } from '../Hooks/useDimensions';
import { RefreshIndicator } from '../RefreshIndicator/RefreshIndicator';
import { SearchBox } from '../SearchBox/SearchBox';
import { AdaptiveListStyles } from './AdaptiveListStyles';
import { calculateGridSetup } from './Functions/calculateGridSetup';
import { RenderItemInfo } from "./Types/RenderItemInfo";

type AdaptiveListPropsType<T> = {
    items: T[],
    hasError: boolean,
    isRefreshing: boolean,
    error: Maybe<string>,
    showSearch?: boolean,
    createItemLabel?: string,
    searchPlaceholder?: string,
    reloadedEvent?: string,
    updatedCounter?: number,
    singleColumn?: boolean,
    refreshLabel?: string,
    refreshTintColor?: string,
    searchInputStyle?: StyleProp<ViewStyle>,
    searchInputSize?: EvaSize,
    horizontalListMargin?: number,
    minItemWidth: number,
    renderItem: (itemInfo: RenderItemInfo<T>) => ReactElement<any>,
    onRefresh?: () => void,
    onCreate?: () => void,
    onSearchQueryChanged?: (search: string) => void,
    onLoadMore?: () => void,
}

export const AdaptiveList = <T extends unknown>(props: AdaptiveListPropsType<T>) => {
    const window = useWindowDimensions();
    const [contentWidth, setContentWidth] = useState<number>(window.width);

    const gridSetup = useMemo(() =>
        calculateGridSetup(contentWidth, props.horizontalListMargin || 0, props.minItemWidth, props.singleColumn),
        [contentWidth, props.horizontalListMargin, props.minItemWidth, props.singleColumn]
    );

    const [columns, setColumns] = useState<number>(gridSetup.columns);
    const [columnWidth, setColumnWidth] = useState<number>(gridSetup.columnWidth);
    const listRef = useRef<any>();

    useEventAggregator(() => {
        if (listRef.current) {
            listRef.current.scrollToOffset({ animated: false, offset: 0 });
        }
    }, props.reloadedEvent || "#reloaded-adaptive-fallback");

    useEffect(() => {
        setColumnWidth(gridSetup.columnWidth);
        setColumns(gridSetup.columns);
    }, [contentWidth]);

    const searchControl = useMemo(() => {
        if (props.showSearch === false) {
            return null;
        }

        return (
            <SearchBox
                style={props.searchInputStyle}
                size={props.searchInputSize}
                placeholder={props.searchPlaceholder || ""}
                onQueryChanged={query => props.onSearchQueryChanged && props.onSearchQueryChanged(query)}
            />
        );
    }, [props.showSearch, props.searchPlaceholder]);

    const renderItem = (itemInfo: ListRenderItemInfo<T>) => {
        return props.renderItem({ ...itemInfo, columnWidth });
    }

    const onContentLayout = (e: LayoutChangeEvent) => {
        const layoutWidth = e.nativeEvent.layout.width;
        const targetWidth = isNaN(layoutWidth)
            ? window.width
            : layoutWidth;

        setContentWidth(targetWidth);
    }

    const listData = useMemo(() =>
        isNil(props.error) ? props.items : [],
        [props.error, props.items]
    );

    return (
        <Fragment>
            <List
                key={columns}
                ref={ref => listRef.current = ref || undefined}
                style={[AdaptiveListStyles.list, { marginLeft: props.horizontalListMargin, marginRight: props.horizontalListMargin }]}
                data={listData}
                extraData={props.updatedCounter}
                renderItem={renderItem}
                refreshControl={<RefreshIndicator
                    tintColor={props.refreshTintColor}
                    refreshing={props.isRefreshing}
                    onRefresh={() => props.onRefresh && props.onRefresh()}
                />}
                ListHeaderComponent={searchControl}
                numColumns={columns}
                onEndReached={props.onLoadMore}
                onLayout={onContentLayout}
            />
            {props.hasError &&
                <CenterScreenMessage
                    title={props.error || ""}
                >
                    <View style={AdaptiveListStyles.noItemsActionsContainer}>
                        <Button
                            style={AdaptiveListStyles.noItemsRefreshButton}
                            status="control"
                            appearance="outline"
                            onPress={props.onRefresh}
                        >
                            {props.refreshLabel}
                        </Button>
                        {!isNil(props.onCreate) &&
                            <Button
                                style={AdaptiveListStyles.createItemButton}
                                appearance="outline"
                                onPress={props.onCreate}
                            >
                                {props.createItemLabel}
                            </Button>
                        }
                    </View>
                </CenterScreenMessage>
            }
        </Fragment>
    );
}
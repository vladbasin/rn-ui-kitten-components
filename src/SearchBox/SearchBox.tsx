import { Input } from "@ui-kitten/components";
import lodash from "lodash";
import React, { useMemo, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { SearchBoxStyles } from './SearchBoxStyles';

interface SearchBoxPropsContract {
    placeholder: string,
    style?: StyleProp<ViewStyle>,
    onQueryChanged: (newQuery: string) => void
}

export const SearchBox = (props: SearchBoxPropsContract) => {
    const [value, setValue] = useState<string>();

    const triggerQueryChangeDebounced = useMemo(() => {
        const applyChangedQuery = (newValue: string) => {
            props.onQueryChanged(newValue);
        }

        return lodash.debounce(applyChangedQuery, 1500);
    }, []);

    const onValueChanged = (text: string) => {
        triggerQueryChangeDebounced(text);
        setValue(text);
    }

    return (
        <View style={SearchBoxStyles.container}>
            <Input
                style={[SearchBoxStyles.input, props.style]}
                textStyle={SearchBoxStyles.text}
                size="small"
                placeholder={props.placeholder}
                value={value}
                onChangeText={onValueChanged}
            />
        </View>
    )
};
import { Input } from "@ui-kitten/components";
import { EvaSize } from "@ui-kitten/components/devsupport";
import lodash from "lodash";
import React, { useMemo, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { SearchBoxStyles } from './SearchBoxStyles';

type SearchBoxPropsType = {
    placeholder: string,
    style?: StyleProp<ViewStyle>,
    size?: EvaSize,
    onQueryChanged: (newQuery: string) => void
}

export const SearchBox = (props: SearchBoxPropsType) => {
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
                size={props.size}
                placeholder={props.placeholder}
                value={value}
                onChangeText={onValueChanged}
            />
        </View>
    )
};
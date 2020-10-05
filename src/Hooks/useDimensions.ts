import { useEffect, useState } from "react";
import { Dimensions, ScaledSize } from "react-native";
import { debounce } from 'lodash';

type DimensionsType = { window: ScaledSize; screen: ScaledSize };
type DimensionContainerType = keyof DimensionsType;

const useDimensionsHelper = (container: DimensionContainerType) => {
    const [dimension, setDimension] = useState(Dimensions.get(container));

    useEffect(() => {
        const onChange = debounce((dimensions: DimensionsType) => {
            setDimension(dimensions[container]);
        }, 1500);

        Dimensions.addEventListener("change", onChange);

        return () => {
            Dimensions.removeEventListener("change", onChange);
        };
    }, []);

    return dimension;
}

export const useWindowDimensions = () => {
    return useDimensionsHelper("window");
}

export const useScreenDimensions = () => {
    return useDimensionsHelper("screen");
}

export const useDimensions = () => {
    return {
        window: useWindowDimensions(),
        screen: useScreenDimensions()
    };
}
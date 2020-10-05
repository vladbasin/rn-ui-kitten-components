import { ListRenderItemInfo } from 'react-native';

export type RenderItemInfo<T> = ListRenderItemInfo<T> & {
    columnWidth: number;
};

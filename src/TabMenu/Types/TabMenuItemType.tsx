import { RenderProp } from "@ui-kitten/components/devsupport";
import { ImageProps } from "react-native";

export type TabMenuItemType = {
    title: string,
    icon: RenderProp<Partial<ImageProps>>,
}
import { StyleSheet } from "react-native";

export const AdaptiveListStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
    },
    list: {
        flex: 1,
        backgroundColor: "transparent",
    },
    noItemsActionsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    noItemsRefreshButton: {
        marginRight: 16,
        backgroundColor: "transparent",
    },
    createItemButton: {
        backgroundColor: "transparent",
    },
});
import { GridSetupType } from '../Types/GridSetupType';

export const calculateGridSetup = (availableWidth: number, margin: number, minColumnWidth: number, singleColumn?: boolean): GridSetupType => {
    if (singleColumn === true) {
        return {
            columnWidth: availableWidth,
            columns: 1
        }
    }

    const width = Math.max(minColumnWidth, availableWidth - margin * 2);
    const columns = Math.trunc(width / minColumnWidth);
    const columnWidth = Math.max(minColumnWidth, Math.trunc(width / columns));

    return {
        columnWidth,
        columns
    };
}
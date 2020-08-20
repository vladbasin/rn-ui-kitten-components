export type LoaderTaskType = {
    id: string,
    name?: string,
    isLoading: boolean,
    handler?: () => void,
    progress?: number,
}
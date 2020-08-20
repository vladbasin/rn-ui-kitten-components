import { useEffect, useState } from 'react';
import { useLoader } from '../LoaderProvider/Hooks/useLoader';

type LoaderPropsType = {
    name?: string,
    visible: boolean,
    onTryCancel?: () => void,
    progress?: number,
}

const idCounter = 0;

export const Loader = (props: LoaderPropsType) => {
    const [id] = useState<string>(`Loader_${idCounter}`);
    const context = useLoader();

    useEffect(() => context.setLoading(id, props.visible, props.name), [id, props.visible]);
    useEffect(() => context.setProgress(id, props.progress), [id, props.progress]);
    useEffect(() => context.setCancelHandler(id, props.onTryCancel), [id, props.onTryCancel]);

    useEffect(() => {
        return () => {
            context.setLoading(id, false, props.name);
        }
    }, []);

    return null;
}
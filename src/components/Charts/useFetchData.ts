import React, {useEffect} from "react";

interface DataProps {
    randomNumbers: number[]
}

type APIStatus = 'idle' | 'loading' | 'success' | 'error'

function fakeFetch(): Promise<DataProps> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({randomNumbers: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]});
        }, 500);
    });
}

export const useFetchData = () => {
    const [randomNumbers, setNum] = React.useState<DataProps>();
    const [isLoading, setIsLoading] = React.useState<APIStatus>('idle');

    const fetchData = async () => {
        setIsLoading('loading');
        try {
            const data: DataProps = await fakeFetch()
            setIsLoading('success')
            setNum(data)
        } catch (e) {
            setIsLoading('error')
            console.error(e);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return {randomNumbers, isLoading}
}
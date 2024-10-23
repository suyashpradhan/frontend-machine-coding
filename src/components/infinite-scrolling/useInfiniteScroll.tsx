// useInfiniteScroll.ts
import {useEffect, useRef, useState} from "react";

interface UseInfiniteScrollProps<T> {
    fetchData: (page: number) => Promise<T[]>;
    initialPage?: number;
}

export const useInfiniteScroll = <T, >({
                                           fetchData,
                                           initialPage = 1,
                                       }: UseInfiniteScrollProps<T>) => {
    const [data, setData] = useState<T[]>([]);
    const [page, setPage] = useState(initialPage);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const observerRef = useRef<any | null>(null);
    const isFetchingRef = useRef(false);

    useEffect(() => {
        const fetchMoreData = async () => {
            setLoading(true);
            setError(null);
            try {
                const newData = await fetchData(page);
                setData((prev) => [...prev, ...newData]);
                if (newData.length === 0) {
                    setHasMore(false);
                }
            } catch (err) {
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
                isFetchingRef.current = false;
            }
        };

        if (isFetchingRef.current) return;
        isFetchingRef.current = true;
        fetchMoreData();
    }, [fetchData, page]);

    const lastElementRef = (node: any) => {
        if (loading) return;
        if (observerRef.current) observerRef.current.disconnect();
        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage((prev) => prev + 1);
            }
        });
        if (node) observerRef.current.observe(node);
    };

    return {data, loading, error, hasMore, lastElementRef};
};

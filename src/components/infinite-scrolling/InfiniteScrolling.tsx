import {useEffect, useRef, useState} from "react";

interface Products {
    id?: string;
    title?: string;
    category?: string;
    brand?: string;
}

const LIMIT = 10

export const InfiniteScrolling = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState<Products[]>([]);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [isSpinnerRefVisible, setIsSpinnerRefVisible] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    const spinnerRef = useRef<any>();
    const pageRef = useRef<any>(1);

    const fetchProducts = async (page = pageRef.current) => {
        try {
            setLoading(true);
            setError(false);
            const res: any = await fetch(`https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`)
            const data = await res.json()
            setProducts((prev) => {
                const newData = [...prev, ...data?.products]
                if (newData.length < data?.total) {
                    setHasMore(true)
                } else {
                    setHasMore(false)
                }
                return newData;
            })
        } catch (err) {
            setError(true)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    useEffect(() => {
        const ref = spinnerRef.current
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 1
        })

        if (ref) {
            observer.observe(ref);
        }

        return () => ref && observer.unobserve(ref);
    }, [isSpinnerRefVisible]);

    useEffect(() => {
        if (isIntersecting) {
            console.log("effect")
            fetchProducts(pageRef.current + 1)
            pageRef.current = pageRef.current + 1
        }
    }, [isIntersecting]);

    return (
        <>
            <h1>Infinite Scroll</h1>
            {loading && <h1>loading products...</h1>}
            {products?.map((product: Products, index: number) => {
                return (
                    <div key={index}>
                        <h1>{product?.title}</h1>
                        <h2>{product?.category}</h2>
                        <h3>{product?.brand}</h3>
                    </div>
                )
            })}
            {hasMore && <div ref={(el) => {
                spinnerRef.current = el
                setIsSpinnerRefVisible((prev) => !prev)
            }}><h1>loading more products...</h1></div>}
            {error && <p style={{color: 'red'}}>{error}</p>}
        </>
    )
}
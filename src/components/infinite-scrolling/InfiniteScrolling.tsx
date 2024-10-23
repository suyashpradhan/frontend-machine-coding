import {useInfiniteScroll} from "./useInfiniteScroll";

interface Products {
    id?: string;
    title?: string;
    category?: string;
    brand?: string;
}

const fetchProducts = async (page: number): Promise<Products[]> => {
    const res = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`
    );
    const data = await res.json();
    return data.products;
};

export const InfiniteScrolling = () => {
    const {data: products, loading, error, lastElementRef} = useInfiniteScroll<Products>({
        fetchData: fetchProducts,
    });

    return (
        <>
            <h1>Infinite Scroll</h1>
            {products.map((product: Products, index: number) => (
                <div key={product.id}>
                    <h1>{product.title}</h1>
                    <h2>{product.category}</h2>
                    <h3>{product.brand}</h3>
                    {index === products.length - 1 && (
                        <div ref={lastElementRef}>
                            {loading && <h1>Loading more products...</h1>}
                        </div>
                    )}
                </div>
            ))}
            {loading && <h1>Loading products...</h1>}
            {error && <p style={{color: "red"}}>{error}</p>}
        </>
    )
}
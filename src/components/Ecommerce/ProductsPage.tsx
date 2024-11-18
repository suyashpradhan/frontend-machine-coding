import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export interface ProductType {
    id: string,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
        "rate": number,
        "count": number
    }
}

const ProductCard = ({product}: { product: ProductType }) => {
    return (
        <Link to={`/products/${product.id}`}
              className="flex flex-col border border-gray-200 p-2 rounded-s w-1/3 hover:border-gray-500">
            <p className="">{product.id}</p>
            <h1 className="font-extrabold mb-4">{product.title}</h1>
            <h2>{product.category}</h2>
        </Link>
    )
}

const fetchProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products?limit=5")
    return response.json()
}

export const ProductsPage = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchProducts()
            .then(response => setProducts(response))
            .catch(error => console.error(error))
    }, [])

    return (
        <div className="max-w-7xl mx-auto my-16">
            <h1>Products</h1>
            <div className="flex flex-row gap-4">
                {products.map((product: ProductType) => {
                    return <ProductCard key={product.id} product={product}/>
                })}
            </div>
        </div>
    )
}
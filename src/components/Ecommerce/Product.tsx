import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {ProductType} from "./ProductsPage";

const fetchProducts = async (id: string | undefined) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    return response.json()
}


export const Product = () => {
    const {id} = useParams()
    const [singleProduct, setSingleProduct] = useState<ProductType>()

    useEffect(() => {
        fetchProducts(id)
            .then(data => setSingleProduct(data))
            .catch(error => console.log(error))
    }, [])

    return (
        <div className="flex flex-col border border-gray-200 p-2 rounded-s w-1/3 hover:border-gray-500">
            <p className="">{singleProduct?.id}</p>
            <h1 className="font-extrabold mb-4">{singleProduct?.title}</h1>
            <h2>{singleProduct?.category}</h2>
            <button>Add to Cart</button>
            <button>Wishlist</button>
        </div>
    )
}
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getProductById } from "../data/products";

export default function ProductDetails(){
    const { id } = useParams();
    const [product, setProduct] = useState(null)

useEffect(() => {
    const foundProduct = getProductById(id);
    console.log(foundProduct);
}, [])

    return <div>Product Details Page {id}</div>
}

//continue 2:48:52
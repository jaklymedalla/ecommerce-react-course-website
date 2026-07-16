import { createContext, useContext, useState } from "react";
import { set } from "react-hook-form";
import { getProductById } from "../data/products";

const CartContext = createContext(null);


export default function CartProvider({children}){
    const [cartItems, setCartItems] = useState([]);

    function addToCart(productID){
        const existing = cartItems.find((item) => item.id === productID);
        if(existing){
            const currentQuantity = existing.quantity;
            const updatedCartItems = cartItems.map((item) => item.id === productID ?
            { id: productID, quantity: currentQuantity + 1}
            : item
        )
        setCartItems(updatedCartItems)
        }
        else{
            setCartItems([...cartItems, {id: productID, quantity: 1}])
        }
    }

    function removeFromCart(productID){
        setCartItems(cartItems.filter((item) => item.id !== productID));
    }

    function updateQuantity(productID, quantity){
        if(quantity <=0){
            removeFromCart(productID)
            return;
        }
        setCartItems(
            cartItems.map((item) =>
                item.id === productID ? {...item, quantity} : item
            )
        );
    }

     function getCartItemsWithProducts(){
        return cartItems.map( item =>({
            ...item,
            product: getProductById(item.id)
        })).filter(item => item.product);
    }

    function getCartTotal(){
        const total = cartItems.reduce((total, item) => {
            const product = getProductById(item.id)
            return total + (product ? product.price * item.quantity : 0);
        }, 0 );

        return total;
    }

    function clearCart(){
        setCartItems([])
    }

    return (
    <CartContext.Provider value={ {
        cartItems, 
        addToCart, 
        getCartItemsWithProducts, 
        removeFromCart, 
        updateQuantity,
        getCartTotal,
        clearCart
    } }>
        {children}</CartContext.Provider>
    );
    
   
}

export function useCart(){
    const context = useContext(CartContext);

    return context;
}

// Continue at 2:23:53
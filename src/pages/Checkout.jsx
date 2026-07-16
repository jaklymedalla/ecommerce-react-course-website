import { useCart } from "../context/CartContext"

export default function Checkout(){
    const { getCartItemsWithProducts } = useCart();
    const cartItems = getCartItemsWithProducts();

    return(
        <div className="page">
            <div className="container">
                <h1 className="page-title">Checkout</h1>
                <div className="checkout-container">
                    <div className="checkout-items">
                        <h2>Order Summary</h2>
                        {cartItems.map((item) => (
                            <div className="checkout-item">Item</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
//continue 3:13:22
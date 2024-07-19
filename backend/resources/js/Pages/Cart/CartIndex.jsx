import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { loadStripe } from "@stripe/stripe-js";

// STRIPE KEY PUBLIC
const stripePromise = loadStripe('pk_test_51PF4mDRu1tx5Etuh3InKoGjspqPg3YrBnWETBSYv1yLB5m4d8R1JK4fM36LioMbzScU4Vy9mJtaennaXRU1gKsat00g5hjVeom');

const CartIndex = ({ onClose }) => {
    const { t, i18n } = useTranslation();
    const [cartItems, setCartItems] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const removeFromCart = (id) => {
        const updatedCart = cartItems.filter((item) => item.id_voiture !== id);
        setCartItems(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    };

    const clearCart = () => {
        onClose();
        setCartItems([]);
        localStorage.removeItem("cartItems");
    };

    const handleCheckout = async () => {
        setIsProcessing(true);
        const stripe = await stripePromise;

        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items: cartItems }),
        });

        const session = await response.json();

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.error(result.error.message);
        }

        setIsProcessing(false);
    };

    return (
        <div className="cart-modal">
            <div className="cart-content">
                <button className="close-button" onClick={onClose}>
                    {t("cart.close")}
                </button>
                <h2>{t("cart.title")}</h2>
                {cartItems.length === 0 ? (
                    <p>{t("cart.empty")}</p>
                ) : (
                    <>
                        <ul className="cart-items">
                            {cartItems.map((item) => (
                                <li key={item.id_voiture}>
                                    <div className="cart-item">
                                        <h3>{item.modele.nom_modele}</h3>
                                        <p>
                                            {t("cart.year")}: {item.annee}
                                        </p>
                                        <p>
                                            {t("cart.price")}: {item.prix_vente}
                                        </p>
                                        <button
                                            onClick={() =>
                                                removeFromCart(item.id_voiture)
                                            }
                                        >
                                            {t("cart.remove")}
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button onClick={clearCart} className="clear-cart">
                            {t("cart.clear")}
                        </button>
                        <button
                            onClick={handleCheckout}
                            className="checkout-button"
                            disabled={isProcessing}
                        >
                            {isProcessing ? t("cart.processing") : t("cart.checkout")}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartIndex;

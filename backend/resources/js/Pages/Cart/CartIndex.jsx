import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

const CartIndex = ({ onClose }) => {
    const { t, i18n } = useTranslation();
    const [cartItems, setCartItems] = useState([]);

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
                        <Link href="/cart/checkout" className="checkout-button">
                            {t("cart.checkout")}
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartIndex;

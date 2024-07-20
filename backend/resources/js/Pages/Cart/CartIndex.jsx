import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

// Config Axios
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.withCredentials = true;

// STRIPE KEY PUBLIC
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutForm = ({ cartItems, clearCart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const { t } = useTranslation();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsProcessing(true);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error(error);
            setErrorMessage(error.message);
            setIsProcessing(false);
            return;
        }

        try {
            const response = await axios.post("/process-payment", {
                paymentMethod: paymentMethod.id,
                items: cartItems,
            });

            if (response.data.success) {
                clearCart();
                //TODO message de réussite!
            } else {
                setErrorMessage("Payment failed: " + response.data.error);
            }
        } catch (error) {
            console.error("Error during manual checkout:", error);
            setErrorMessage("An error occurred during checkout. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button type="submit" disabled={isProcessing || !stripe}>
                {isProcessing ? t("cart.processing") : t("cart.checkout")}
            </button>
        </form>
    );
};

const CartIndex = ({ onClose }) => {
    const { t } = useTranslation();
    const [cartItems, setCartItems] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("checkout");

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
        try {
            const stripe = await stripePromise;
            const response = await axios.post("/create-checkout-session", {
                items: cartItems,
            });

            const result = await stripe.redirectToCheckout({
                sessionId: response.data.id,
            });

            if (result.error) {
                console.error(result.error.message);
            }
        } catch (error) {
            console.error("Error during checkout:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    console.log('Stripe Key:', import.meta.env.VITE_STRIPE_KEY);

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

                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="checkout"
                                    checked={paymentMethod === "checkout"}
                                    onChange={() =>
                                        setPaymentMethod("checkout")
                                    }
                                />
                                {t("cart.useStripeCheckout")}
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="manual"
                                    checked={paymentMethod === "manual"}
                                    onChange={() => setPaymentMethod("manual")}
                                />
                                {t("cart.useTestForm")}
                            </label>
                        </div>

                        {paymentMethod === "checkout" ? (
                            <button
                                onClick={handleCheckout}
                                className="checkout-button"
                                disabled={isProcessing}
                            >
                                {isProcessing
                                    ? t("cart.processing")
                                    : t("cart.checkout")}
                            </button>
                        ) : (
                            <Elements stripe={stripePromise}>
                                <CheckoutForm cartItems={cartItems} clearCart={clearCart} />
                            </Elements>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default CartIndex;

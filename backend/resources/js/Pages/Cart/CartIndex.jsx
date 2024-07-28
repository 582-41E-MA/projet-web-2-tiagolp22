import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { Button, Modal, Box } from "@mui/material";
import "./CartIndex.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
// Config Axios
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.withCredentials = true;

// STRIPE KEY PUBLIC
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutForm = ({ cartItems, clearCart, onClose }) => {
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
            type: "card",
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
                onClose(); // Fechar o modal após o sucesso do pagamento
                //TODO message de réussite!
            } else {
                setErrorMessage("Payment failed: " + response.data.error);
            }
        } catch (error) {
            console.error("Error during manual checkout:", error);
            setErrorMessage(
                "An error occurred during checkout. Please try again."
            );
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            {errorMessage && (
                <div className="error-message">{errorMessage}</div>
            )}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isProcessing || !stripe}
            >
                {isProcessing ? t("cart.processing") : t("cart.checkout")}
            </Button>
        </form>
    );
};

const CartIndex = ({ onClose, onClearCart }) => {
    const { t } = useTranslation();
    const [cartItems, setCartItems] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const storedCartItems = JSON.parse(
            localStorage.getItem("cartItems") || "[]"
        );
        setCartItems(storedCartItems);
    }, []);

    const clearCart = () => {
        setCartItems([]);
        localStorage.setItem("cartItems", JSON.stringify([]));
        onClearCart();
    };

    const handleRemoveItem = (index) => {
        const updatedCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    };

    const totalPrice = cartItems
        .reduce((total, item) => total + parseFloat(item.prix_vente || 0), 0)
        .toFixed(2);

    return (
        <div>
            <div className="cart-container">
                <h2>
                    {t("cart.title")}{" "}
                    <FontAwesomeIcon
                        icon={faCartArrowDown}
                        style={{
                            color: "#003aa6",
                            fontSize: "32px",
                        }}
                    />
                </h2>

                {cartItems.length === 0 ? (
                    <p>{t("cart.empty")}</p>
                ) : (
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                <h3>{item.modele.nom_modele}</h3>
                                <p>
                                    {t("cart.year")}:{" "}
                                    <strong>{item.annee}</strong>
                                </p>
                                <p>
                                    {t("cart.km")}:
                                    <strong> {item.kilometrage} km</strong>
                                </p>
                                <p>
                                    {t("cart.price")}:
                                    <strong> {item.prix_vente}</strong>
                                </p>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#c9c9c9",
                                    }}
                                    onClick={() => handleRemoveItem(index)}
                                >
                                    {t("cart.remove")}
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
                <p>
                    {t("cart.total")}: ${totalPrice}
                </p>
                {cartItems.length > 0 && (
                    <div>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#003AA7",
                                marginRight: "10px",
                            }}
                            onClick={() => setShowModal(true)}
                        >
                            {t("cart.checkout")}
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: "#DE9800" }}
                            onClick={clearCart}
                        >
                            {t("cart.clear")}
                        </Button>
                    </div>
                )}
            </div>
            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                aria-labelledby="checkout-modal-title"
                aria-describedby="checkout-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        height: 200,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <h2 id="checkout-modal-title">{t("cart.checkout")}</h2>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm
                            cartItems={cartItems}
                            clearCart={clearCart}
                            onClose={() => setShowModal(false)}
                        />
                    </Elements>
                </Box>
            </Modal>
        </div>
    );
};

export default CartIndex;

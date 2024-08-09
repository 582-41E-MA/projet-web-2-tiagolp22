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
import {
    Button,
    Modal,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import "./CartIndex.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import Facture from '../Facture/Facture'; // Importez le composant Facture

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.withCredentials = true;

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutForm = ({
    cartItems,
    clearCart,
    onClose,
    selectedShippingMethod,
    onOrderComplete,
}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const { t } = useTranslation();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsProcessing(true);

        if (!stripe || !elements || !selectedShippingMethod) {
            setErrorMessage(t("cart.selectShippingMethodError"));
            setIsProcessing(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
            });

            if (error) {
                console.error("Erreur lors de la création du mode de paiement :", error);
                setErrorMessage(error.message);
                setIsProcessing(false);
                return;
            }

            console.log("Mode de paiement créé :", paymentMethod);

            const requestData = {
                paymentMethod: paymentMethod.id,
                items: cartItems,
                mode_expedition_id: selectedShippingMethod,
            };
            console.log("Données envoyées au serveur :", requestData);

            const response = await axios.post("/api/create-new-order", requestData);

            console.log("Réponse du serveur :", response.data);

            if (response.data.success) {
                console.log("Paiement traité avec succès");
                clearCart();
                onOrderComplete(response.data.order_id);
            } else {
                setErrorMessage("Échec du paiement : " + response.data.message);
            }
        } catch (error) {
            console.error("Erreur lors du paiement :", error.response ? error.response.data : error);
            setErrorMessage("Une erreur est survenue lors du paiement. Veuillez réessayer.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            {errorMessage && <div className="error-message">{errorMessage}</div>}
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
    const { t, i18n } = useTranslation();
    const [cartItems, setCartItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [shippingMethods, setShippingMethods] = useState([]);
    const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
    const [orderCompleted, setOrderCompleted] = useState(false);
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        setCartItems(storedCartItems);

        const fetchShippingMethods = async () => {
            try {
                const response = await axios.get("/api/methodeExpeditions");
                setShippingMethods(response.data);
            } catch (error) {
                console.error("Erreur fetchShippingMethods :", error);
            }
        };
        fetchShippingMethods();
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

    const handleOrderComplete = (newOrderId) => {
        setOrderCompleted(true);
        setOrderId(newOrderId);
    };

    const subtotal = cartItems.reduce(
        (total, item) => total + parseFloat(item.prix_vente || 0),
        0
    );
    const selectedMethod = shippingMethods.find(
        (method) => method.id_methode_expedition === parseInt(selectedShippingMethod)
    );
    const shippingCost = selectedMethod ? parseFloat(selectedMethod.prix_fixe) : 0;
    const totalPrice = (subtotal + shippingCost).toFixed(2);

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
                    <>
                        <ul>
                            {cartItems.map((item, index) => (
                                <li key={index}>
                                    <h3>{item.modele.nom_modele}</h3>
                                    <p>
                                        {t("cart.year")}: <strong>{item.annee}</strong>
                                    </p>
                                    <p>
                                        {t("cart.km")}: <strong>{item.kilometrage} km</strong>
                                    </p>
                                    <p>
                                        {t("cart.price")}: <strong>${item.prix_vente}</strong>
                                    </p>
                                    <Button
                                        variant="contained"
                                        sx={{ backgroundColor: "#c9c9c9" }}
                                        onClick={() => handleRemoveItem(index)}
                                    >
                                        {t("cart.remove")}
                                    </Button>
                                </li>
                            ))}
                        </ul>

                        <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 2 }}>
                            <InputLabel id="shipping-method-label">
                                {t("cart.shippingMethod")}
                            </InputLabel>
                            <Select
                                labelId="shipping-method-label"
                                value={selectedShippingMethod}
                                onChange={(e) => setSelectedShippingMethod(e.target.value)}
                                label={t("cart.shippingMethod")}
                            >
                                <MenuItem value="">{t("cart.selectShippingMethod")}</MenuItem>
                                {shippingMethods.map((method) => (
                                    <MenuItem
                                        key={method.id_methode_expedition}
                                        value={method.id_methode_expedition}
                                    >
                                        {JSON.parse(method.nom_methode_expedition)[i18n.language]} - $
                                        {method.prix_fixe}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <p>{t("cart.subtotal")}: ${subtotal.toFixed(2)}</p>
                        <p>{t("cart.shipping")}: ${shippingCost.toFixed(2)}</p>
                        <p>{t("cart.total")}: ${totalPrice}</p>

                        <div>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#003AA7",
                                    marginRight: "10px",
                                }}
                                onClick={() => setShowModal(true)}
                                disabled={!selectedShippingMethod}
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
                    </>
                )}
            </div>
            <Modal
                open={showModal}
                onClose={() => {
                    if (!orderCompleted) {
                        setShowModal(false);
                    }
                }}
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
                        height: orderCompleted ? 600 : 200,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    {orderCompleted ? (
                        <>
                            <h2>{t("cart.orderConfirmation")}</h2>
                            <Facture commandeId={orderId} />
                            <Button onClick={() => setShowModal(false)}>{t("cart.close")}</Button>
                        </>
                    ) : (
                        <>
                            <h2 id="checkout-modal-title">{t("cart.checkout")}</h2>
                            <Elements stripe={stripePromise}>
                                <CheckoutForm
                                    cartItems={cartItems}
                                    clearCart={clearCart}
                                    onClose={() => setShowModal(false)}
                                    selectedShippingMethod={selectedShippingMethod}
                                    onOrderComplete={handleOrderComplete}
                                />
                            </Elements>
                        </>
                    )}
                </Box>
            </Modal>
        </div>
    );
};

export default CartIndex;

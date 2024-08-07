import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import LoginModal from "../User/Login/LoginModal";
import "./Header.css";
import { Inertia } from "@inertiajs/inertia";
import CartIndex from "../Cart/CartIndex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Drawer, IconButton, Badge } from "@mui/material";
import { useModal } from "../ModalContext/ModalContext";
function Header() {
    const { t, i18n } = useTranslation();
    const { auth } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [showCartDrawer, setShowCartDrawer] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(0);
    const { openLoginModal } = useModal();
    useEffect(() => {
        const storedCartItems = JSON.parse(
            localStorage.getItem("cartItems") || "[]"
        );
        setCartItemCount(storedCartItems.length);
    }, []);

    const handleLogout = () => {
        Inertia.post(
            "/logout",
            {},
            {
                onSuccess: () => {},
            }
        );
    };

    const openCart = () => setShowCartDrawer(true);
    const closeCart = () => setShowCartDrawer(false);

    const handleCartEmpty = () => {
        closeCart();
        setCartItemCount(0);
    };

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    return (
        <header className="custom-header">
            <div className="lang-buttom">
                <button
                    className={`language-button ${
                        i18n.language === "en" ? "active" : ""
                    }`}
                    onClick={() => changeLanguage("en")}
                    aria-label="English"
                >
                    En
                </button>
                <button
                    className={`language-button ${
                        i18n.language === "fr" ? "active" : ""
                    }`}
                    onClick={() => changeLanguage("fr")}
                    aria-label="Français"
                >
                    Fr
                </button>
            </div>
            <div className="wrapper">
                <div className="header-content">
                    <div className="header-section logo-section">
                        <Link href="/" className="logo">
                            <img
                                className="logo"
                                src="../../img/logo/logo.png"
                                alt="Logo QuebeCar"
                            />
                        </Link>
                    </div>
                    <div className="header-section nav-section">
                        <nav className="nav-links">
                            <Link href="/" className="nav-link">
                                {t("header.home")}
                            </Link>
                            <Link href="/voitures" className="nav-link">
                                {t("header.catalogue")}
                            </Link>
                            <Link href="/about" className="nav-link">
                                {t("header.about")}
                            </Link>
                            <Link href="/contact" className="nav-link">
                                {t("header.contact")}
                            </Link>

                            {auth.user && auth.user.privilege === 1 && (
                                <Link href="/dashboard" className="nav-link">
                                    {t("header.dashboard")}
                                </Link>
                            )}
                        </nav>
                    </div>
                    <div className="header-section">
                        <div className="icones">
                            <a
                                href="https://www.google.ca/maps/place/Coll%C3%A8ge+de+Maisonneuve/@45.5508613,-73.5558744,16z/data=!3m1!4b1!4m6!3m5!1s0x4cc91bf5bacbeffd:0x68ff300997eff5c!8m2!3d45.5508613!4d-73.5532995!16zL20vMDU3dHFx?hl=fr&entry=ttu"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    className="icones_navigation"
                                    src="../../img/icones/Location.png"
                                    alt="Location"
                                />
                            </a>
                            {auth.user ? (
                                <div className="dropdown">
                                    <button className="dropdown-button">
                                        <img
                                            className="icones_navigation"
                                            src="../../img/icones/Profil.png"
                                            alt="Profile"
                                        />
                                    </button>
                                    <div className="dropdown-content">
                                        <p className="welcome-message">
                                            {t("header.welcome")}{" "}
                                            {auth.user.name}
                                        </p>
                                        <button
                                            onClick={handleLogout}
                                            className="dropdown-button nav-link"
                                        >
                                            {t("header.logout")}
                                        </button>
                                        <Link
                                            href={`/user/profile/${auth.user.id}`}
                                            className="nav-link"
                                        >
                                            {t("header.profile")}
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="dropdown">
                                    <button className="dropdown-button">
                                        <img
                                            className="icones_navigation"
                                            src="../../img/icones/Profil.png"
                                            alt="Profile"
                                        />
                                    </button>
                                    <div className="dropdown-content">
                                        <button
                                            onClick={() => setShowModal(true)}
                                            className="dropdown-button nav-link"
                                        >
                                            {t("header.login")}
                                        </button>
                                        <Link
                                            href="/register"
                                            className="nav-link"
                                        >
                                            {t("header.register")}
                                        </Link>
                                    </div>
                                </div>
                            )}
                            <IconButton
                                onClick={openCart}
                                className="cart-button"
                                sx={{
                                    padding: 0,
                                    margin: 0,
                                }}
                            >
                                <Badge
                                    badgeContent={cartItemCount}
                                    color="secondary"
                                >
                                    <FontAwesomeIcon
                                        icon={faCartArrowDown}
                                        style={{
                                            color: "#003aa6",
                                            fontSize: "32px",
                                        }}
                                    />
                                </Badge>
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && <LoginModal onClose={() => setShowModal(false)} />}
            <Drawer anchor="right" open={showCartDrawer} onClose={closeCart}>
                <CartIndex
                    onClose={closeCart}
                    onClearCart={handleCartEmpty}
                    setCartItemCount={setCartItemCount}
                    openCart={openCart}
                />
            </Drawer>
        </header>
    );
}

export default Header;

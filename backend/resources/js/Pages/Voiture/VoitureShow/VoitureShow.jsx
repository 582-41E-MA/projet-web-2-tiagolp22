import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { useTranslation } from "react-i18next";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import DetailItem from "./DetailItem/DetailItem";
import "./VoitureShow.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGasPump,
    faCog,
    faCogs,
    faCar,
    faCalendarAlt,
    faMoneyBill,
    faPalette,
    faDoorOpen,
    faTachometerAlt,
    faExclamationCircle,
    faCarSide,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../Modal/Modal";
import moment from "moment-timezone";
import { useModal } from "../../ModalContext/ModalContext";
const VoitureShow = ({ voiture, photos }) => {
    const { t, i18n } = useTranslation();
    const [cartItems, setCartItems] = useState([]);
    const { auth } = usePage().props;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { openLoginModal } = useModal();
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    useEffect(() => {
        const storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const getTranslation = (data) => {
        if (typeof data === "string") {
            const parsedData = JSON.parse(data);
            return i18n.language === "en" ? parsedData.en : parsedData.fr;
        } else if (typeof data === "object") {
            return i18n.language === "en" ? data.en : data.fr;
        }
        return "";
    };

    const addToCart = () => {
        if (!cartItems.some((item) => item.id_voiture === voiture.id_voiture)) {
            const updatedCart = [...cartItems, voiture];
            setCartItems(updatedCart);
        } else {
            alert(t("cart.already_in_cart")); // Usar tradução para mensagens
        }
    };
    const redirectLogin = () => {
        openLoginModal();
        return;
    };
    const makeReservation = async () => {
        if (!auth.user) {
            openLoginModal();
            return;
        }
        try {
            const now = moment()
                .tz("America/Toronto")
                .format("YYYY-MM-DD HH:mm:ss");
            const response = await Inertia.post("/reservations", {
                id_voiture: voiture.id_voiture,
                id_utilisateur: auth.user.id,
                date_reservation: now,
                status: "reservation",
            });
            window.location.href = `/user/profile/${auth.user.id}`;
        } catch (error) {
            console.log("error const makeReservation ");
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "25%",
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    centerPadding: "10%",
                },
            },
            {
                breakpoint: 620,
                settings: {
                    centerMode: true,
                    centerPadding: "0",
                },
            },
        ],
    };

    return (
        <>
            <Header />
            <div className="banner-details wrapper">
                <h2>
                    {voiture.modele.nom_modele} - {voiture.annee}
                </h2>
                <h2>{voiture.prix_vente} $</h2>
            </div>
            <div className="wrapper">
                <div className="voiture-show-banner">
                    <Slider {...settings}>
                        {photos.map((photo) => (
                            <div key={photo.id} className="slider-item">
                                <img
                                    src={photo.photo_url}
                                    alt={`Photo ${photo.id}`}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className="action-user">
                    <div className="btn-add-reservation">
                        <button
                            onClick={auth.user ? openModal : redirectLogin}
                            className={`btn btn-secondary`}
                        >
                             {t("reservation.button_reservation")}
                        </button>

                        <Modal
                            isOpen={modalIsOpen}
                            onClose={closeModal}
                            onConfirm={makeReservation}
                            message={t("reservation_modal.message", {
                                car_model: voiture.modele.nom_modele,
                                car_year: voiture.annee,
                            })}
                        />
                        <button
                            onClick={auth.user ? addToCart : redirectLogin}
                            className={`btn-cart ${
                                !auth.user ? "disabled-btn" : ""
                            }`}
                        >
                            {t("cart.car_show.add_to_cart")}
                        </button>
                    </div>
                </div>

                <div className="details-box">
                    <h2>{t("car_show.general_info")}</h2>
                    <div className="details-section">
                        <DetailItem
                            icon={faCarSide}
                            label={t("car.model")}
                            value={voiture.modele.nom_modele}
                        />
                        <DetailItem
                            icon={faGasPump}
                            label={t("car.fuel_type")}
                            value={getTranslation(
                                voiture.type_carburant.type_carburant
                            )}
                        />
                        <DetailItem
                            icon={faCog}
                            label={t("car.transmission_type")}
                            value={getTranslation(
                                voiture.transmission.type_transmission
                            )}
                        />
                        <DetailItem
                            icon={faCogs}
                            label={t("car.powertrain_group")}
                            value={getTranslation(
                                voiture.groupe_motopropulseur
                                    .type_groupe_motopropulseur
                            )}
                        />
                        <DetailItem
                            icon={faCar}
                            label={t("car.body_type")}
                            value={getTranslation(
                                voiture.carrosserie.type_carrosserie
                            )}
                        />
                        <DetailItem
                            icon={faCalendarAlt}
                            label={t("car.year")}
                            value={voiture.annee}
                        />
                        <DetailItem
                            icon={faMoneyBill}
                            label={t("car.sale_price")}
                            value={voiture.prix_vente}
                        />
                        <DetailItem
                            icon={faPalette}
                            label={t("car.color")}
                            value={getTranslation(voiture.couleur)}
                        />
                        <DetailItem
                            icon={faDoorOpen}
                            label={t("car.number_of_doors")}
                            value={voiture.nombre_portes}
                        />
                        <DetailItem
                            icon={faTachometerAlt}
                            label={t("car.mileage")}
                            value={voiture.kilometrage}
                        />
                        <DetailItem
                            icon={faExclamationCircle}
                            label={t("car.vehicle_condition")}
                            value={getTranslation(voiture.etat_vehicule)}
                        />
                    </div>
                    <h3>{t("car.description")}</h3>
                    <p className="description-paragraph">
                        {getTranslation(voiture.description)}
                    </p>
                </div>
                <Link href="/voitures" className="back-button">
                    {t("car_show.back")}
                </Link>
            </div>
            <Footer />
        </>
    );
};

export default VoitureShow;

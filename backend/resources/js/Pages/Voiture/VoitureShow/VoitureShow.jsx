import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import DetailItem from "../DetailItem/DetailItem";
import "./VoitureShow.css";

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


const VoitureShow = ({ voiture }) => {
    const { t, i18n } = useTranslation();

    // Fonction pour obtenir la traduction correcte en fonction de la langue actuelle
    const getTranslation = (data) => {
        if (typeof data === "string") {
            const parsedData = JSON.parse(data);
            return i18n.language === "en" ? parsedData.en : parsedData.fr;
        } else if (typeof data === "object") {
            return i18n.language === "en" ? data.en : data.fr;
        }
        return "";
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
                <div className="voiture-show">
                    <img
                        className="voiture-show-banner"
                        src={
                            voiture.photos && voiture.photos.length > 0
                                ? voiture.photos[0].url_photo
                                : "../../../../img/car/default_car.png"
                        }
                        alt={voiture.modele.nom_modele}
                    />
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

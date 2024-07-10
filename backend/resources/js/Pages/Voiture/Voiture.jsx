import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Filters from "./Filtres/Filtres";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import "./Voiture.css";

function Voiture({ voitures: initialVoitures }) {
    const { t, i18n } = useTranslation();
    const [voitures, setVoitures] = useState(initialVoitures);

    useEffect(() => {
        setVoitures(initialVoitures);
    }, [initialVoitures]);

    const handleFilter = (filteredVoitures) => {
        setVoitures(filteredVoitures);
    };

    return (
        <>
            <Header />
            <img
                className="banner_catalog"
                src="/img/banner/banner_catalog.jpg"
                alt="bannière"
            />
            <div className="container">
                <div className="filters-section">
                    <Filters onFilter={handleFilter} />
                </div>
                <div className="cars-section">
                    <div className="cars-grid">
                        {voitures.map((voiture, index) => (
                            <div key={index} className="car-link">
                                <Link
                                    href={`/voitures/${voiture.id_voiture}`}
                                    className="car-link"
                                >
                                    <div className="car">
                                        <img
                                            src={
                                                voiture.photo_url
                                                    ? voiture.photo_url
                                                    : "../../../img/car/default_car.png"
                                            }
                                            alt={voiture.modele.nom_modele}
                                            className="car-photo"
                                        />
                                        <h3 className="car-title">
                                            {voiture.annee}{" "}
                                            {voiture.modele.nom_modele}
                                        </h3>
                                        <p>
                                            {voiture.description
                                                ? JSON.parse(
                                                      voiture.description
                                                  )[i18n.language]
                                                : t("car_show.no_description")}
                                        </p>
                                        <button className="details-button">
                                            Plus d'info
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Voiture;

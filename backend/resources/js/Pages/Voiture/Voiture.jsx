import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Filters from "./Filtres/Filtres";
import { Link, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import "./Voiture.css";
import axios from "axios";
import Modal from "./Modal";

function Voiture({ voitures: initialVoitures, privilege_id }) {
    const { t, i18n } = useTranslation();
    const { reload } = usePage(); 
    const [voitures, setVoitures] = useState(initialVoitures);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [voitureToDelete, setVoitureToDelete] = useState(null);

    useEffect(() => {
        console.log("Privilege ID:", privilege_id);
    }, [privilege_id]);

    const handleFilter = (filteredVoitures) => {
        setVoitures(filteredVoitures);
    };

    const handleDeleteClick = (id) => {
        setVoitureToDelete(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (voitureToDelete) {
            try {
                await axios.delete(`/voitures/${voitureToDelete}`);
                setVoitures(voitures.filter(voiture => voiture.id_voiture !== voitureToDelete));
                setIsModalOpen(false);
                setVoitureToDelete(null);
                window.location.reload();
            } catch (error) {
                console.error("Erreur lors de la suppression de la voiture:", error);
            }
        }
    };
    

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setVoitureToDelete(null);
    };

    const handleCarClick = (e, id) => {
        if (e.target.closest('.admin-actions')) {
            e.preventDefault();
        }
    };

    return (
        <>
            <Header />
            <img
                className="banner_catalog"
                src="/img/banner/banner_catalog.jpg"
                alt="bannière"
            />
            <div className="voiture-container">
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
                                    onClick={handleCarClick}
                                >
                                <div className="car">
                                    <img
                                        src={voiture.photo_url || "../../../img/car/default_car.png"}
                                        
                                        alt={voiture.modele.nom_modele}
                                        className="car-photo"
                                    />
                                    <h3 className="car-title">
                                        {voiture.annee} {voiture.modele.constructeur.nom_constructeur} {voiture.modele.nom_modele}
                                    </h3>
                                    <p className="car-description">
                                        {voiture.description
                                            ? JSON.parse(voiture.description)[i18n.language]
                                            : t("car_show.no_description")}
                                    </p>
                                    <button className="details-button">
                                        Plus d'info
                                    </button>
                                    {(privilege_id === 1 || privilege_id === 3) && (
                                        <div className="admin-actions">
                                            <Link
                                                href={`/voitures/${voiture.id_voiture}/edit`}
                                                className="edit-button"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {t("edit")}
                                            </Link>
                                            {privilege_id === 1 && (
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleDeleteClick(voiture.id_voiture);
                                                    }}
                                                    className="delete-button"
                                                >
                                                    {t("delete")}
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                message={t("confirm_delete")}
            />
            <Footer />
        </>
    );
}

export default Voiture;

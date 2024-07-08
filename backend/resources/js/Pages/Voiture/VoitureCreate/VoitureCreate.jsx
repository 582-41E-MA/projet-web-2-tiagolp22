import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/inertia-react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import axios from "axios";
import { useTranslation } from "react-i18next";

const VoitureCreate = ({
    typesCarburant,
    modeles,
    transmissions,
    groupesMotopropulseur,
    carrosseries,
}) => {
    const { t, i18n } = useTranslation();

    const { data, setData, post, processing, errors } = useForm({
        modele_id: "",
        annee: "",
        date_arrivee: "",
        prix_achat: "",
        prix_vente: "",
        couleur: {
            en: "",
            fr: "",
        },
        type_transmission_id: "",
        groupe_motopropulseur_id: "",
        type_carburant_id: "",
        carrosserie_id: "",
        nombre_portes: "",
        nombre_places: "",
        kilometrage: "",
        description: "",
        etat_vehicule: {
            en: "",
            fr: "",
        },
        commandes_id_commande: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formattedData = {
            ...data,
            couleur: JSON.stringify(data.couleur),
            etat_vehicule: JSON.stringify(data.etat_vehicule),
        };
        console.log(formattedData);
        post("/voitures", {
            data: formattedData,
            onSuccess: () => {
                console.log("Voiture créée avec succès!");
            },
            onError: (errors) => {
                console.error("Error", errors);
            },
        });
    };

    return (
        <>
            <Header />
            <div className="form-container">
                <img
                    className="logo_formulaire"
                    src="../../../img/logo/logo.png"
                    alt="Logo"
                />
                <h3>{t("car.title")}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="modele_id">
                            {t("car.model")}
                        </label>
                        <select
                            className="form-select"
                            name="modele_id"
                            id="modele_id"
                            value={data.modele_id}
                            onChange={(e) => {
                                const selectedModelId = e.target.value;
                                setData("modele_id", selectedModelId);
                            }}
                        >
                            <option value="">
                                {t("car.select_option")}
                            </option>
                            {modeles.map((modele) => (
                                <option
                                    className="form-option"
                                    key={modele.id_modele}
                                    value={modele.id_modele}
                                >
                                    {modele.nom_modele}
                                </option>
                            ))}
                        </select>
                        {errors.modele_id && (
                            <span className="error">{errors.modele_id}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="annee">{t("car.year")}</label>
                        <select
                            className="form-select"
                            name="annee"
                            id="annee"
                            value={data.annee}
                            onChange={(e) => setData("annee", e.target.value)}
                        >
                            <option className="form-option" value="">
                                {t("car.select_option")}
                            </option>
                            {Array.from(
                                { length: 35 },
                                (_, index) => 1990 + index
                            ).map((year) => (
                                <option
                                    className="form-option"
                                    key={year}
                                    value={year}
                                >
                                    {year}
                                </option>
                            ))}
                        </select>
                        {errors.annee && (
                            <span className="error">{errors.annee}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="date_arrivee">
                            {t("car.arrival_date")}
                        </label>
                        <input
                            className="date"
                            type="date"
                            name="date_arrivee"
                            id="date_arrivee"
                            value={data.date_arrivee}
                            onChange={(e) =>
                                setData("date_arrivee", e.target.value)
                            }
                        />
                        {errors.date_arrivee && (
                            <span className="error">{errors.date_arrivee}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="prix_achat">
                            {t("car.purchase_price")}
                        </label>
                        <input
                            type="text"
                            name="prix_achat"
                            id="prix_achat"
                            value={data.prix_achat}
                            onChange={(e) =>
                                setData("prix_achat", e.target.value)
                            }
                        />
                        {errors.prix_achat && (
                            <span className="error">{errors.prix_achat}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="prix_vente">
                            {t("car.sale_price")}
                        </label>
                        <input
                            type="text"
                            name="prix_vente"
                            id="prix_vente"
                            value={data.prix_vente}
                            onChange={(e) =>
                                setData("prix_vente", e.target.value)
                            }
                        />
                        {errors.prix_vente && (
                            <span className="error">{errors.prix_vente}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="couleur">{t("car.color")}</label>
                        <input
                            type="text"
                            name="couleur"
                            id="couleur"
                            value={data.couleur[i18n.language]}
                            onChange={(e) => {
                                setData("couleur", {
                                    ...data.couleur,
                                    [i18n.language]: e.target.value,
                                });
                            }}
                        />
                        {errors.couleur && (
                            <span className="error">{errors.couleur}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="type_transmission_id">
                            {t("car.transmission_type")}
                        </label>
                        <div className="form-group">
                            <select
                                className="form-select"
                                name="type_transmission_id"
                                id="type_transmission_id"
                                value={data.type_transmission}
                                onChange={(e) => {
                                    const selectedTransmissionId =
                                        e.target.value;
                                    setData(
                                        "type_transmission_id",
                                        selectedTransmissionId
                                    );
                                }}
                            >
                                <option value="">
                                    {t("car.select_option")}
                                </option>
                                {transmissions.map((transmission) => (
                                    <option
                                        className="form-option"
                                        key={transmission.id}
                                        value={transmission.id_transmission}
                                    >
                                        {i18n.language === "en"
                                            ? JSON.parse(
                                                  transmission.type_transmission
                                              ).en
                                            : JSON.parse(
                                                  transmission.type_transmission
                                              ).fr}
                                    </option>
                                ))}
                            </select>
                            {errors.type_transmission_id && (
                                <span className="error">
                                    {errors.type_transmission_id}
                                </span>
                            )}
                        </div>

                        {errors.type_transmission_id && (
                            <span className="error">
                                {errors.type_transmission_id}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="groupe_motopropulseur_id">
                            {t("car.powertrain_group")}
                        </label>
                        <select
                            className="form-select"
                            name="groupe_motopropulseur_id"
                            id="groupe_motopropulseur_id"
                            value={data.groupe_motopropulseur_id}
                            onChange={(e) => {
                                const selectedGroupeId = e.target.value;
                                setData(
                                    "groupe_motopropulseur_id",
                                    selectedGroupeId
                                );
                            }}
                        >
                            <option className="form-option" value="">
                                {t("car.select_option")}
                            </option>
                            {groupesMotopropulseur.map((groupe) => (
                                <option
                                    key={groupe.id_groupe_motopropulseur}
                                    value={groupe.id_groupe_motopropulseur}
                                >
                                    {i18n.language === "en"
                                        ? JSON.parse(
                                              groupe.type_groupe_motopropulseur
                                          ).en
                                        : JSON.parse(
                                              groupe.type_groupe_motopropulseur
                                          ).fr}
                                </option>
                            ))}
                        </select>
                        {errors.groupe_motopropulseur_id && (
                            <span className="error">
                                {errors.groupe_motopropulseur_id}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="type_carburant_id">
                            {t("car.fuel_type")}
                        </label>
                        <select
                            className="form-select"
                            name="type_carburant_id"
                            id="type_carburant_id"
                            value={data.type_carburant_id}
                            onChange={(e) => {
                                const selectedCarburantId = e.target.value;
                                setData(
                                    "type_carburant_id",
                                    selectedCarburantId
                                );
                            }}
                        >
                            <option value="">
                                {t("car.select_option")}
                            </option>
                            {typesCarburant.map((carburant) => (
                                <option
                                    key={carburant.id}
                                    value={carburant.id_type_carburant}
                                >
                                    {i18n.language === "en"
                                        ? JSON.parse(carburant.type_carburant)
                                              .en
                                        : JSON.parse(carburant.type_carburant)
                                              .fr}
                                </option>
                            ))}
                        </select>
                        {errors.type_carburant_id && (
                            <span className="error">
                                {errors.type_carburant_id}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="carrosserie_id">
                            {t("car.body_type")}
                        </label>
                        <select
                            className="form-select"
                            name="carrosserie_id"
                            id="carrosserie_id"
                            value={data.carrosserie_id}
                            onChange={(e) => {
                                const selectedCarrosserieId = e.target.value;
                                setData(
                                    "carrosserie_id",
                                    selectedCarrosserieId
                                );
                            }}
                        >
                            <option value="">
                                {t("car.select_option")}
                            </option>
                            {carrosseries.map((carrosserie) => (
                                <option
                                    className="form-option"
                                    key={carrosserie.id}
                                    value={carrosserie.id_carrosserie}
                                >
                                    {i18n.language === "en"
                                        ? JSON.parse(
                                              carrosserie.type_carrosserie
                                          ).en
                                        : JSON.parse(
                                              carrosserie.type_carrosserie
                                          ).fr}
                                </option>
                            ))}
                        </select>
                        {errors.carrosserie_id && (
                            <span className="error">
                                {errors.carrosserie_id}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="nombre_portes">
                            {t("car.number_of_doors")}
                        </label>
                        <input
                            type="text"
                            name="nombre_portes"
                            id="nombre_portes"
                            value={data.nombre_portes}
                            onChange={(e) =>
                                setData("nombre_portes", e.target.value)
                            }
                        />
                        {errors.nombre_portes && (
                            <span className="error">
                                {errors.nombre_portes}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="nombre_places">
                            {t("car.number_of_seats")}
                        </label>
                        <input
                            type="text"
                            name="nombre_places"
                            id="nombre_places"
                            value={data.nombre_places}
                            onChange={(e) =>
                                setData("nombre_places", e.target.value)
                            }
                        />
                        {errors.nombre_places && (
                            <span className="error">
                                {errors.nombre_places}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="kilometrage">
                            {t("car.mileage")}
                        </label>
                        <input
                            type="text"
                            name="kilometrage"
                            id="kilometrage"
                            value={data.kilometrage}
                            onChange={(e) =>
                                setData("kilometrage", e.target.value)
                            }
                        />
                        {errors.kilometrage && (
                            <span className="error">{errors.kilometrage}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">
                            {t("car.description")}
                        </label>
                        <textarea
                            className="form-textarea"
                            name="description"
                            id="description"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />
                        {errors.description && (
                            <span className="error">{errors.description}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="etat_vehicule">etat</label>
                        <input
                            type="text"
                            name="etat_vehicule"
                            id="etat_vehicule"
                            value={data.etat_vehicule[i18n.language]}
                            onChange={(e) => {
                                setData("etat_vehicule", {
                                    ...data.etat_vehicule,
                                    [i18n.language]: e.target.value,
                                });
                            }}
                        />
                        {errors.etat_vehicule && (
                            <span className="error">
                                {errors.etat_vehicule}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="commandes_id_commande">
                            {t("car.order_id")}
                        </label>
                        <input
                            type="text"
                            name="commandes_id_commande"
                            id="commandes_id_commande"
                            value={data.commandes_id_commande}
                            onChange={(e) =>
                                setData("commandes_id_commande", e.target.value)
                            }
                        />
                        {errors.commandes_id_commande && (
                            <span className="error">
                                {errors.commandes_id_commande}
                            </span>
                        )}
                    </div>

                    <button type="submit" disabled={processing}>
                        {t("car.submit_button")}
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default VoitureCreate;

import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { useTranslation } from "react-i18next";
import "./VoitureCreate.css";

const VoitureCreate = ({
    typesCarburant,
    modeles,
    transmissions,
    groupesMotopropulseur,
    carrosseries,
    privilege_id,
}) => {
    const { t, i18n } = useTranslation();
    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        modele_id: "",
        annee: "",
        date_arrivee: "",
        prix_achat: "",
        prix_vente: "",
        couleur: { en: "", fr: "" },
        type_transmission_id: "",
        groupe_motopropulseur_id: "",
        type_carburant_id: "",
        carrosserie_id: "",
        nombre_portes: "",
        nombre_places: "",
        kilometrage: "",
        description: { en: "", fr: "" },
        etat_vehicule: { en: "", fr: "" },
        commandes_id_commande: null,
        photos: [],
    });

    const [thumbnails, setThumbnails] = useState([]);

    useEffect(() => {
        const prixAchat = parseFloat(data.prix_achat);
        if (!isNaN(prixAchat)) {
            setData("prix_vente", (prixAchat * 1.25).toString());
        }
    }, [data.prix_achat]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setData("photos", files);

        const newThumbnails = files.map((file) => ({
            id: URL.createObjectURL(file),
            file,
        }));
        setThumbnails((prevThumbnails) => [...prevThumbnails, ...newThumbnails]);
    };

    const validateFields = () => {
        const newErrors = {};

        const fields = [
            { key: "modele_id", message: "model_required" },
            { key: "annee", message: "year_invalid", validate: (value) => value >= 1900 && value <= new Date().getFullYear() + 1 },
            { key: "date_arrivee", message: "arrival_date_required" },
            { key: "prix_achat", message: "purchase_price_invalid", validate: (value) => !isNaN(value) && value >= 0 },
            { key: "prix_vente", message: "sell_price_invalid", validate: (value) => !isNaN(value) && value >= 0 },
            { key: "couleur", message: "color_required" },
            { key: "type_transmission_id", message: "transmission_type_required" },
            { key: "groupe_motopropulseur_id", message: "powertrain_group_required" },
            { key: "type_carburant_id", message: "fuel_type_required" },
            { key: "carrosserie_id", message: "body_type_required" },
            { key: "nombre_portes", message: "number_of_doors_invalid", validate: (value) => !isNaN(value) && value >= 1 },
            { key: "nombre_places", message: "number_of_seats_invalid", validate: (value) => !isNaN(value) && value >= 1 },
            { key: "kilometrage", message: "mileage_invalid", validate: (value) => !isNaN(value) && value >= 0 },
            { key: "etat_vehicule", message: "vehicle_state_required" },
            { key: "photos", message: "minimum_photos_required", validate: (value) => value.length >= 3 }
        ];

        fields.forEach(({ key, message, validate }) => {
            const value = data[key];
            if (!value || (validate && !validate(value))) {
                newErrors[key] = t(`car.errors.${message}`);
            }
        });
        console.log(newErrors);
        
        return newErrors;
    };
    const parseJsonField = (field) => {
        if (typeof field === 'string') {
            try {
                return JSON.parse(field);
            } catch (e) {
                console.error('Erreur de parsing JSON:', e);
                return {};
            }
        }
        return field;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        clearErrors();

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (key === "photos") {
                data.photos.forEach((file, index) => {
                    formData.append(`photos[${index}]`, file);
                });
            } else {
                formData.append(key, data[key]);
            }
        });

        const validationErrors = validateFields();

        if (Object.keys(validationErrors).length > 0) {
            Object.keys(validationErrors).forEach((field) => {
                setError(field, validationErrors[field]);
            });
            return;
        }

        try {
            await post("/voitures", {
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Voiture créée avec succès !");
        } catch (error) {
            console.error("Erreur lors de la création de la voiture :", error);
        }
    };

    return (
        <>
            <div className="form-container">
                <img
                    className="logo_formulaire"
                    src="../../../img/logo/logo.png"
                    alt="Logo"
                />
                <h3>{t("car.title_create")}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="photos">{t("car.photos")}</label>
                        <input
                            type="file"
                            name="photos"
                            id="photos"
                            multiple
                            onChange={handleFileChange}
                        />
                        {errors.photos && (
                            <span className="error">{errors.photos}</span>
                        )}
                    </div>
                    <div className="thumbnails-container">
                        {thumbnails.map((thumbnail, index) => (
                            <div key={index} className="thumbnail">
                                <img
                                    src={thumbnail.id}
                                    alt={`Thumbnail ${index}`}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="form-group">
                        <label htmlFor="modele_id">{t("car.model")}</label>
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
                            <option value="">{t("car.select_option")}</option>
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
                            type="number"
                            id="prix_vente"
                            name="prix_vente"
                            className="form-control"
                            value={data.prix_vente}
                            onChange={(e) =>
                                setData("prix_vente", e.target.value)
                            }
                            disabled={privilege_id !== 1}
                        />
                        {errors.prix_vente && (
                            <div className="error">
                                {errors.prix_vente}
                            </div>
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
                            <div className="error">
                                {errors.couleur}
                                </div>
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
                                        ? parseJsonField(transmission.type_transmission).en
                                        : parseJsonField(transmission.type_transmission).fr}
                                </option>
                                ))}
                            </select>
                            {errors.type_transmission_id && (
                                <span className="error">
                                    {errors.type_transmission_id}
                                </span>
                            )}
                        </div>
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
                                    ? parseJsonField(groupe.type_groupe_motopropulseur).en
                                    : parseJsonField(groupe.type_groupe_motopropulseur).fr}
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
                            <option value="">{t("car.select_option")}</option>
                            {typesCarburant.map((carburant) => (
                                <option
                                key={carburant.id}
                                value={carburant.id_type_carburant}
                            >
                                {i18n.language === "en"
                                    ? parseJsonField(carburant.type_carburant).en
                                    : parseJsonField(carburant.type_carburant).fr}
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
                            <option value="">{t("car.select_option")}</option>
                            {carrosseries.map((carrosserie) => (
                                <option
                                className="form-option"
                                key={carrosserie.id}
                                value={carrosserie.id_carrosserie}
                            >
                                {i18n.language === "en"
                                    ? parseJsonField(carrosserie.type_carrosserie).en
                                    : parseJsonField(carrosserie.type_carrosserie).fr}
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
                                setData("nombre_portes",
                                     e.target.value)
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
                        <label htmlFor="kilometrage">{t("car.mileage")}</label>
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
                            value={data.description[i18n.language]}
                            onChange={(e) => {
                                setData("description", {
                                    ...data.description,
                                    [i18n.language]: e.target.value,
                                });
                            }}
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


                    <button className ="create-button" type="submit" disabled={processing}>
                        {t("car.submit_button")}
                    </button>
                </form>
            </div>
        </>
    );
};

export default VoitureCreate;

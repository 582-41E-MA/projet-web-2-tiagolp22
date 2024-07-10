import React, { useState, useEffect } from "react";
import "./Filtres.css";
import { useTranslation } from "react-i18next";
import axios from "axios";

function Filters({ onFilter }) {
    const { t } = useTranslation();
    const [filters, setFilters] = useState({
        etat: "",
        constructeur: "",
        modele: "",
        annee: "",
        prix_max: "",
        couleur: "",
        nombre_places: "",
        nombre_portes: "",
    });
    const [options, setOptions] = useState({
        colors: [""],
        modeles: [],
        constructeurs: [],
    });

    useEffect(() => {
        axios
            .get("/api/voitures/filter")
            .then((response) => {
                const { colors, modeles, constructeurs } =
                    response.data.filters;
                setOptions({
                    colors: ["", ...colors],
                    modeles: ["", ...modeles],
                    constructeurs: ["", ...constructeurs],
                });
            })
            .catch((error) => {
                console.error("Error fetching filter options", error);
            });
    }, []);

    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const applyFilters = () => {
        axios
            .get("/api/voitures/filter", { params: filters })
            .then((response) => {
                onFilter(response.data.voitures);
            })
            .catch((error) => {
                console.error("Error fetching filtered cars", error);
            });
    };

    return (
        <div className="filters-container">
            <h3>{t("filters.filtres")}</h3>
            <div>
                <label>{t("filters.État")}</label>
                <select
                    name="etat"
                    value={filters.etat}
                    onChange={handleChange}
                >
                    <option key="" value="">{t("filters.Tous")}</option>
                    <option key="Neuf" value="Neuf">{t("filters.Neuf")}</option>
                    <option key="Occasion" value="Occasion">{t("filters.Occasion")}</option>
                </select>
            </div>
            <div>
                <label>{t("filters.Constructeur")}</label>
                <select
                    name="constructeur"
                    value={filters.constructeur}
                    onChange={handleChange}
                >
                    {options.constructeurs.map((constructeur, index) => (
                        <option key={index} value={constructeur}>
                            {constructeur}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>{t("filters.Modèle")}</label>
                <select
                    name="modele"
                    value={filters.modele}
                    onChange={handleChange}
                >
                    {options.modeles.map((modele, index) => (
                        <option key={index} value={modele}>
                            {modele}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>{t("filters.Année")}</label>
                <input
                    name="annee"
                    type="number"
                    value={filters.annee}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>{t("filters.Prix maximum")}</label>
                <input
                    name="prix_max"
                    type="number"
                    value={filters.prix_max}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>{t("filters.Couleur")}</label>
                <select
                    name="couleur"
                    value={filters.couleur}
                    onChange={handleChange}
                >
                    {options.colors.map((color, index) => (
                        <option key={index} value={color}>
                            {color}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>{t("filters.Nombre de places")}</label>
                <select
                    name="nombre_places"
                    value={filters.nombre_places}
                    onChange={handleChange}
                >
                    <option key="" value="">{t("filters.Toutes")}</option>
                    <option key="2" value="2">{t("filters.2")}</option>
                    <option key="4" value="4">{t("filters.4")}</option>
                    <option key="5" value="5">{t("filters.5")}</option>
                </select>
            </div>
            <div>
                <label>{t("filters.Nombre de portes")}</label>
                <select
                    name="nombre_portes"
                    value={filters.nombre_portes}
                    onChange={handleChange}
                >
                    <option key="" value="">{t("filters.Toutes")}</option>
                    <option key="2" value="2">{t("filters.2")}</option>
                    <option key="3" value="3">{t("filters.3")}</option>
                    <option key="4" value="4">{t("filters.4")}</option>
                </select>
            </div>
            <button onClick={applyFilters}>
                {t("filters.Appliquer filtres")}
            </button>
        </div>
    );
}

export default Filters;

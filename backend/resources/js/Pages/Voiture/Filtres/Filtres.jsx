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
                const { colors, modeles, constructeurs } = response.data.filters;
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
            <h3>{t("filters.filters")}</h3>
        
            <div>
                <label>{t("filters.Manufacturer")}</label>
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
                <label>{t("filters.Model")}</label>
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
                <label>{t("filters.Year")}</label>
                <input
                    name="annee"
                    type="number"
                    value={filters.annee}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>{t("filters.Maximum Price")}</label>
                <input
                    name="prix_max"
                    type="number"
                    value={filters.prix_max}
                    onChange={handleChange}
                />
            </div>
            
            <div>
                <label>{t("filters.Number of Seats")}</label>
                <select
                    name="nombre_places"
                    value={filters.nombre_places}
                    onChange={handleChange}
                >
                    <option value="">{t("filters.All")}</option>
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div>
                <label>{t("filters.Number of Doors")}</label>
                <select
                    name="nombre_portes"
                    value={filters.nombre_portes}
                    onChange={handleChange}
                >
                    <option value="">{t("filters.All")}</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <button onClick={applyFilters}>
                {t("filters.Apply Filters")}
            </button>
        </div>
    );
}

export default Filters;

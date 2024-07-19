import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './ModeleEdit.css'; 
import ModeleIndex from '../ModeleIndex';
const ModeleEdit = ({ id, constructeurs }) => {
    console.log(constructeurs);
    const { t } = useTranslation(); 
    const [data, setData] = useState({
        nom_modele: '',
        id_constructeur: '',
    });

    useEffect(() => {
        const fetchModele = async () => {
            try {
                console.log(data);
                const response = await axios.get(`modeles/${modele.id_modele}`);
                setData(response.data);
                
            } catch (error) {
                console.error("Erreur lors du chargement du modèle", error);
            }
        };

        fetchModele();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(`/modeles/${id}`, data, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                console.log("Modèle mis à jour avec succès");
            },
            onError: (errors) => {
                console.error("Erreur lors de la mise à jour du modèle", errors);
            },
        });
    };

    return (
        <div className="modele-edit-container">
            <h1>{t('model.edit_title')}</h1> 
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>{t('model.name')}</label>
                    <input
                        type="text"
                        name="nom_modele"
                        value={data.nom_modele}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>{t('model.manufacturer')}</label>
                    <select
                        name="constructeur_id"
                        value={data.constructeur_id}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="">{t('model.select_manufacturer')}</option>
                        {constructeurs.map((constructeur) => (
                            <option key={constructeur.id_constructeur} value={constructeur.id_constructeur}>
                                {constructeur.nom_constructeur}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    {t('model.update_button')} 
                </button>
            </form>
        </div>
    );
};

export default ModeleEdit;
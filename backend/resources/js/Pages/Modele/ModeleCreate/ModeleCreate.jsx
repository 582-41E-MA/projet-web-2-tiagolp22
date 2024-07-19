import React from 'react';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import './ModeleCreate.css';

const ModeleCreate = ({ constructeurs }) => {
    const { t } = useTranslation();
    const { data, setData, post, errors } = useForm({
        nom_modele: '',
        constructeur_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/modele", {
            data: {
                nom_modele: data.nom_modele,
                constructeur_id: data.constructeur_id,
            },
            headers: {
                "Content-Type": "multipart/form-data", 
            },
            onSuccess: () => {
                console.log("Modèle créé avec succès");
                
            },
            onError: (errors) => {
                console.error("Erreur lors de la création du modèle", errors);
                
            },
        });
    };
    

    return (
        <>
            <div className="modele-create-container">
                <h1>{t('model.create')}</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>{t('model.name')}</label>
                        <input
                            type="text"
                            value={data.nom_modele}
                            onChange={(e) => setData('nom_modele', e.target.value)}
                        />
                        {errors.nom_modele && <span>{errors.nom_modele}</span>}
                    </div>
                    <div>
                        <label>{t('model.manufacturer')}</label>
                        <select
                            value={data.constructeur_id}
                            onChange={(e) => setData('constructeur_id', e.target.value)}
                        >
                            <option value="">Sélectionner un constructeur</option>
                            {constructeurs.map((constructeur) => (
                                <option key={constructeur.id_constructeur} value={constructeur.id_constructeur}>
                                    {constructeur.nom_constructeur} 
                                </option>
                            ))}
                        </select>
                        {errors.constructeur_id && <span>{errors.constructeur_id}</span>}
                    </div>
                    <button type="submit">{t('model.create_button')}</button>
                </form>
            </div>
        </>
    );
};

export default ModeleCreate;

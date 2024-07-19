import React from 'react';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import './ConstructeurCreate.css';

const ConstructeurCreate = ({ constructeurs }) => {
    const { t } = useTranslation();
    const { data, setData, post, errors } = useForm({
        nom_constructeur: '',
        pays_origine: '', 
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/constructeur", {
            nom_constructeur: data.nom_constructeur,
            pays_origine: data.pays_origine,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
            onSuccess: () => {
                console.log("Constructeur créé avec succès");
            },
            onError: (errors) => {
                console.error("Erreur lors de la création du constructeur", errors);
            },
        });
    };

    return (
        <>
            <div className="constructeur-create-container">
                <h1>{t('constructeur.create')}</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>{t('constructeur.name')}</label>
                        <input
                            type="text"
                            value={data.nom_constructeur}
                            onChange={(e) => setData('nom_constructeur', e.target.value)}
                        />
                        {errors.nom_constructeur && <span>{errors.nom_constructeur}</span>}
                    </div>
                    <div>
                        <label>{t('constructeur.origin_country')}</label>
                        <input
                            type="text"
                            value={data.pays_origine}
                            onChange={(e) => setData('pays_origine', e.target.value)}
                        />
                        {errors.pays_origine && <span>{errors.pays_origine}</span>}
                    </div>
                    <button type="submit">{t('constructeur.create_button')}</button>
                </form>
            </div>
        </>
    );
};

export default ConstructeurCreate;

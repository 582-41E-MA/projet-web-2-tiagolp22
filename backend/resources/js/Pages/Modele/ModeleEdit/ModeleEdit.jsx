import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { useTranslation } from 'react-i18next';
import './ModeleEdit.css'; 

const ModeleEdit = () => {
    const { t } = useTranslation(); 
    const { modele } = usePage().props;
    const [data, setData] = useState({
        nom_modele: modele.nom_modele || '',
        constructeur_id: modele.constructeur_id || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(`/modeles/${modele.id_modele}`, data, {
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
        <>
            <Header />
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

                    <button type="submit" className="btn btn-primary">
                        {t('model.update_button')} 
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default ModeleEdit;

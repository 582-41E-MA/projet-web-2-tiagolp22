import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { useTranslation } from 'react-i18next';
import './VilleEdit.css'; 

const VilleEdit = () => {
    const { t } = useTranslation(); 
    const { ville } = usePage().props;
    const [data, setData] = useState({
        nom_ville: ville.nom_ville || '',
        province_id: ville.province_id || '',
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
        router.put(`/villes/${ville.id_ville}`, data, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                console.log("Ville mise à jour avec succès");
            },
            onError: (errors) => {
                console.error("Erreur lors de la mise à jour de la ville", errors);
            },
        });
    };

    return (
        <>
            <Header />
            <div className="ville-edit-container">
                <h1>{t('ville.edit_title')}</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>{t('ville.name')}</label>
                        <input
                            type="text"
                            name="nom_ville"
                            value={data.nom_ville}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>{t('ville.province')}</label>
                        <select
                            name="province_id"
                            value={data.province_id}
                            onChange={handleChange}
                        >
                            {/* Renderizar as opções da province_id aqui */}
                        </select>
                    </div>
                    <button type="submit">{t('ville.update_button')}</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default VilleEdit;

import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { useTranslation } from 'react-i18next';
import InputField from '../../InputField/InputField'; 

import './VilleEdit.css';

const VilleEdit = () => {
    const { t } = useTranslation();
    const { ville, provinces } = usePage().props; 
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
            <div className="form-container">
                <h1>{t('ville.edit_title')}</h1>
                <form onSubmit={handleSubmit}>
                        <InputField
                            label={t('ville.name')}
                            name="nom_ville"
                            value={data.nom_ville}
                            onChange={handleChange}
                        />
                        <InputField
                            label={t('ville.province')}
                            name="province_id"
                            value={data.province_id}
                            onChange={handleChange}
                            type="select"
                            options={provinces.map(province => ({
                                value: province.id_province,
                                label: province.nom_province
                            }))}
                        />
                    <button className="edit-button" type="submit">{t('ville.update_button')}</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default VilleEdit;

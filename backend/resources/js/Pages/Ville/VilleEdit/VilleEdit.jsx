import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import InputField from '../../InputField/InputField'; 
import './VilleEdit.css';

const VilleEdit = ({ provinces, ville }) => {
    console.log(ville);
    
    const { t } = useTranslation();
    const [data, setData] = useState({
        nom_ville: ville ? ville.nom_ville : '',
        province_id: ville ? ville.province_id : '',
        
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
        console.log(data);
        
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
        </>
    );
};

export default VilleEdit;

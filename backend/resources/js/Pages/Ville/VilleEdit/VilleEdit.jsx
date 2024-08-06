import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import InputField from '../../InputField/InputField'; 
import './VilleEdit.css';

const VilleEdit = ({ id, provinces }) => {
    
    const { t } = useTranslation();
    const [data, setData] = useState({
        nom_ville: '',
        province_id: '',
        
    });

    useEffect(() => {
        const fetchVille = async () => {
            try {
                const response = await axios.get(`/villes/${id}/edit`);
                const villeData = response.data;
                
                setData({
                    nom_ville: villeData.nom_ville,
                    province_id: villeData.province_id,
                });
            } catch (error) {
                console.error("Erreur lors du chargement de la ville", error);
            }
        };

        fetchVille();
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
        router.put(`/villes/${id}`, data, {
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

import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './ProvinceEdit.css';

const ProvinceEdit = ({ id, pays }) => {
    const { t, i18n } = useTranslation();
    const [data, setData] = useState({
        nom_province: '',
        id_pays: '',
    });

    useEffect(() => {
        const fetchProvince = async () => {
            try {
                const response = await axios.get(`/provinces/${id}/edit`);
                const fetchedData = response.data;

                setData({
                    nom_province: fetchedData.nom_province,
                    id_pays: fetchedData.id_pays,
                });
            } catch (error) {
                console.error("Erreur lors du chargement de la province", error);
            }
        };

        fetchProvince();
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
        console.log(data);
        router.put(`/provinces/${id}`, data, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                console.log("Province mise à jour avec succès");
            },
            onError: (errors) => {
                console.error("Erreur lors de la mise à jour de la province", errors);
            },
        });
    };

    const getPaysOptions = () => {
        return pays.map((paysItem) => {
            let nomPays = { en: 'Invalid JSON', fr: 'JSON invalide' };
            try {
                nomPays = JSON.parse(paysItem.nom_pays);
            } catch (error) {
                console.error("Erreur lors de l'analyse du nom du pays:", error);
            }

            return (
                <option key={paysItem.id_pays} value={paysItem.id_pays}>
                    {i18n.language === 'en' ? nomPays.en : nomPays.fr}
                </option>
            );
        });
    };

    return (
        <div className="form-container">
            <h1>{t('province.edit_title')}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>{t('province.nom_province')}</label>
                    <input
                        type="text"
                        name="nom_province"
                        value={data.nom_province}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>{t('province.pays')}</label>
                    <select
                        name="pays_id"
                        value={data.pays_id}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="">{t('province.select_pays')}</option>
                        {getPaysOptions()}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    {t('province.update_button')}
                </button>
            </form>
        </div>
    );
};

export default ProvinceEdit;

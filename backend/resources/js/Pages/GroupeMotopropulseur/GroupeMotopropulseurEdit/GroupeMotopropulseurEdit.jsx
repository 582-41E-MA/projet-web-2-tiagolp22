import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './GroupeMotopropulseurEdit.css';

const GroupeMotopropulseurEdit = ({ id }) => {
    const { t } = useTranslation();
    const [data, setData] = useState({
        type_groupe_motopropulseur_en: '',
        type_groupe_motopropulseur_fr: '',
        description_en: '',
        description_fr: '',
    });

    useEffect(() => {
        const fetchGroupeMotopropulseur = async () => {
            try {
                const response = await axios.get(`/api/groupe-motopropulseurs/${id}`);
                const groupe = response.data;
                setData({
                    type_groupe_motopropulseur_en: JSON.parse(groupe.type_groupe_motopropulseur).en,
                    type_groupe_motopropulseur_fr: JSON.parse(groupe.type_groupe_motopropulseur).fr,
                    description_en: JSON.parse(groupe.description).en,
                    description_fr: JSON.parse(groupe.description).fr,
                });
            } catch (error) {
                console.error('Error fetching groupe motopropulseur:', error);
            }
        };

        if (id) {
            fetchGroupeMotopropulseur();
        }
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
        const jsonData = {
            type_groupe_motopropulseur: JSON.stringify({ en: data.type_groupe_motopropulseur_en, fr: data.type_groupe_motopropulseur_fr }),
            description: JSON.stringify({ en: data.description_en, fr: data.description_fr }),
        };

        router.put(`/groupe-motopropulseurs/${id}`, jsonData);
    };

    return (
        <div className="groupe-motopropulseur-edit-container">
            <h1>{t('groupeMotopropulseur.edit')}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>{t('groupeMotopropulseur.name')} (EN)</label>
                    <input
                        type="text"
                        name="type_groupe_motopropulseur_en"
                        value={data.type_groupe_motopropulseur_en}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div>
                    <label>{t('groupeMotopropulseur.name')} (FR)</label>
                    <input
                        type="text"
                        name="type_groupe_motopropulseur_fr"
                        value={data.type_groupe_motopropulseur_fr}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div>
                    <label>{t('groupeMotopropulseur.description')} (EN)</label>
                    <input
                        type="text"
                        name="description_en"
                        value={data.description_en}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div>
                    <label>{t('groupeMotopropulseur.description')} (FR)</label>
                    <input
                        type="text"
                        name="description_fr"
                        value={data.description_fr}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn">{t('groupeMotopropulseur.update_button')}</button>
            </form>
        </div>
    );
};

export default GroupeMotopropulseurEdit;

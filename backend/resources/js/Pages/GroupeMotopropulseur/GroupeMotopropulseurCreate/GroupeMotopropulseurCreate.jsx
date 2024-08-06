import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import './GroupeMotopropulseurCreate.css';

const GroupeMotopropulseurCreate = () => {
    const { t } = useTranslation();
    const [data, setData] = useState({
        type_groupe_motopropulseur_en: '',
        type_groupe_motopropulseur_fr: '',
        description_en: '',
        description_fr: '',
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
        const jsonData = {
            type_groupe_motopropulseur: JSON.stringify({ en: data.type_groupe_motopropulseur_en, fr: data.type_groupe_motopropulseur_fr }),
            description: JSON.stringify({ en: data.description_en, fr: data.description_fr }),
        };
    
        router.post('/groupe-motopropulseurs', jsonData);
    };

    return (
        <div className="groupe-motopropulseur-create-container">
            <h1>{t('groupeMotopropulseur.create')}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>{t('groupeMotopropulseur.name')} (EN)</label>
                    <input
                        type="text"
                        name="type_groupe_motopropulseur_en"
                        value={data.type_groupe_motopropulseur_en}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>{t('groupeMotopropulseur.name')} (FR)</label>
                    <input
                        type="text"
                        name="type_groupe_motopropulseur_fr"
                        value={data.type_groupe_motopropulseur_fr}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>{t('groupeMotopropulseur.description')} (EN)</label>
                    <input
                        type="text"
                        name="description_en"
                        value={data.description_en}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>{t('groupeMotopropulseur.description')} (FR)</label>
                    <input
                        type="text"
                        name="description_fr"
                        value={data.description_fr}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">{t('groupeMotopropulseur.create_button')}</button>
            </form>
        </div>
    );
};

export default GroupeMotopropulseurCreate;
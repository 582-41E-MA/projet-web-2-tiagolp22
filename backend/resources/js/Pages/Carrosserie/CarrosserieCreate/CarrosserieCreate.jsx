import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import './CarrosserieCreate.css';

const CarrosserieCreate = () => {
    const { t } = useTranslation();
    const [data, setData] = useState({
        type_carrosserie_en: '',
        type_carrosserie_fr: '',
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
            type_carrosserie: JSON.stringify({ en: data.type_carrosserie_en, fr: data.type_carrosserie_fr }),
            description: JSON.stringify({ en: data.description_en, fr: data.description_fr }),
        };
    
        router.post('/carrosseries', jsonData);
    };

    return (
        <div className="carrosserie-create-container">
            <h1>{t('carrosserie.create')}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>{t('carrosserie.name')} (EN)</label>
                    <input
                        type="text"
                        name="type_carrosserie_en"
                        value={data.type_carrosserie_en}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>{t('carrosserie.name')} (FR)</label>
                    <input
                        type="text"
                        name="type_carrosserie_fr"
                        value={data.type_carrosserie_fr}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>{t('carrosserie.description')} (EN)</label>
                    <input
                        type="text"
                        name="description_en"
                        value={data.description_en}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>{t('carrosserie.description')} (FR)</label>
                    <input
                        type="text"
                        name="description_fr"
                        value={data.description_fr}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">{t('carrosserie.create_button')}</button>
            </form>
        </div>
    );
};

export default CarrosserieCreate;
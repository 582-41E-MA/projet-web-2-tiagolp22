import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import './TypeCarburantCreate.css';

const TypeCarburantCreate = () => {
    const { t } = useTranslation();
    const [data, setData] = useState({
        type_carburant_en: '',
        type_carburant_fr: '',
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
            type_carburant: JSON.stringify({ en: data.type_carburant_en, fr: data.type_carburant_fr }),
            description: JSON.stringify({ en: data.description_en, fr: data.description_fr }),
        };
    
        router.post('/type-carburants', jsonData, {
            onSuccess: () => {
                console.log("Type de carburant créé avec succès");
                router.get('/type-carburants');
            },
            onError: (errors) => {
                console.error("Erreur lors de la création du type de carburant", errors);
            },
        });
    };
    

    return (
        <div className="type-carburant-create-container">
            <h1>{t('typeCarburant.create')}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>{t('typeCarburant.name')} (EN)</label>
                    <input
                        type="text"
                        name="type_carburant_en"
                        value={data.type_carburant_en}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>{t('typeCarburant.name')} (FR)</label>
                    <input
                        type="text"
                        name="type_carburant_fr"
                        value={data.type_carburant_fr}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>{t('typeCarburant.description')} (EN)</label>
                    <input
                        type="text"
                        name="description_en"
                        value={data.description_en}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>{t('typeCarburant.description')} (FR)</label>
                    <input
                        type="text"
                        name="description_fr"
                        value={data.description_fr}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">{t('typeCarburant.create_button')}</button>
            </form>
        </div>
    );
};

export default TypeCarburantCreate;

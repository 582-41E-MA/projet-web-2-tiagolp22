import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './CarrosserieEdit.css';

const CarrosserieEdit = ({ id }) => {
    const { t } = useTranslation();
    const [data, setData] = useState({
        type_carrosserie_en: '',
        type_carrosserie_fr: '',
        description_en: '',
        description_fr: '',
    });

    useEffect(() => {
        const fetchCarrosserie = async () => {
            try {
                const response = await axios.get(`/api/carrosseries/${id}`);
                const carrosserie = response.data;
                setData({
                    type_carrosserie_en: JSON.parse(carrosserie.type_carrosserie).en,
                    type_carrosserie_fr: JSON.parse(carrosserie.type_carrosserie).fr,
                    description_en: JSON.parse(carrosserie.description).en,
                    description_fr: JSON.parse(carrosserie.description).fr,
                });
            } catch (error) {
                console.error('Error fetching carrosserie:', error);
            }
        };

        if (id) {
            fetchCarrosserie();
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
            type_carrosserie: JSON.stringify({ en: data.type_carrosserie_en, fr: data.type_carrosserie_fr }),
            description: JSON.stringify({ en: data.description_en, fr: data.description_fr }),
        };

        router.put(`/carrosseries/${id}`, jsonData);
    };

    return (
        <div className="carrosserie-edit-container">
            <h1>{t('carrosserie.edit')}</h1>
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
                <button type="submit">{t('carrosserie.update_button')}</button>
            </form>
        </div>
    );
};

export default CarrosserieEdit;
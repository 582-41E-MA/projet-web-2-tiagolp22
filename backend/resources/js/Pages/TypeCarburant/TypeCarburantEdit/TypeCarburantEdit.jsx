import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './TypeCarburantEdit.css';

const TypeCarburantEdit = ({ id }) => {
    const { t } = useTranslation();
    const [data, setData] = useState({
        type_carburant_en: '',
        type_carburant_fr: '',
        description_en: '',
        description_fr: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTypeCarburant = async () => {
            try {
                const response = await axios.get(`/api/type-carburants/${id}`);
                setData({
                    type_carburant_en: response.data.type_carburant.en,
                    type_carburant_fr: response.data.type_carburant.fr,
                    description_en: response.data.description.en,
                    description_fr: response.data.description.fr,
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching type carburant:', error);
                setLoading(false);
            }
        };

        if (id) {
            fetchTypeCarburant();
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
        const formData = {
            type_carburant: {
                en: data.type_carburant_en,
                fr: data.type_carburant_fr
            },
            description: {
                en: data.description_en,
                fr: data.description_fr
            },
        };

        router.put(`/type-carburants/${id}`, formData, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                console.log("Type de carburant mis à jour avec succès");
            },
            onError: (errors) => {
                setErrors(errors);
                console.error("Erreur lors de la mise à jour du type de carburant", errors);
            },
        });
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="type-carburant-edit-container">
            <h1>{t('typeCarburant.edit_title')}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="type_carburant_en">{t('typeCarburant.name')} (EN)</label>
                    <input
                        type="text"
                        id="type_carburant_en"
                        name="type_carburant_en"
                        value={data.type_carburant_en}
                        onChange={handleChange}
                        className="form-control"
                    />
                    {errors.type_carburant_en && <span className="text-danger">{errors.type_carburant_en}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="type_carburant_fr">{t('typeCarburant.name')} (FR)</label>
                    <input
                        type="text"
                        id="type_carburant_fr"
                        name="type_carburant_fr"
                        value={data.type_carburant_fr}
                        onChange={handleChange}
                        className="form-control"
                    />
                    {errors.type_carburant_fr && <span className="text-danger">{errors.type_carburant_fr}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="description_en">{t('typeCarburant.description')} (EN)</label>
                    <input
                        type="text"
                        id="description_en"
                        name="description_en"
                        value={data.description_en}
                        onChange={handleChange}
                        className="form-control"
                    />
                    {errors.description_en && <span className="text-danger">{errors.description_en}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="description_fr">{t('typeCarburant.description')} (FR)</label>
                    <input
                        type="text"
                        id="description_fr"
                        name="description_fr"
                        value={data.description_fr}
                        onChange={handleChange}
                        className="form-control"
                    />
                    {errors.description_fr && <span className="text-danger">{errors.description_fr}</span>}
                </div>

                <button type="submit" className="btn btn-primary">
                    {t('typeCarburant.update_button')}
                </button>
            </form>
        </div>
    );
};

export default TypeCarburantEdit;
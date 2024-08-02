import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import InputField from '../../InputField/InputField';
import './PaysEdit.css';

const PaysEdit = ({ pays }) => {
    const { t } = useTranslation();
    const { errors } = usePage().props;
    const [data, setData] = useState({
        nom_pays: {
            en: '',
            fr: ''
        }
    });

    useEffect(() => {
        if (pays) {
            const { id_pays, nom_pays } = pays;
            setData({ nom_pays: JSON.parse(nom_pays) });
            setId(id_pays);  
        }
    }, [pays]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            nom_pays: {
                ...data.nom_pays,
                [name]: value
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        router.put(`/pays/${id}`, {
            nom_pays: JSON.stringify(data.nom_pays),
        }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                console.log("Pays mis à jour avec succès");
            },
            onError: (errors) => {
                console.error("Erreur lors de la mise à jour du pays", errors);
            },
        });
    };

    return (
        <div className="form-container">
            <h1>{t('pays.edit_title')}</h1>
            <form onSubmit={handleSubmit}>
                <InputField
                    label={t('pays.name_en')}
                    name="en"
                    value={data.nom_pays.en}
                    onChange={handleChange}
                    error={errors.nom_pays}
                />
                <InputField
                    label={t('pays.name_fr')}
                    name="fr"
                    value={data.nom_pays.fr}
                    onChange={handleChange}
                    error={errors.nom_pays}
                />
                <button type="submit" className="edit-button">
                    {t('pays.update_button')}
                </button>
            </form>
        </div>
    );
};

export default PaysEdit;

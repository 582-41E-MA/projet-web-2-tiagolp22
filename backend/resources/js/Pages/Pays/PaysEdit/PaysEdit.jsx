import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
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
            setData({
                nom_pays: {
                    en: pays.nom_pays.en || '',
                    fr: pays.nom_pays.fr || ''
                }
            });
        }
    }, [pays]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            nom_pays: {
                ...prevData.nom_pays,
                [name]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);

        router.put(`/pays/${pays.id_pays}`, {
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
                <div className="form-group">
                    <label htmlFor="en">{t('pays.name_en')}</label>
                    <input
                        id="en"
                        type="text"
                        name="en"
                        value={data.nom_pays.en}
                        onChange={handleChange}
                        className="form-control"
                    />
                    {errors.nom_pays?.en && <span className="error-text">{errors.nom_pays.en}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="fr">{t('pays.name_fr')}</label>
                    <input
                        id="fr"
                        type="text"
                        name="fr"
                        value={data.nom_pays.fr}
                        onChange={handleChange}
                        className="form-control"
                    />
                    {errors.nom_pays?.fr && <span className="error-text">{errors.nom_pays.fr}</span>}
                </div>
                <button type="submit" className="edit-button">
                    {t('pays.update_button')}
                </button>
            </form>
        </div>
    );
};

export default PaysEdit;

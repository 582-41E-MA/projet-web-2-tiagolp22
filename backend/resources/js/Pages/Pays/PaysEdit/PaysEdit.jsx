import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { useTranslation } from 'react-i18next';
import InputField from '../../InputField/InputField';
import './PaysEdit.css';

const PaysEdit = ({ pays }) => {
    const { t, i18n } = useTranslation();
    const { errors } = usePage().props;

    const [data, setData] = useState({
        nom_pays: pays.nom_pays,
    });

    useEffect(() => {
        setData({ nom_pays: pays.nom_pays });
    }, [pays]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedNomPays;
        try {
            updatedNomPays = JSON.parse(data.nom_pays);
            updatedNomPays[name] = value;
        } catch (error) {
            updatedNomPays = { en: '', fr: '' };
            updatedNomPays[name] = value;
        }

        setData({
            ...data,
            nom_pays: JSON.stringify(updatedNomPays),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(`/pays/${pays.id_pays}`, {
            nom_pays: data.nom_pays,
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

    let parsedNomPays;
    try {
        parsedNomPays = JSON.parse(data.nom_pays);
    } catch (error) {
        parsedNomPays = { en: '', fr: '' };
    }

    return (
        <>
            <Header />
            <div className="pays-edit-container">
                <h1>{t('pays.edit_title')}</h1>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label={t('pays.name_en')}
                        name="en"
                        value={parsedNomPays.en || ''}
                        onChange={handleChange}
                        error={errors.nom_pays}
                    />
                    <InputField
                        label={t('pays.name_fr')}
                        name="fr"
                        value={parsedNomPays.fr || ''}
                        onChange={handleChange}
                        error={errors.nom_pays}
                    />
                    <button type="submit" className="btn btn-primary">
                        {t('pays.update_button')}
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default PaysEdit;
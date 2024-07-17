import React, { useState } from 'react';
import { usePage, useForm, router } from '@inertiajs/react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { useTranslation } from 'react-i18next';
import './ProvinceEdit.css';
import InputField from '../../InputField/InputField';

const ProvinceEdit = () => {
    const { t, i18n } = useTranslation(); // Utilisation du hook useTranslation
    const { province, pays } = usePage().props;

    const { data, setData } = useForm({
        nom_province: province.nom_province || '',
        pays_id: province.pays_id || '',
    });

    const handleSelectChange = (e) => {
        setData('pays_id', e.target.value);
    };

    const parseNomPays = (nomPays) => {
        try {
            const parsedPays = JSON.parse(nomPays);
            return parsedPays[i18n.language]; // Utilisation de i18n.language pour récupérer la langue sélectionnée
        } catch (error) {
            console.error("Erreur lors de l'analyse du nom du pays:", error);
            return nomPays;
        }
    };

    const getNomPays = (p) => {
        return typeof p.nom_pays === 'string' ? parseNomPays(p.nom_pays) : p.nom_pays[i18n.language];
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(`/provinces/${province.id_province}`, data, {
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

    return (
        <>
            <Header />
            <div className="form-container">
                <h1>{t('province.edit_title')}</h1>
                <form onSubmit={handleSubmit}>
                        <InputField
                            label={t('province.name')}
                            name="nom_province"
                            value={data.nom_province}
                            onChange={(e) => setData('nom_province', e.target.value)}
                        />
                        <label htmlFor="pays_id">{t('province.country')}</label>
                        <select
                            id="pays_id"
                            name="pays_id"
                            value={data.pays_id}
                            onChange={handleSelectChange}
                        >
                            <option value="">{t('select.country')}</option>
                            {pays.map((p) => (
                                <option key={p.id_pays} value={p.id_pays}>
                                    {getNomPays(p)}
                                </option>
                            ))}
                        </select>
                    <button className="edit-button" type="submit">{t('province.update_button')}</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default ProvinceEdit;

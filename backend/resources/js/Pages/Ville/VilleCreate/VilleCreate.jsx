import React from 'react';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import InputField from '../../InputField/InputField'; 
import './VilleCreate.css';

const VilleCreate = ({ provinces }) => {
    const { t } = useTranslation();
    const { data, setData, post, errors } = useForm({
        nom_ville: '',
        province_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/villes", {
            data: {
                nom_ville: data.nom_ville,
                province_id: data.province_id,
            },
            onSuccess: () => {
                console.log("Ville créée avec succès");
                // Redireciona ou atualiza a lista de villes
            },
            onError: (errors) => {
                console.error("Erreur lors de la création de la ville", errors);
            },
        });
    };

    return (
        <>
            <div className="form-container">
                <h1>{t('ville.create')}</h1>
                <form onSubmit={handleSubmit}>
                        <InputField
                            label={t('ville.name')}
                            name="nom_ville"
                            value={data.nom_ville}
                            onChange={(e) => setData('nom_ville', e.target.value)}
                            error={errors.nom_ville}
                        />
                        <InputField
                            label={t('ville.province')}
                            name="province_id"
                            value={data.province_id}
                            onChange={(e) => setData('province_id', e.target.value)}
                            type="select"
                            options={[
                                { value: '', label: t('ville.select_province') },
                                ...provinces.map((province) => ({
                                    value: province.id_province,
                                    label: province.nom_province
                                }))
                            ]}
                            error={errors.province_id}
                        />
                    <button className="create-button" type="submit">{t('ville.create_button')}</button>
                </form>
            </div>
        </>
    );
};

export default VilleCreate;

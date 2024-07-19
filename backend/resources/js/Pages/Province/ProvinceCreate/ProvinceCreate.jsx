import React from 'react';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import InputField from '../../InputField/InputField'; // Verifique o caminho correto do seu InputField
import './ProvinceCreate.css';

const ProvinceCreate = ({ pays }) => {
    const { t, i18n } = useTranslation();
    const { data, setData, post, errors } = useForm({
        nom_province: '',
        pays_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/provinces", {
            data,
            onSuccess: () => {
                console.log("Province créée avec succès");
            },
            onError: (errors) => {
                console.error("Erreur lors de la création de la province", errors);
            },
        });
    };

    return (
        <>
            <div className="form-container">
                <h1>{t('province.create')}</h1>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label={t('province.name')}
                        name="nom_province"
                        value={data.nom_province}
                        onChange={(e) => setData('nom_province', e.target.value)}
                        error={errors.nom_province}
                    />
                    <InputField
                        label={t('province.country')}
                        name="pays_id"
                        value={data.pays_id}
                        onChange={(e) => setData('pays_id', e.target.value)}
                        type="select"
                        options={pays.map(pays => ({
                            value: pays.id_pays,
                            label: pays.nom_pays ? pays.nom_pays[i18n.language] : pays.nom_pays, 
                        }))}
                        error={errors.pays_id}
                    />
                    <button className="create-button" type="submit">{t('province.create_button')}</button>
                </form>
            </div>
        </>
    );
};

export default ProvinceCreate;

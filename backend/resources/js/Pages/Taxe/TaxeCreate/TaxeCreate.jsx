import React from 'react';
import axios from 'axios';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

import InputField from '../../InputField/InputField';


const TaxeCreate = ({ provinces }) => {
    const { t } = useTranslation();
    const { data, setData, post, errors } = useForm({
        GST_HST: '',
        PST: '',
        provinces_id_province: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/taxes", {
            data,
            onSuccess: () => {
                console.log("Taxe créée avec succès");
            },
            onError: (errors) => {
                console.error("Erreur lors de la création de la taxe", errors);
            },
        });
    };

    return (
        <>

            <div className="form-container">
                <h1>{t('tax.create')}</h1>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label={t('tax.gst_hst')}
                        name="GST_HST"
                        value={data.GST_HST}
                        onChange={(e) => setData('GST_HST', e.target.value)}
                        error={errors.GST_HST}
                    />
                    <InputField
                        label={t('tax.pst')}
                        name="PST"
                        value={data.PST}
                        onChange={(e) => setData('PST', e.target.value)}
                        error={errors.PST}
                    />
                    <InputField
                        label={t('tax.province')}
                        name="provinces_id_province"
                        value={data.provinces_id_province}
                        onChange={(e) => setData('provinces_id_province', e.target.value)}
                        type="select"
                        options={provinces.map(province => ({
                            value: province.id_province,
                            label: province.nom_province,
                        }))}
                        error={errors.provinces_id_province}
                    />
                    <button className="create-button" type="submit">{t('tax.create_button')}</button>
                </form>
            </div>

        </>
    );
};

export default TaxeCreate;

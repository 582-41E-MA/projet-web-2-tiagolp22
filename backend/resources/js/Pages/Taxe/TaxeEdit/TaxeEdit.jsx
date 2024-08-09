import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from '@inertiajs/react';

const TaxeEdit = ({ taxe, provinces }) => {
    console.log(taxe);

    const { t } = useTranslation();
    const { data, setData, put, errors } = useForm({
        GST_HST: taxe.GST_HST || '',
        PST: taxe.PST || '',
        provinces_id_province: taxe.provinces_id_province || '',
    });

    useEffect(() => {
        setData({
            GST_HST: taxe.GST_HST || '',
            PST: taxe.PST || '',
            provinces_id_province: taxe.provinces_id_province || '',
        });
    }, [taxe]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data)
        put(`/taxes/${taxe.id}`, {
            
            onSuccess: () => {
                console.log('Taxe mise à jour avec succès');
            },
            onError: (errors) => {
                console.error('Erreur lors de la mise à jour de la taxe', errors);
            },
        });
    };

    return (
        <div className="form-container">
            <h1>{t('tax.edit_title')}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="GST_HST">{t('tax.gst_hst')}</label>
                    <input
                        id="GST_HST"
                        type="text"
                        name="GST_HST"
                        value={data.GST_HST}
                        onChange={(e) => setData('GST_HST', e.target.value)}
                        className="form-control"
                    />
                    {errors.GST_HST && <span className="error-text">{errors.GST_HST}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="PST">{t('tax.pst')}</label>
                    <input
                        id="PST"
                        type="text"
                        name="PST"
                        value={data.PST}
                        onChange={(e) => setData('PST', e.target.value)}
                        className="form-control"
                    />
                    {errors.PST && <span className="error-text">{errors.PST}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="provinces_id_province">{t('tax.province')}</label>
                    <select
                        id="provinces_id_province"
                        name="provinces_id_province"
                        value={data.provinces_id_province}
                        onChange={(e) => setData('provinces_id_province', e.target.value)}
                        className="form-control"
                    >
                        <option value="">{t('tax.select_province')}</option>
                        {provinces.map(province => (
                            <option key={province.id_province} value={province.id_province}>
                                {province.nom_province}
                            </option>
                        ))}
                    </select>
                    {errors.provinces_id_province && <span className="error-text">{errors.provinces_id_province}</span>}
                </div>

                <button className="edit-button" type="submit">{t('tax.update_button')}</button>
            </form>
        </div>
    );
};

export default TaxeEdit;

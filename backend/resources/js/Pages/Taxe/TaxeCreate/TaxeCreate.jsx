import React from 'react';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

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
                // Optionally display errors to the user
            },
        });
    };

    return (
        <div className="form-container">
            <h1>{t('tax.create')}</h1>
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

                <button className="create-button" type="submit">{t('tax.create_button')}</button>
            </form>
        </div>
    );
};

export default TaxeCreate;

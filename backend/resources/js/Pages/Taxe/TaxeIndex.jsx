import React from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { usePage, Link } from '@inertiajs/react';

const TaxeIndex = ({ taxes }) => {
    const { t } = useTranslation();
    const { reload } = usePage();

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/taxes/${id}`);
            reload();
        } catch (error) {
            console.error('Erro ao deletar a taxa:', error);
        }
    };

    return (
        <div className="taxe-index-container">
            <h1>{t('tax.index_title')}</h1>
            <div className="taxe-list">
                {taxes.map((taxe) => (
                    <div key={taxe.id} className="taxe-item">
                        <div>
                            <strong>{t('tax.gst_hst')}: {taxe.GST_HST}</strong>
                        </div>
                        <div>
                            <strong>{t('tax.pst')}: {taxe.PST}</strong>
                        </div>
                        <div>
                            <strong>{t('tax.province')}: {taxe.province ? taxe.province.nom_province : '-'}</strong>
                        </div>
                        <div className="taxe-actions">
                            <Link href={`/taxes/${taxe.id}/edit`} className="edit-button">
                                {t('tax.edit_button')}
                            </Link>
                            <button
                                onClick={() => handleDelete(taxe.id)}
                                className="delete-button"
                            >
                                {t('tax.delete_button')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaxeIndex;

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePage, router } from '@inertiajs/react';
import Pagination from '../Pagination/Pagination'; // Ensure this component exists and is correctly implemented

const TaxeIndex = ({ taxes, onEdit }) => {
    const { t, i18n } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 

    const handleDelete = async (id) => {
        try {
            await router.delete(`/taxes/${id}`, {
                preserveState: true,
                preserveScroll: true,
            });
        } catch (error) {
            console.error('Erreur lors de la suppression de la taxe:', error);
        }
    };

    const handleEdit = (id) => {
        onEdit(id);
    };

    const paginatedTaxes = taxes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(taxes.length / itemsPerPage);

    return (
        <>
            <div className="dashboard-index-container">
                <h1>{t('tax.index_title')}</h1>
                <div className="dashboard-list">
                    {paginatedTaxes.map((tax) => (
                        <div key={tax.id} className="dashboard-item">
                            <div>
                                <strong>{tax.GST_HST}% GST/HST</strong> - 
                                {tax.PST}% PST - 
                                {tax.province ? tax.province.nom_province : t('tax.no_province')}
                            </div>
                            <div className="dashboard-actions">
                                <button 
                                    onClick={() => handleEdit(tax.id)}
                                    className="edit-button"
                                >
                                    {t('buttons.edit')}
                                </button>
                                <button 
                                    onClick={() => handleDelete(tax.id)}
                                    className="delete-button"
                                >
                                    {t('buttons.delete')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </>
    );
};

export default TaxeIndex;

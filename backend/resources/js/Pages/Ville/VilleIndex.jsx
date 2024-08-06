import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/react';
import Pagination from '../Pagination/Pagination';
import './VilleIndex.css';

const VilleIndex = ({ villes, onEdit }) => {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleDelete = async (id) => {
        if (window.confirm(t('ville.confirm_delete'))) {
            try {
                await router.delete(`/villes/${id}`);
            } catch (error) {
                console.error('Error deleting ville:', error);
                alert(t('ville.delete_error'));
            }
        }
    };

    const paginatedVilles = villes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(villes.length / itemsPerPage);

    return (
        <div className="dashboard-index-container">
            <h1>{t('ville.index_title')}</h1>
            <div className="dashboard-list">
                {paginatedVilles.length > 0 ? (
                    paginatedVilles.map((ville) => (
                        <div key={ville.id_ville} className="dashboard-item">
                            <div>
                                <strong>{ville.nom_ville}</strong> - {ville.province.nom_province}
                            </div>
                            <div className="dashboard-actions">
                                <button 
                                    onClick={() => onEdit(ville.id_ville)}
                                    className="edit-button"
                                >
                                    {t('ville.edit_button')}
                                </button>
                                <button 
                                    onClick={() => handleDelete(ville.id_ville)}
                                    className="delete-button"
                                >
                                    {t('ville.delete_button')}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>{t('ville.no_data')}</p>
                )}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default VilleIndex;

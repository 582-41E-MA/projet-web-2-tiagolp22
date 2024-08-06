import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { router } from '@inertiajs/react';
import Pagination from '../Pagination/Pagination';
import './ModeleIndex.css';

const ModeleIndex = ({ modeles, onEdit }) => {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage =5;

    const handleDelete = async (id) => {
        if (window.confirm(t('model.confirm_delete'))) {
            try {
                await axios.delete(`/modeles/${id}`);
                router.reload({ only: ['modeles'] });
            } catch (error) {
                console.error('Error deleting modele:', error);
                alert(t('model.delete_error'));
            }
        }
    };

    const paginatedModeles = modeles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(modeles.length / itemsPerPage);

    return (
        <div className="dashboard-index-container">
            <h1>{t('model.index_title')}</h1>
            <div className="dashboard-list">
                {paginatedModeles.length > 0 ? (
                    paginatedModeles.map((modele) => (
                        <div key={modele.id_modele} className="dashboard-item">
                            <div>
                                <strong>{modele.nom_modele}</strong> - {modele.constructeur.nom_constructeur}
                            </div>
                            <div className="dashboard-actions">
                                <button
                                    onClick={() => onEdit(modele.id_modele)}
                                    className="edit-button"
                                >
                                    {t('buttons.edit')}
                                </button>
                                <button
                                    onClick={() => handleDelete(modele.id_modele)}
                                    className="delete-button"
                                >
                                    {t('buttons.delete')}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>{t('model.no_data')}</p>
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

export default ModeleIndex;

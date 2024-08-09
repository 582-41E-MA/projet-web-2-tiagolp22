import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { usePage, router } from '@inertiajs/react';
import Pagination from '../Pagination/Pagination';
import './ProvinceIndex.css';

const ProvinceIndex = ({ provinces, onEdit }) => {
    const { t, i18n } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 

    const handleDelete = async (id) => {
        try {
            await router.delete(`/provinces/${id}`, {
                preserveState: true,
                preserveScroll: true,
            });
        } catch (error) {
            console.error('Erro ao excluir province:', error);
        }
    };

    const handleEdit = (id) => {
        onEdit(id);
    };

    const paginatedProvinces = provinces.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(provinces.length / itemsPerPage);

    return (
        <>
            <div className="dashboard-index-container">
                <h1>{t('province.index_title')}</h1>
                <div className="dashboard-list">
                    {paginatedProvinces.map((province) => (
                        <div key={province.id_province} className="dashboard-item">
                            <div>
                                <strong>{province.nom_province}</strong> - 
                                {province.pays.nom_pays[i18n.language] || ''}
                            </div>
                            <div className="dashboard-actions">
                                <button 
                                    onClick={() => handleEdit(province.id_province)}
                                    className="edit-button"
                                >
                                    {t('buttons.edit')}
                                </button>
                                <button 
                                    onClick={() => handleDelete(province.id_province)}
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

export default ProvinceIndex;

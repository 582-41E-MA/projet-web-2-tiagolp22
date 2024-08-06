import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Pagination from '../Pagination/Pagination'; 
import './TypeCarburantIndex.css';

const TypeCarburantIndex = ({ onEdit }) => {
    const { props } = usePage();
    const { typesCarburant } = props;
    const { t, i18n } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; 

    const handleDelete = async (id) => {
        if (window.confirm(t('typeCarburant.confirm_delete'))) {
            try {
                await router.delete(`/type-carburants/${id}`, {
                    preserveState: true,
                    preserveScroll: true,
                });
            } catch (error) {
                console.error('Error deleting typeCarburant:', error);
                alert(t('typeCarburant.delete_error'));
            }
        }
    };

    const handleEdit = (id) => {
        console.log('Edit ID:', id);
        onEdit(id);
    };

    const paginatedTypesCarburant = typesCarburant.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(typesCarburant.length / itemsPerPage);

    return (
        <div className="type-carburant-index-container">
            <h1>{t('typeCarburant.index_title')}</h1>
            <div className="type-carburant-list">
                {paginatedTypesCarburant.length > 0 ? (
                    paginatedTypesCarburant.map((typeCarburant) => (
                        <div key={typeCarburant.id_type_carburant} className="type-carburant-item">
                            <div>
                                <strong>{typeCarburant.type_carburant[i18n.language]}</strong>
                            </div>
                            <div className="type-carburant-actions">
                                <button
                                    onClick={() => handleEdit(typeCarburant.id_type_carburant)}
                                    className="edit-button"
                                >
                                    {t('edit')}
                                </button>
                                <button
                                    onClick={() => handleDelete(typeCarburant.id_type_carburant)}
                                    className="delete-button"
                                >
                                    {t('delete')}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>{t('typeCarburant.no_data')}</p>
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

export default TypeCarburantIndex;

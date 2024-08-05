import React from 'react';
import { usePage, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './GroupeMotopropulseurIndex.css';

const GroupeMotopropulseurIndex = ({ groupeMotopropulseurs, onEdit }) => {
        const { props } = usePage();
    // const { groupeMotopropulseurs } = props;
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;
    

    const handleDelete = async (id) => {
        if (confirm(t('groupeMotopropulseur.confirm_delete'))) {
            try {
                await axios.delete(`/groupe-motopropulseurs/${id}`);
                window.location.reload();
            } catch (error) {
                console.error('Error deleting groupe motopropulseur:', error);
            }
        }
    };

    const handleEdit = (id) => {
        onEdit(id);
    };

    return (
        <div className="groupe-motopropulseur-index-container">
            <h1>{t('groupeMotopropulseur.index_title')}</h1>
            <div className="groupe-motopropulseur-list">
                {groupeMotopropulseurs.map((groupe) => (
                    <div key={groupe.id_groupe_motopropulseur} className="groupe-motopropulseur-item">
                        <div>
                            <strong>{JSON.parse(groupe.type_groupe_motopropulseur)[currentLanguage]}</strong>
                        </div>
                        <div className="groupe-motopropulseur-actions">
                            <button
                                onClick={() => handleEdit(groupe.id_groupe_motopropulseur)}
                                className="edit-button"
                            >
                                {t('edit')}
                            </button>
                            <button
                                onClick={() => handleDelete(groupe.id_groupe_motopropulseur)}
                                className="delete-button"
                            >
                                {t('delete')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GroupeMotopropulseurIndex;
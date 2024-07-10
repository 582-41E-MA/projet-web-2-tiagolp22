// Profile.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { useTranslation } from 'react-i18next';
import './Profile.css';
import EditableProfileItem from './EditableProfileItem/EditableProfileItem'; 

const Profile = ({ utilisateur }) => {
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [editedUtilisateur, setEditedUtilisateur] = useState(utilisateur);

    // URL de la route Laravel pour mettre à jour le profil
    const updateProfileUrl = `/user/profile/${utilisateur.id_utilisateur}`; // Inclua o id do usuário na URL

    // Gestionnaire pour activer le mode édition
    const handleEdit = () => {
        setIsEditing(true);
    };

    // Gestionnaire pour sauvegarder les modifications
    const handleSave = async () => {
        try {
            console.log('URL de atualização:', updateProfileUrl);
            console.log('Dados enviados:', editedUtilisateur);

            // Effectuer une requête PUT pour envoyer les données mises à jour
            await axios.put(updateProfileUrl, editedUtilisateur);

            setIsEditing(false); // Sortir du mode édition après la sauvegarde
            alert('Profil mis à jour avec succès !'); 
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil :', error.response ? error.response.data : error.message);
            alert('Erreur lors de la mise à jour du profil. Veuillez réessayer.'); 
        }
    };

    // Gestionnaire pour annuler les modifications
    const handleCancel = () => {
        setEditedUtilisateur(utilisateur); // Réinitialiser les modifications aux données d'origine
        setIsEditing(false); // Sortir du mode édition sans sauvegarder
    };

    // Gestionnaire pour mettre à jour les champs éditables
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUtilisateur({
            ...editedUtilisateur,
            [name]: value,
        });
    };

    if (!utilisateur) {
        return <div>Chargement...</div>;
    }

    return (
        <>
            <Header />
            <div className="wrapper">
                <h1>{t('user.title_profile', )} { utilisateur.nom }</h1>
                <div className="profile-card">
                    <EditableProfileItem
                        label={t('user.first_name')}
                        name="prenom"
                        value={editedUtilisateur.prenom}
                        isEditing={isEditing}
                        handleChange={handleChange}
                    />
                    <EditableProfileItem
                        label={t('user.last_name')}
                        name="nom"
                        value={editedUtilisateur.nom}
                        isEditing={isEditing}
                        handleChange={handleChange}
                    />
                    <EditableProfileItem
                        label={t('user.email')}
                        name="courriel"
                        value={editedUtilisateur.courriel}
                        isEditing={isEditing}
                        handleChange={handleChange}
                    />
                    <div className="profile-item">
                        <label>{t('user.birthdate')}</label>
                        <p>{new Date(utilisateur.date_naissance).toLocaleDateString()}</p>
                    </div>
                    <EditableProfileItem
                        label={t('user.address')}
                        name="adresse"
                        value={editedUtilisateur.adresse}
                        isEditing={isEditing}
                        handleChange={handleChange}
                    />
                    <EditableProfileItem
                        label={t('user.postal_code')}
                        name="code_postal"
                        value={editedUtilisateur.code_postal}
                        isEditing={isEditing}
                        handleChange={handleChange}
                    />
                    <EditableProfileItem
                        label={t('user.phone')}
                        name="numero_telephone"
                        value={editedUtilisateur.numero_telephone}
                        isEditing={isEditing}
                        handleChange={handleChange}
                    />
                    <EditableProfileItem
                        label={t('user.mobile')}
                        name="numero_portable"
                        value={editedUtilisateur.numero_portable}
                        isEditing={isEditing}
                        handleChange={handleChange}
                    />
                    <EditableProfileItem
                        label={t('user.username')}
                        name="nom_utilisateur"
                        value={editedUtilisateur.nom_utilisateur}
                        isEditing={isEditing}
                        handleChange={handleChange}
                    />
                    <div className="profile-item">
                        <label>{t('user.last_connection')}</label>
                        <p>{new Date(utilisateur.derniere_connexion).toLocaleString()}</p>
                    </div>
                    {/* Boutons d'édition et de sauvegarde */}
                    {isEditing ? (
                        <div className="profile-buttons">
                            <button className="btn-save" onClick={handleSave}>Enregistrer</button>
                            <button className="btn-cancel" onClick={handleCancel}>Annuler</button>
                        </div>
                    ) : (
                        <button className="btn-edit" onClick={handleEdit}>Éditer</button>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;

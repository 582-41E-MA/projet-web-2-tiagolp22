import React, { useState } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { useTranslation } from "react-i18next";
import "./Profile.css";
import EditableProfileItem from "./EditableProfileItem/EditableProfileItem";
import { useForm } from "@inertiajs/inertia-react";
import axios from "axios";
import Modal from "../../Modal/Modal";

const ProfileEdit = ({ utilisateur, villes, privileges }) => {
    const { t, i18n } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const initialDate = utilisateur.date_naissance
        ? utilisateur.date_naissance.split("T")[0]
        : "";
    const { data, setData, put, errors } = useForm({
        prenom: utilisateur.prenom || "",
        nom: utilisateur.nom || "",
        date_naissance: initialDate || "",
        adresse: utilisateur.adresse || "",
        code_postal: utilisateur.code_postal || "",
        numero_telephone: utilisateur.numero_telephone || "",
        numero_portable: utilisateur.numero_portable || "",
        courriel: utilisateur.courriel || "",
        privileges_id: utilisateur.privileges_id || "",
        nom_utilisateur: utilisateur.nom_utilisateur || "",
        mot_de_passe: utilisateur.mot_de_passe || "",
        villes_id_ville: utilisateur.villes_id_ville || "",
    });

    const handleChange = (name, value) => {
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/user/profile/${utilisateur.id_utilisateur}`, {
            onSuccess: () => {
                console.log("Utilisateur mis à jour avec succès");
            },
            onError: (errors) => {
                console.error(
                    "Erreur lors de la mise à jour de l'utilisateur",
                    errors
                );
            },
        });
    };
    const handleDelete = (id) => {
        setIsModalOpen(true); 
        
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`/user/profile/delete/${utilisateur.id_utilisateur}`);
            closeModal();
            window.location.href = "/";
        } catch (error) {
            alert(
                `Erreur lors de la suppression de l'utilisateur : ${
                  error.response?.data?.message || error.message
                }`
              );
        }
    };
    const closeModal = () => {
        setIsModalOpen(false); 
    };
    return (
        <>
            <Header />
            <div className="profile-edit-container">
                <h1>{t("profile.edit_title")}</h1>
                <form onSubmit={handleSubmit}>
                    <EditableProfileItem
                        label={t("profile.first_name")}
                        name="prenom"
                        value={data.prenom}
                        isEditing={true}
                        handleChange={handleChange}
                    />

                    <EditableProfileItem
                        label={t("profile.last_name")}
                        name="nom"
                        value={data.nom}
                        isEditing={true}
                        handleChange={handleChange}
                    />

                    <EditableProfileItem
                        label={t("profile.date_of_birth")}
                        name="date_naissance"
                        value={data.date_naissance}
                        isEditing={true}
                        handleChange={handleChange}
                        type="date"
                    />

                    <EditableProfileItem
                        label={t("profile.address")}
                        name="adresse"
                        value={data.adresse}
                        isEditing={true}
                        handleChange={handleChange}
                    />

                    <EditableProfileItem
                        label={t("profile.postal_code")}
                        name="code_postal"
                        value={data.code_postal}
                        isEditing={true}
                        handleChange={handleChange}
                    />

                    <EditableProfileItem
                        label={t("profile.phone_number")}
                        name="numero_telephone"
                        value={data.numero_telephone}
                        isEditing={true}
                        handleChange={handleChange}
                    />

                    <EditableProfileItem
                        label={t("profile.mobile_number")}
                        name="numero_portable"
                        value={data.numero_portable}
                        isEditing={true}
                        handleChange={handleChange}
                    />

                    <EditableProfileItem
                        label={t("profile.email")}
                        name="courriel"
                        value={data.courriel}
                        isEditing={true}
                        handleChange={handleChange}
                        type="email"
                    />

                    <EditableProfileItem
                        label={t("profile.privilege")}
                        name="privileges_id"
                        value={data.privileges_id}
                        isEditing={true}
                        handleChange={handleChange}
                        type="select"
                        options={privileges.map((privilege) => ({
                            value: privilege.id_privilege,
                            label:
                                i18n.language === "en"
                                    ? JSON.parse(privilege.nom_privilege).en
                                    : JSON.parse(privilege.nom_privilege).fr,
                        }))}
                        disabled={utilisateur.privileges_id !== 1}
                    />

                    <EditableProfileItem
                        label={t("profile.username")}
                        name="nom_utilisateur"
                        value={data.nom_utilisateur}
                        isEditing={true}
                        handleChange={handleChange}
                    />

                    <EditableProfileItem
                        label={t("profile.password")}
                        name="mot_de_passe"
                        value={data.mot_de_passe}
                        isEditing={true}
                        handleChange={handleChange}
                        type="password"
                    />

                    <EditableProfileItem
                        label={t("profile.city")}
                        name="villes_id_ville"
                        value={data.villes_id_ville}
                        isEditing={true}
                        handleChange={handleChange}
                        type="select"
                        options={villes.map((ville) => ({
                            value: ville.id_ville,
                            label: ville.nom_ville,
                        }))}
                    />

                    <button type="submit" className="edit-button ">
                        {t("profile.update_button")}
                    </button>
                </form>
                <button
                    onClick={() => handleDelete(utilisateur.id_utilisateur)}
                    className="delete-button"
                >
                    {t("profile.delete_button")}
                </button>
                  {/* Modal de confirmação */}
                  <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onConfirm={confirmDelete}
                    message={t("confirm_delete_message")}
                />
            </div>
            <Footer />
        </>
    );
};

export default ProfileEdit;

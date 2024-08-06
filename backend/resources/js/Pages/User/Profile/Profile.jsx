import React, { useState, useEffect } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import "./Profile.css";
import EditableProfileItem from "./EditableProfileItem/EditableProfileItem";
import { useForm } from "@inertiajs/inertia-react";
import axios from "axios";
import Modal from "../../Modal/Modal";
import moment from "moment-timezone";
const ProfileEdit = ({ utilisateur, villes, privileges, reservations }) => {
    const { t, i18n } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(
        moment().tz("America/Toronto")
    );
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(moment().tz("America/Toronto"));
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    const calculateRemainingTime = (reservationDate) => {
        const endDate = moment(reservationDate).add(24, "hours");
        const duration = moment.duration(endDate.diff(currentTime));
        return {
            hours: Math.floor(duration.asHours()),
            minutes: duration.minutes(),
            seconds: duration.seconds(),
        };
    };

    // Initial data from utilisateur
    const initialDate = utilisateur.date_naissance
        ? utilisateur.date_naissance.split("T")[0]
        : "";

    // Form handling with InertiaJS useForm
    const { data, setData, put, reset } = useForm({
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

    // Toggle editing mode
    const handleEdit = () => {
        setIsEditing(true);
    };

    // Cancel editing and reset form
    const handleCancel = () => {
        reset();
        setIsEditing(false);
    };

    // Handle form field changes
    const handleChange = (name, value) => {
        setData(name, value);
    };

    // Submit form for updating user profile
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await put(`/user/profile/${utilisateur.id_utilisateur}`);
            console.log("Utilisateur mis à jour avec succès");
            setIsEditing(false);
        } catch (error) {
            console.error(
                "Erreur lors de la mise à jour de l'utilisateur",
                error
            );
        }
    };

    // Handle opening modal for delete confirmation
    const handleDelete = (id) => {
        setIsModalOpen(true);
    };

    // Confirm deletion of user
    const confirmDelete = async () => {
        try {
            await axios.delete(
                `/user/profile/delete/${utilisateur.id_utilisateur}`
            );
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
    const handleCancelReservation = async (id) => {
        try {
            await axios.delete(`/reservations/${id}`);
            console.log("apagou");
            window.location.reload();
        } catch (error) {
            console.log("error delete reservation");
        }
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const addToCart = (voiture) => {
        const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

        const isInCart = cart.some(
            (item) => item.id_voiture === voiture.id_voiture
        );

        if (!isInCart) {
            cart.push(voiture);
            localStorage.setItem("cartItems", JSON.stringify(cart));
        } else {
            console.log("error add cart");
        }
    };

    return (
        <>
            <Header />
            <div className="form-container">
                <h1>{t("user.title_profile")}</h1>
                <form onSubmit={handleSubmit}>
                    <EditableProfileItem
                        label={t("user.first_name")}
                        name="prenom"
                        value={data.prenom}
                        isEditing={isEditing}
                        handleChange={handleChange}
                    />
                    <EditableProfileItem
                        label={t("user.last_name")}
                        name="nom"
                        value={data.nom}
                        isEditing={isEditing}
                        handleChange={handleChange}
                    />
                    <EditableProfileItem
                        label={t("user.birthdate")}
                        name="date_naissance"
                        value={data.date_naissance}
                        isEditing={isEditing}
                        handleChange={handleChange}
                        type="date"
                    />
                    <EditableProfileItem
                        label={t("user.address")}
                        name="adresse"
                        value={data.adresse}
                        isEditing={isEditing}
                        handleChange={handleChange}
                    />
                    <EditableProfileItem
                        label={t("user.postal_code")}
                        name="code_postal"
                        value={data.code_postal}
                        isEditing={isEditing}
                        handleChange={handleChange}
                    />
                    <EditableProfileItem
                        label={t("user.phone")}
                        name="numero_telephone"
                        value={data.numero_telephone}
                        isEditing={isEditing}
                        handleChange={handleChange}
                    />
                    <EditableProfileItem
                        label={t("user.mobile")}
                        name="numero_portable"
                        value={data.numero_portable}
                        isEditing={isEditing}
                        handleChange={handleChange}
                    />
                    <EditableProfileItem
                        label={t("user.email")}
                        name="courriel"
                        value={data.courriel}
                        isEditing={isEditing}
                        handleChange={handleChange}
                        type="email"
                    />
                    <EditableProfileItem
                        label={t("user.privilege")}
                        name="privileges_id"
                        value={data.privileges_id}
                        isEditing={isEditing}
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
                        label={t("user.username")}
                        name="nom_utilisateur"
                        value={data.nom_utilisateur}
                        isEditing={isEditing}
                        handleChange={handleChange}
                    />
                    <EditableProfileItem
                        label={t("user.city")}
                        name="villes_id_ville"
                        value={data.villes_id_ville}
                        isEditing={isEditing}
                        handleChange={handleChange}
                        type="select"
                        options={villes.map((ville) => ({
                            value: ville.id_ville,
                            label: ville.nom_ville,
                        }))}
                    />
                    <EditableProfileItem
                        label={t("user.password")}
                        name="mot_de_passe"
                        value={data.mot_de_passe}
                        isEditing={isEditing}
                        handleChange={handleChange}
                        type="password"
                    />
                </form>
                <div className="reservation-list">
                    <h2>{t("user.reservations")}</h2>
                    {reservations.length === 0 ? (
                        <p>{t("user.no_reservations")}</p>
                    ) : (
                        <>
                            <p>{t("reservation.time_limit_info")}</p>{" "}
                            <table>
                                <thead>
                                    <tr>
                                        <th>{t("reservation.id")}</th>
                                        <th>{t("reservation.car_annee")}</th>
                                        <th>{t("reservation.car_modele")}</th>
                                        <th>{t("reservation.prix")}</th>
                                        <th>
                                            {t("reservation.remaining_time")}
                                        </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservations.map((reservation) => {
                                        const remainingTime =
                                            calculateRemainingTime(
                                                reservation.date_reservation
                                            );
                                        return (
                                            <tr
                                                key={reservation.id_reservation}
                                            >
                                                <td>
                                                    {reservation.id_reservation}
                                                </td>
                                                <td>
                                                    {reservation.voiture.annee}
                                                </td>
                                                <td>
                                                    <Link
                                                        href={`/voitures/${reservation.id_voiture}`}
                                                    >
                                                        {
                                                            reservation.voiture
                                                                .modele
                                                                .nom_modele
                                                        }
                                                    </Link>
                                                </td>
                                                <td>
                                                    {
                                                        reservation.voiture
                                                            .prix_vente
                                                    }
                                                </td>
                                                <td>
                                                    {`${remainingTime.hours}h ${remainingTime.minutes}m ${remainingTime.seconds}s`}
                                                </td>
                                                <td className="actions">
                                                    <button
                                                        onClick={() =>
                                                            addToCart(
                                                                reservation.voiture
                                                            )
                                                        }
                                                        className="btn btn-primary"
                                                    >
                                                        {t(
                                                            "cart.car_show.add_to_cart"
                                                        )}
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleCancelReservation(
                                                                reservation.id_reservation
                                                            )
                                                        } className="cancel-button"
                                                    >
                                                        {t(
                                                            "reservation.cancel_reservation"
                                                        )}
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>

                {/* Conditional rendering based on edit mode */}
                {!isEditing ? (
                    <div>
                        <button className="btn-edit" onClick={handleEdit}>
                            {t("user.edit_button")}
                        </button>
                        <button
                            onClick={() =>
                                handleDelete(utilisateur.id_utilisateur)
                            }
                            className="delete-button"
                        >
                            {t("user.delete_button")}
                        </button>
                        {/* Modal de confirmação */}
                        <Modal
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            onConfirm={confirmDelete}
                            message={t("user.confirm_delete_message")}
                        />
                    </div>
                ) : (
                    <div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            {t("user.update_button")}
                        </button>
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={handleCancel}
                        >
                            {t("user.cancel_button")}
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default ProfileEdit;

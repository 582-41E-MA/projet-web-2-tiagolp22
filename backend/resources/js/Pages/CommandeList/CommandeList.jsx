import React from 'react';
import { useTranslation } from 'react-i18next';
import './CommandeList.css';

const CommandeList = ({ commandes = [] }) => {

     const { t, i18n } = useTranslation();
    const parseJsonField = (field) => {
        if (typeof field === 'string') {
            try {
                return JSON.parse(field);
            } catch (e) {
                console.error('Erreur de parsing JSON:', e);
                return {};
            }
        }
        return field;
    };
    return (
        <div className="commande-list-container">
            <h2 className="commande-list-title">{t('commande_list.title')}</h2>
            <table className="commande-list-table">
                <thead>
                    <tr>
                        <th>{t('commande_list.id')}</th>
                        <th>{t('commande_list.date_commande')}</th>
                        <th>{t('commande_list.date_expedition')}</th>
                        <th>{t('commande_list.date_paiement')}</th>
                        <th>{t('commande_list.prix_total')}</th>
                        <th>{t('commande_list.status')}</th>
                        <th>{t('commande_list.mode_paiement')}</th>
                        <th>{t('commande_list.mode_expedition')}</th>
                        <th>{t('commande_list.commentaires')}</th>
                        <th>{t('commande_list.details')}</th>
                    </tr>
                </thead>
                <tbody>
                    {commandes.map((commande) => (
                        <tr key={commande.id_commande}>
                            <td>{commande.id_commande}</td>
                            <td>{commande.date_commande}</td>
                            <td>{commande.date_expedition}</td>
                            <td>{commande.date_paiement}</td>
                            <td>{commande.prix_total}</td>
                            <td>
                                {i18n.language === "en"
                                            ? parseJsonField(commande.status.nom_status).en
                                            : parseJsonField(commande.status.nom_status).fr}
                            </td>
                            <td> {i18n.language === "en"
                                            ? parseJsonField(commande.methodespaiement.nom_methode_paiement).en
                                            : parseJsonField(commande.methodespaiement.nom_methode_paiement).fr}</td>
                            <td> {i18n.language === "en"
                                            ? parseJsonField(commande.methodesexpedition.nom_methode_expedition).en
                                            : parseJsonField(commande.methodesexpedition.nom_methode_expedition).fr}</td>
                            <td>{commande.commentaires}</td>
                            <td>
                                <button className="action-button">{t('commande_list.details')}</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CommandeList;

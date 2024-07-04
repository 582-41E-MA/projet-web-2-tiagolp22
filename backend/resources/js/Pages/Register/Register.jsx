import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useTranslation } from 'react-i18next';

const Register = () => {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        prenom: '',
        nom: '',
        date_naissance: '',
        adresse: '',
        code_postal: '',
        numero_telephone: '',
        numero_portable: '',
        courriel: '',
        privileges_id: 1,  // to do | doit etre dynamique, par default user
        nom_utilisateur: '',
        mot_de_passe: '',
        villes_id_ville: 1, // to do | doit etre dynamique
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post('/register', {
            data,
            onSuccess: () => {
                console.log('Utilisateur inscrit avec succès!');
            },
            onError: (errors) => {
                console.error('Erreur lors de l\'inscription', errors);
            },
        });
    };

    return (
        <>
            <Header />
            <div className="form-container">
                <img className='logo_formulaire' src="../../img/logo/logo.png" alt="Logo" />
                <h3 className='h3'>{t('register.title')}</h3>
                <p>{t('register.subtitle')}</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="prenom">{t('register.first_name')}</label>
                        <input
                            type="text"
                            name="prenom"
                            id="prenom"
                            value={data.prenom}
                            onChange={(e) => setData('prenom', e.target.value)}
                        />
                        {errors.prenom && <span className="error">{errors.prenom}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="nom">{t('register.last_name')}</label>
                        <input
                            type="text"
                            name="nom"
                            id="nom"
                            value={data.nom}
                            onChange={(e) => setData('nom', e.target.value)}
                        />
                        {errors.nom && <span className="error">{errors.nom}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="date_naissance">{t('register.birthdate')}</label>
                        <input
                            type="date"
                            className='date_naissance'
                            name="date_naissance"
                            id="date_naissance"
                            value={data.date_naissance}
                            onChange={(e) => setData('date_naissance', e.target.value)}
                        />
                        {errors.date_naissance && <span className="error">{errors.date_naissance}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="adresse">{t('register.address')}</label>
                        <input
                            type="text"
                            name="adresse"
                            id="adresse"
                            value={data.adresse}
                            onChange={(e) => setData('adresse', e.target.value)}
                        />
                        {errors.adresse && <span className="error">{errors.adresse}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="code_postal">{t('register.postal_code')}</label>
                        <input
                            type="text"
                            name="code_postal"
                            id="code_postal"
                            value={data.code_postal}
                            onChange={(e) => setData('code_postal', e.target.value)}
                        />
                        {errors.code_postal && <span className="error">{errors.code_postal}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="numero_telephone">{t('register.phone')}</label>
                        <input
                            type="text"
                            name="numero_telephone"
                            id="numero_telephone"
                            value={data.numero_telephone}
                            onChange={(e) => setData('numero_telephone', e.target.value)}
                        />
                        {errors.numero_telephone && <span className="error">{errors.numero_telephone}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="numero_portable">{t('register.mobile')}</label>
                        <input
                            type="text"
                            name="numero_portable"
                            id="numero_portable"
                            value={data.numero_portable}
                            onChange={(e) => setData('numero_portable', e.target.value)}
                        />
                        {errors.numero_portable && <span className="error">{errors.numero_portable}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="courriel">{t('register.email')}</label>
                        <input
                            type="email"
                            name="courriel"
                            id="courriel"
                            value={data.courriel}
                            onChange={(e) => setData('courriel', e.target.value)}
                        />
                        {errors.courriel && <span className="error">{errors.courriel}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="nom_utilisateur">{t('register.username')}</label>
                        <input
                            type="text"
                            name="nom_utilisateur"
                            id="nom_utilisateur"
                            value={data.nom_utilisateur}
                            onChange={(e) => setData('nom_utilisateur', e.target.value)}
                        />
                        {errors.nom_utilisateur && <span className="error">{errors.nom_utilisateur}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="mot_de_passe">{t('register.password')}</label>
                        <input
                            type="password"
                            name="mot_de_passe"
                            id="mot_de_passe"
                            value={data.mot_de_passe}
                            onChange={(e) => setData('mot_de_passe', e.target.value)}
                        />
                        {errors.mot_de_passe && <span className="error">{errors.mot_de_passe}</span>}
                    </div>
                    <button type="submit" disabled={processing}>
                        {t('register.register_button')}
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Register;

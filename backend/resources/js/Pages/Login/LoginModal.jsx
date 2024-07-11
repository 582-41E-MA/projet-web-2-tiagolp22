import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import './Login.css';
import { useTranslation } from 'react-i18next';

function LoginModal({ onClose }) {
  const [courriel, setEmail] = useState('');
  const [mot_de_passe, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post('/login', { courriel, mot_de_passe }, {
      onError: (error) => {
        setErrors(error);
      },
      onSuccess: (page) => {
        const token = page.props.token;
        if (token) {
          localStorage.setItem('auth_token', token);
        }
        onClose();
      }
    });
  };

  const handleGoogleLogin = () => {
    Inertia.get('/login/google');
  };

  const handleFacebookLogin = () => {
    Inertia.get('/login/facebook');
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h1>{t('login.title')}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">{t('login.email')}</label>
            <input
              type="email"
              id="email"
              value={courriel}
              name="courriel"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.courriel && <span className="error-message">{errors.courriel}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">{t('login.password')}</label>
            <input
              type="password"
              id="password"
              name="mot_de_passe"
              value={mot_de_passe}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.mot_de_passe && <span className="error-message">{errors.mot_de_passe}</span>}
          </div>
          <button type="submit" className="login-button">{t('login.login_button')}</button>
        </form>
        <div className="social-login">
          <button className="google-button" onClick={handleGoogleLogin}>
            {t('login.login_with_google')}
          </button>
          <button className="facebook-button" onClick={handleFacebookLogin}>
            {t('login.login_with_facebook')}
          </button>
        </div>
        <p>{t('login.no_account')} <a href="/register" className="footer-link" onClick={onClose}>{t('login.create_account')}</a></p>
      </div>
    </div>
  );
}

export default LoginModal;

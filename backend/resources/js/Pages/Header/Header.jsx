import React from 'react';
import './Header.css';
import { Link } from '@inertiajs/react';

function Header() {
  return (
    <header className="custom-header">
      <div className="wrapper">
        <div className="header-content">
          <Link href="/" className="logo">
            <img src="../../img/logo/logo.png" alt="QuebeCar" />
          </Link>
          <nav className="nav-links">
            <Link href="/" className="nav-link">Accueil</Link>
            <Link href="/catalog" className="nav-link">Catalogue</Link>
            <Link href="/about" className="nav-link">À propos</Link>
            <Link href="/contact" className="nav-link">Nous contacter</Link>

            <div className="dropdown">
              <button className="dropdown-button">
                Plus <span className="arrow-down">&#9660;</span>
              </button>
              <div className="dropdown-content">
                <Link href="/login" className="nav-link">Connexion</Link>
                <Link href="/register" className="nav-link">Inscription</Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

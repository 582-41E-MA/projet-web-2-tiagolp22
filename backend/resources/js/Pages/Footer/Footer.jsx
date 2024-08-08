import React from "react";
import { Link } from "@inertiajs/react";
import "./Footer.css";
import { useTranslation } from "react-i18next";
import MapComponent from "./MapComponent/MapComponent";

function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <MapComponent />
            <div className="wrapper">
                <div className="footer-content">
                    <div className="footer-column">
                        <img
                            className="logo"
                            src="../../../img/logo/logo.png"
                            alt="logo"
                        />
                    </div>
                    <div className="footer-column">
                        <h4>{t("footer.search")}</h4>
                        <Link href="/voitures" className="footer-link">
                            {t("footer.suv")}
                        </Link>
                        <Link href="/voitures" className="footer-link">
                            {t("footer.trucks")}
                        </Link>
                        <Link href="/voitures" className="footer-link">
                            {t("footer.cars")}
                        </Link>
                    </div>
                    <div className="footer-column">
                        <h4>{t("footer.good_to_know")}</h4>
                        <Link href="/contact" className="footer-link">
                            {t("footer.faq")}
                        </Link>
                        <Link href="/contact" className="footer-link">
                            {t("footer.tips")}
                        </Link>
                        <Link href="/about" className="footer-link">
                            {t("footer.guides")}
                        </Link>
                    </div>
                    <div className="footer-column">
                        <h4>{t("footer.about")}</h4>
                        <Link href="/about" className="footer-link">
                            {t("footer.our_story")}
                        </Link>
                        <Link href="/about" className="footer-link">
                            {t("footer.team")}
                        </Link>
                        <Link href="/contact" className="footer-link">
                            {t("footer.contact_us")}
                        </Link>
                    </div>
                </div>
            </div>
            <div className="footer-text">
                &copy; 2024 QuebeCar. {t("footer.rights_reserved")}
            </div>
        </footer>
    );
}

export default Footer;

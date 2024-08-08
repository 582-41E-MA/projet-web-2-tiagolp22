import React from "react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import "./SalesPolicy.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SalesPolicy() {
    const { t } = useTranslation();
    const contactInfo = {
        address: "123 Rue Sherbrooke, Montréal, QC",
        phone: "+1 123 456 7890",
        email: "Quebecar@contact.com",
    };

    return (
        <>
            <Header />
            <div className="politique-container wrapper">
                <h1 className="title">{t("politique.title")}</h1>
                <section className="introduction">
                    <p>{t("politique.intro")}</p>
                </section>

                <section className="sections">
                    <h2>{t("politique.guarantee.title")}</h2>
                    <p>{t("politique.guarantee.content")}</p>

                    <h2>{t("politique.return_conditions.title")}</h2>
                    <p>{t("politique.return_conditions.content")}</p>

                    <h2>{t("politique.purchase_process.title")}</h2>
                    <p>{t("politique.purchase_process.content")}</p>

                    <h2>{t("politique.financing.title")}</h2>
                    <p>{t("politique.financing.content")}</p>
                </section>

                <div className="cta">
                    <p>{t("politique.cta")}</p>
                    <Link href="/contact" className="cta-button">
                        {t("politique.cta_button")}
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SalesPolicy;

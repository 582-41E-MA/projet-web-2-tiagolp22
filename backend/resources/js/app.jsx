import "./bootstrap";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { Inertia } from '@inertiajs/inertia';
import "../styles/index.css";
import i18n from "../../public/locales/i18n";
import { I18nextProvider } from "react-i18next";
import { useTranslation } from 'react-i18next';
import "leaflet/dist/leaflet.css";
import axios from 'axios';


createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });

        let page =
            pages[`./Pages/${name}.jsx`] ||
            pages[`./Pages/${name}/${name}.jsx`];

        if (!page) {
            const parts = name.split("/");
            let lastPart = parts.pop();
            const basePath = parts.join("/");
       
        if (basePath.toLowerCase() === 'user') {
                if (lastPart === 'Register' || lastPart === 'Profile' ) {
                    page = pages[`./Pages/User/${lastPart}/${lastPart}.jsx`];
                }
            }
        }


        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <I18nextProvider i18n={i18n}>
                <App {...props} />
            </I18nextProvider>
        );
    },
});

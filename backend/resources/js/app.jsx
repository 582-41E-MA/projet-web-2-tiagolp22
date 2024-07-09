import "./bootstrap";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import "../styles/index.css";
import i18n from "../../public/locales/i18n";
import { I18nextProvider } from "react-i18next";
import "leaflet/dist/leaflet.css";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });

        // Primeiro, tenta encontrar a página diretamente no diretório Pages
        let page =
            pages[`./Pages/${name}.jsx`] ||
            pages[`./Pages/${name}/${name}.jsx`];

        // Se não encontrar, tenta resolver páginas CRUD nos subdiretórios específicos
        if (!page) {
            const parts = name.split("/");
            const lastPart = parts.pop();
            const basePath = parts.join("/");

            if (["Create", "Edit", "Show"].includes(lastPart)) {
                page =
                    pages[
                        `./Pages/${basePath}/${lastPart}/${basePath}${lastPart}.jsx`
                    ];
            }
        }

        // Lança um erro se a página não for encontrada
        if (!page) {
            throw new Error(`Page not found: ${name}`);
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

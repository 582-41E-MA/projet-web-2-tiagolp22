import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Facture = ({ commandeId }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const generatePDF = async () => {
      try {
        const response = await axios.get(`/generate-facture/${commandeId}`);
        setPdfUrl(response.data.pdfUrl);
      } catch (error) {
        console.error('Erreur lors de la génération du PDF:', error);
      }
    };

    generatePDF();
  }, [commandeId]);

  if (!pdfUrl) {
    return <div>{t('invoice_loading')}</div>;
  }

  return (
    <div>
      <h2>{t('invoice_title', { orderId: commandeId })}</h2>
      <iframe src={pdfUrl} width="100%" height="600px" />
    </div>
  );
};

export default Facture;

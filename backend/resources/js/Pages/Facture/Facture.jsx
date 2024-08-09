import React, { useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Facture = ({ commandeId }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const downloadPDF = async () => {
      try {
        const response = await axios({
          url: `/generate-facture/${commandeId}`,
          method: 'GET',
          responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `facture_${commandeId}.pdf`);
        document.body.appendChild(link);
        link.click();

        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Erreur lors du téléchargement du PDF:', error);
      }
    };

    downloadPDF();
  }, [commandeId]);

  return (
    <div>
      <h2>{t('invoice_title', { orderId: commandeId })}</h2>
      <p>{t('invoice_loading')}</p>
    </div>
  );
};

export default Facture;

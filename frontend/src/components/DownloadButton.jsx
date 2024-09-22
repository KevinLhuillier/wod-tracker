import React from 'react';

const DownloadButton = () => {
  const handleDownload = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/download/csv', {
        method: 'GET',
        headers: {
          'Content-Type': 'text/csv',
        },
      });

      if (response.ok) {
        // Créer un blob avec les données CSV
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Créer un élément lien pour déclencher le téléchargement
        const a = document.createElement('a');
        a.href = url;
        a.download = 'export.csv';  // Nom du fichier à télécharger
        document.body.appendChild(a);
        a.click();

        // Supprimer l'élément lien après le téléchargement
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Échec du téléchargement');
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier', error);
    }
  };

  return (
    <button onClick={handleDownload}>
      Télécharger CSV
    </button>
  );
};

export default DownloadButton;

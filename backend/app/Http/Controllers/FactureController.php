<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;

class FactureController extends Controller
{
    public function generatePDF(Request $request, $commandeId)
    {
        Log::info('Début de la génération du PDF pour la commande ' . $commandeId);
        try {
            // Récupération de la commande avec ses relations
            $commande = Commande::with(['utilisateur', 'voitures', 'taxes', 'methodePaiement', 'methodeExpedition'])->findOrFail($commandeId);
            Log::info('Commande trouvée');

            // Génération du PDF
            $pdf = PDF::loadView('factures.template', ['commande' => $commande]);
            Log::info('Vue chargée');

            // Création du fichier PDF et retour en tant que téléchargement
            $pdfName = 'facture_' . $commandeId . '.pdf';
            Log::info('Nom du fichier PDF : ' . $pdfName);

            return $pdf->download($pdfName);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la génération du PDF: ' . $e->getMessage());
            Log::error('Trace: ' . $e->getTraceAsString());
            return response()->json(['error' => 'Erreur lors de la génération du PDF: ' . $e->getMessage()], 500);
        }
    }
}

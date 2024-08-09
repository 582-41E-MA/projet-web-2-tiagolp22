<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\MethodePaiement;
use App\Models\MethodeExpedition;
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
            $commande = Commande::with(['utilisateur', 'voitures', 'taxes', 'methodePaiement', 'methodeExpedition'])->findOrFail($commandeId);
            Log::info('Commande trouvée');

            $pdf = PDF::loadView('factures.template', ['commande' => $commande]);
            Log::info('Vue chargée');

            $directory = storage_path('app/public/factures');
            Log::info('Répertoire de destination : ' . $directory);

            if (!File::isDirectory($directory)) {
                Log::info('Le répertoire n\'existe pas, tentative de création');
                File::makeDirectory($directory, 0755, true, true);
            }

            $pdfPath = $directory . '/facture_' . $commandeId . '.pdf';
            Log::info('Chemin complet du fichier PDF : ' . $pdfPath);

            $pdf->save($pdfPath);
            Log::info('PDF sauvegardé');

            return response()->json(['pdfUrl' => asset('storage/factures/facture_' . $commandeId . '.pdf')]);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la génération du PDF: ' . $e->getMessage());
            Log::error('Trace: ' . $e->getTraceAsString());
            return response()->json(['error' => 'Erreur lors de la génération du PDF: ' . $e->getMessage()], 500);
        }
    }
}

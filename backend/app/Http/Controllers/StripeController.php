<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use App\Models\Commande;
use Inertia\Inertia;


use App\Models\MethodeExpedition;


class StripeController extends Controller
{
    public function createCheckoutSession(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $lineItems = [];
        foreach ($request->items as $item) {
            $lineItems[] = [
                'price_data' => [
                    'currency' => 'cad',
                    'product_data' => [
                        'name' => $item['modele']['nom_modele'] . ' ' . $item['annee'],
                    ],
                    'unit_amount' => $item['prix_vente'] * 100,
                ],
                'quantity' => 1,
            ];
        }

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => route('payment.success'),
            'cancel_url' => route('payment.cancel'),
        ]);

        return response()->json(['id' => $session->id]);
    }

    public function createNewOrder(Request $request)
    {
        Log::info('Démarrage de createNewOrder', $request->all());
        $modeExpeditionId = $request->mode_expedition_id;
        try {
            // Traiter le paiement
            $paymentResult = $this->processPayment($request);
            Log::info('Résultat du traitement :', $paymentResult);
    
            if ($paymentResult['success']) {
                // Obtenir l'ID de la province de l'utilisateur (ou d'ailleurs selon votre logique)
                $provinceId = 1; // Remplacer par l'ID correct selon votre logique
    
                // Calculer le total avec les taxes
                $totalAmountData = $this->calculateTotalAmount($request->items, $provinceId, $modeExpeditionId);
                $totalAmount = $totalAmountData['total'];
                $totalTaxes = $totalAmountData['taxes'];
                $fraisExpedition = $totalAmountData['frais_expedition'];
    
                // Créer une nouvelle commande
                $order = new Commande();
                $order->id_utilisateur = auth()->id() ?? 1;
                $order->date_commande = now();
                $order->prix_total = $totalAmount;
                $order->status_commande_id = 1;
                $order->mode_paiement_id = 1;
                $order->mode_expedition_id = $modeExpeditionId;
                $order->date_paiement = now();
                $order->commentaires = 'Commande réalisée via Stripe';
    
                if (!$order->save()) {
                    throw new \Exception("Échec de l'enregistrement de la commande dans la base de données.");
                }
    
                Log::info('Commande créée :', $order->toArray());
    
                // Enregistrer les taxes dans la table commandes_has_taxes
                $tax = DB::table('taxes')->where('provinces_id_province', $provinceId)->first();
                if ($tax) {
                    DB::table('commandes_has_taxes')->insert([
                        'commandes_id_commande' => $order->id_commande,
                        'taxes_id' => $tax->id,
                        'total_taxes' => $totalTaxes,
                    ]);
                }
    
                // Mise à jour des voitures avec le ID de la commande
                foreach ($request->items as $item) {
                    DB::table('voitures')->where('id_voiture', $item['id_voiture'])
                        ->update(['commandes_id_commande' => $order->id_commande]);
                }
    
                return response()->json([
                    'success' => true,
                    'message' => 'Commande créée avec succès',
                    'order_id' => $order->id_commande,
                    'clientSecret' => $paymentResult['clientSecret']
                ]);
            } else {
                Log::error('Échec du traitement du paiement :', $paymentResult);
                return response()->json([
                    'success' => false,
                    'message' => 'Échec du traitement du paiement',
                    'error' => $paymentResult['error']
                ], 400);
            }
        } catch (\Exception $e) {
            Log::error('Erreur lors de la création de la commande :', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création de la commande',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    

    public function webhook(Request $request)
    {
        $payload = $request->getContent();
        $sig_header = $request->header('Stripe-Signature');
        $event = null;

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload,
                $sig_header,
                env('STRIPE_WEBHOOK_SECRET')
            );
        } catch (\UnexpectedValueException $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }

        switch ($event->type) {
            case 'checkout.session.completed':
                $session = $event->data->object;
                $commandeId = $session->client_reference_id;
                $commande = Commande::find($commandeId);
                if ($commande) {
                    $commande->status_commande_id = 'id_commande';
                    $commande->date_paiement = now();
                    $commande->save();
                }
                break;
            default:
                echo 'Received unknown event type ' . $event->type;
        }

        return response()->json(['status' => 'success']);
    }

    public function paymentSuccess()
    {
        return Inertia::render('PaymentSuccess');
    }

    public function paymentCancel()
    {
        return Inertia::render('PaymentCancel');
    }

    public function processPayment(Request $request)
    {
        Log::info('Iniciando processamento de pagamento');
        Stripe::setApiKey(env('STRIPE_SECRET'));

        try {
            $provinceId = 1;
            $totalAmountData = $this->calculateTotalAmount($request->items, $provinceId, $request->mode_expedition_id);
            $totalAmount = (int) $totalAmountData['total'];

            $paymentIntent = \Stripe\PaymentIntent::create([
                'amount' => $totalAmount * 100,
                'currency' => 'cad',
                'payment_method' => $request->paymentMethod,
                'confirm' => true,
                'return_url' => route('payment.success'),
                'automatic_payment_methods' => [
                    'enabled' => true,
                ],
            ]);

            Log::info('PaymentIntent créé:', ['id' => $paymentIntent->id]);

            return ['success' => true, 'clientSecret' => $paymentIntent->client_secret];
        } catch (\Exception $e) {
            Log::error('Erro no processamento do pagamento:', ['message' => $e->getMessage()]);
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }


    private function calculateTotalAmount($items, $provinceId, $modeExpeditionId)
    {
        $subtotal = $this->calculateSubtotal($items);

        // Récupérer les taxes de la table des taxes
        $tax = DB::table('taxes')->where('provinces_id_province', $provinceId)->first();

        $gst_hst = 0;
        $pst = 0;
        $totalTaxes = 0;

        if ($tax) {
            $gst_hst = $subtotal * ($tax->GST_HST / 100);
            $pst = $subtotal * ($tax->PST / 100);
            $totalTaxes = $gst_hst + $pst;
        }

        // Récupérer le prix du fret
        $methodExpedition = MethodeExpedition::find($modeExpeditionId);
        $fraisExpedition = $methodExpedition ? $methodExpedition->prix_fixe : 0;

        $total = $subtotal + $totalTaxes + $fraisExpedition;

        return [
            'total' => (int) $total, 
            'taxes' => $totalTaxes,
            'frais_expedition' => $fraisExpedition
        ];
    }


    private function calculateSubtotal($items)
    {
        return array_reduce($items, function ($carry, $item) {
            return $carry + $item['prix_vente'];
        }, 0);
    }
}
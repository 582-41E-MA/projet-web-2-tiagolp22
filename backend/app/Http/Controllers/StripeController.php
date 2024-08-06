<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use App\Models\Commande;
use Inertia\Inertia;

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
        try {
            // Traiter le paiement
            $paymentResult = $this->processPayment($request);
            Log::info('Résultat du traitement :', $paymentResult);

            if ($paymentResult['success']) {
                // Créer une nouvelle commande
                $order = new Commande();
                $order->id_utilisateur = auth()->id() ?? 1; // Utiliser 1 si aucun utilisateur n'est authentifié
                $order->date_commande = now();
                $order->prix_total = $this->calculateTotalAmount($request->items);
                $order->status_commande_id = 1;
                $order->mode_paiement_id = 1;
                $order->mode_expedition_id = 1;
                $order->date_paiement = now();
                $order->commentaires = 'Commande réalisée via Stripe';

                if (!$order->save()) {
                    throw new \Exception("Échec de l'enregistrement de la commande dans la base de données.");
                }

                Log::info('Commande créée :', $order->toArray());

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
                echo 'Reçu un type d\'événement inconnu ' . $event->type;
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
        Log::info('Démarrage du traitement de paiement');
        Stripe::setApiKey(env('STRIPE_SECRET'));

        try {
            $paymentIntent = \Stripe\PaymentIntent::create([
                'amount' => $this->calculateTotalAmount($request->items) * 100,
                'currency' => 'cad',
                'payment_method' => $request->paymentMethod,
                'confirm' => true,
                'return_url' => route('payment.success'),
                'automatic_payment_methods' => [
                    'enabled' => true,
                ],
            ]);

            Log::info('PaymentIntent créé :', ['id' => $paymentIntent->id]);

            return ['success' => true, 'clientSecret' => $paymentIntent->client_secret];
        } catch (\Exception $e) {
            Log::error('Erreur lors du traitement du paiement :', ['message' => $e->getMessage()]);
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    private function calculateTotalAmount($items)
    {
        return array_reduce($items, function ($carry, $item) {
            return $carry + $item['prix_vente'];
        }, 0);
    }
}

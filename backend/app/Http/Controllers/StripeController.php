<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
        Stripe::setApiKey(env('STRIPE_SECRET'));

        try {
            $paymentIntent = \Stripe\PaymentIntent::create([
                'amount' => $this->calculateTotalAmount($request->items) * 100,
                'currency' => 'cad',
                'payment_method' => $request->paymentMethod,
                'confirmation_method' => 'manual',
                'confirm' => true,
                'return_url' => route('payment.success'),
            ]);

            // TODO: nous pouvons mettre en œuvre les règles commerciales ici ou d'autres détails sur le paiement

            return response()->json(['success' => true, 'clientSecret' => $paymentIntent->client_secret]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    private function calculateTotalAmount($items)
    {
        return array_reduce($items, function ($carry, $item) {
            return $carry + $item['prix_vente'];
        }, 0);
    }
}

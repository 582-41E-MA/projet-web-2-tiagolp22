<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Stripe\Stripe;
use Stripe\Checkout\Session;
use App\Models\Commande;

class StripeController extends Controller
{
    public function createCheckoutSession(Request $request, $commandeId)
    {
        $commande = Commande::findOrFail($commandeId);

        Stripe::setApiKey(env('STRIPE_SECRET'));

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'cad',
                    'product_data' => [
                        'name' => 'Commande #' . $commande->id,
                    ],
                    'unit_amount' => $commande->prix_total * 100,
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => route('payment.success', ['commande' => $commande->id]),
            'cancel_url' => route('payment.cancel', ['commande' => $commande->id]),
            'client_reference_id' => $commande->id, // ID commandes
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

        // Handle the event
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
}

<!DOCTYPE html>
<html>
<head>
    <title>Payment Receipt #{{ $commande->id_commande }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 50px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            color: #555;
        }
        .details, .footer {
            width: 100%;
            margin-bottom: 20px;
        }
        .details td {
            padding: 5px 0;
        }
        .details .label {
            width: 30%;
            font-weight: bold;
            text-align: right;
            padding-right: 10px;
        }
        .details .value {
            width: 70%;
            text-align: left;
        }
        .footer td {
            padding: 10px 0;
            text-align: center;
            font-size: 12px;
            color: #777;
        }
        .total {
            font-size: 18px;
            font-weight: bold;
            margin-top: 30px;
        }
        .total td {
            padding: 10px 0;
        }
        .logo {
            text-align: center;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <h1>Payment Receipt #{{ $commande->id_commande }}</h1>

    <!-- Customer Information -->
    <p><strong>Customer Name:</strong> {{ $commande->utilisateur->prenom ?? 'N/A' }} {{ $commande->utilisateur->nom ?? 'N/A' }}</p>
    <p><strong>Address:</strong> {{ $commande->utilisateur->adresse ?? 'N/A' }}</p>
    <p><strong>Postal Code:</strong> {{ $commande->utilisateur->code_postal ?? 'N/A' }}</p>

    <!-- Purchase Information -->
    <p><strong>Purchase Date:</strong> {{ $commande->date_commande }}</p>
    <p><strong>Payment Method:</strong> {{ $commande->methodePaiement->nom_methode_paiement ?? 'N/A' }}</p>
    <p><strong>Shipping Method:</strong> {{ $commande->methodeExpedition->nom_methode_expedition ?? 'N/A' }}</p>

    <!-- Vehicle Information -->
    @if($commande->voitures->isNotEmpty())
        <h2>Associated Vehicles:</h2>
        @foreach($commande->voitures as $voiture)
            <h3>Vehicle #{{ $voiture->id_voiture }}</h3>
            <p><strong>Model:</strong> {{ $voiture->modele ? json_decode($voiture->modele->nom_modele, true) : 'N/A' }}</p>
            <p><strong>Year:</strong> {{ $voiture->annee }}</p>
            <p><strong>Sale Price:</strong> {{ $voiture->prix_vente }} €</p>
        @endforeach
    @else
        <p>No vehicle associated with this order.</p>
    @endif

    <p><strong>Total Paid:</strong> {{ $commande->prix_total }} €</p>
    <p>Thank you for your purchase!</p>
</body>
</html>

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VoitureController;
use App\Http\Controllers\UtilisateurController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConstructeurController;
use App\Http\Controllers\TransmissionController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\PrivilegeController;
use App\Http\Controllers\TypeCarburantController;
use App\Http\Controllers\ModeleController;
use App\Http\Controllers\GroupeMotopropulseurController;
use App\Http\Controllers\CarrosserieController;
use App\Http\Controllers\PaysController;
use App\Http\Controllers\ProvinceController;
use App\Http\Controllers\VilleController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\FactureController;
use App\Http\Middleware\CheckPrivilege;
use Inertia\Inertia;

// Routes protégées par authentification
Route::middleware(['auth:sanctum'])->group(function () {
    // Routes pour tous les utilisateurs authentifiés
    Route::get('/user/profile/{id}', [UtilisateurController::class, 'show'])->name('user.profile');
    Route::put('/user/profile/{id}', [UtilisateurController::class, 'update'])->name('user.update');
    // Routes pour les clients (ID 2)
    Route::middleware(CheckPrivilege::class . ':2')->group(function () {
        Route::post('/voitures/{id}/buy', [VoitureController::class, 'buy'])->name('voitures.buy');
        // Route::get('/mes-factures', [FactureController::class, 'mesFactures'])->name('factures.mesFactures');
    });

    // Routes pour les employés et les managers (ID 3 et 1)
    Route::middleware(CheckPrivilege::class . ':3,1')->group(function () {
        // Gestion des voitures
        Route::get('/voitures/create', [VoitureController::class, 'create'])->name('voitures.create');
        Route::post('/voitures', [VoitureController::class, 'store'])->name('voitures.store');
        Route::get('/voitures/{id}/edit', [VoitureController::class, 'edit'])->name('voitures.edit');
        Route::put('/voitures/{id}', [VoitureController::class, 'update'])->name('voitures.update');
        //
        Route::get('/modele', [ModeleController::class, 'index'])->name('modele.index');
        Route::get('/modele/create', [ModeleController::class, 'create'])->name('modele.create');
        Route::post('/modele', [ModeleController::class, 'store'])->name('modele.store');

        Route::get('/constructeur', [ConstructeurController::class, 'index'])->name('constructeur.index');
        Route::get('/constructeur/create', [ConstructeurController::class, 'create'])->name('constructeur.create');
        Route::post('/constructeur', [ConstructeurController::class, 'store'])->name('constructeur.store');
        Route::get('/constructeur/{id_constructeur}/edit', [ConstructeurController::class, 'edit'])->name('constructeur.edit');
        
        Route::delete('/modele/{id}', [ModeleController::class, 'destroy'])->name('modele.destroy');
        Route::get('/modeles/{id}/edit', [ModeleController::class, 'edit'])->name('modeles.edit');
        Route::put('/modeles/{id}', [ModeleController::class, 'update'])->name('modeles.update');

        Route::get('/pays', [PaysController::class, 'index'])->name('pays.index');
        Route::get('/pays/create', [PaysController::class, 'create'])->name('pays.create');
        Route::post('/pays', [PaysController::class, 'store'])->name('pays.store');
        Route::get('/pays/{id}/edit', [PaysController::class, 'edit'])->name('pays.edit');
        Route::put('/pays/{id}', [PaysController::class, 'update'])->name('pays.update');
        Route::delete('/pays/{id}', [PaysController::class, 'destroy'])->name('pays.destroy');

        Route::get('/provinces', [ProvinceController::class, 'index'])->name('provinces.index');
        Route::get('/provinces/create', [ProvinceController::class, 'create'])->name('provinces.create');
        Route::post('/provinces', [ProvinceController::class, 'store'])->name('provinces.store');
        Route::get('/provinces/{id}/edit', [ProvinceController::class, 'edit'])->name('provinces.edit');
        Route::put('/provinces/{id}', [ProvinceController::class, 'update'])->name('provinces.update');
        Route::delete('/provinces/{id}', [ProvinceController::class, 'destroy'])->name('provinces.destroy');
        
        Route::get('/villes', [VilleController::class, 'index'])->name('villes.index');
        Route::get('/villes/create', [VilleController::class, 'create'])->name('villes.create');
        Route::post('/villes', [VilleController::class, 'store'])->name('villes.store');
        Route::get('/villes/{id}/edit', [VilleController::class, 'edit'])->name('villes.edit');
        Route::put('/villes/{id}', [VilleController::class, 'update'])->name('villes.update');
        Route::delete('/villes/{id}', [VilleController::class, 'destroy'])->name('villes.destroy');
        // Gestion des clients
        // Route::resource('/clients', ClientController::class)->except(['destroy']);

        // Gestion des factures
        // Route::resource('/factures', FactureController::class)->except(['destroy']);
        // Route::post('/factures/{id}/generate-pdf', [FactureController::class, 'generatePdf'])->name('factures.generatePdf');
        // Route::post('/factures/{id}/send-email', [FactureController::class, 'sendEmail'])->name('factures.sendEmail');

        // Autres ressources
        Route::resource('/constructeur', ConstructeurController::class)->except(['destroy']);
        Route::resource('/transmissions', TransmissionController::class)->except(['destroy']);
        Route::resource('/status', StatusController::class)->except(['destroy']);
        Route::resource('/type-carburants', TypeCarburantController::class)->except(['destroy']);
        Route::resource('/modeles', ModeleController::class)->except(['destroy']);
        Route::resource('/groupe-motopropulseurs', GroupeMotopropulseurController::class)->except(['destroy']);
        Route::resource('/carrosseries', CarrosserieController::class)->except(['destroy']);
    });

    // Routes exclusives aux managers (ID 1)
    Route::middleware(CheckPrivilege::class . ':1')->group(function () {
        Route::delete('/voitures/{id}', [VoitureController::class, 'destroy'])->name('voitures.destroy');
        // Route::delete('/clients/{id}', [ClientController::class, 'destroy'])->name('clients.destroy');
        // Route::delete('/factures/{id}', [FactureController::class, 'destroy'])->name('factures.destroy');
        Route::delete('/constructeur/{id}', [ConstructeurController::class, 'destroy'])->name('constructeur.destroy');
        Route::delete('/transmissions/{id}', [TransmissionController::class, 'destroy'])->name('transmissions.destroy');
        Route::delete('/status/{id}', [StatusController::class, 'destroy'])->name('status.destroy');
        Route::delete('/type-carburants/{id}', [TypeCarburantController::class, 'destroy'])->name('type-carburants.destroy');
        Route::delete('/modeles/{id}', [ModeleController::class, 'destroy'])->name('modeles.destroy');
        Route::delete('/groupe-motopropulseurs/{id}', [GroupeMotopropulseurController::class, 'destroy'])->name('groupe-motopropulseurs.destroy');
        Route::delete('/carrosseries/{id}', [CarrosserieController::class, 'destroy'])->name('carrosseries.destroy');

        // Gestion des privilèges
        Route::resource('/privileges', PrivilegeController::class);

        // Gestion des utilisateurs (y compris les employés)
        Route::resource('/utilisateurs', UtilisateurController::class);
    });
});

// Routes publiques
Route::get('/', [HomeController::class, 'index'])->name('Accueil');
Route::get('/about', function () { return inertia('About'); })->name('about');
Route::get('/contact', function () { return inertia('Contact'); })->name('contact');
Route::get('/voitures', [VoitureController::class, 'index'])->name('voitures.index');
Route::get('/voitures/{id}', [VoitureController::class, 'show'])->name('voitures.show');
Route::get('/api/voitures/filter', [VoitureController::class, 'filter'])->name('voitures.filter');

// Routes d'authentification
Route::get('/register', [AuthController::class, 'showRegistrationForm'])->name('register');
Route::post('/register', [AuthController::class, 'register']);
Route::get('/login', [AuthController::class, 'index'])->name('login.index');
Route::post('/login', [AuthController::class, 'userLogin'])->name('login.userLogin');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');



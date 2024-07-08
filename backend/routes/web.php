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
use Inertia\Inertia;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
*/

// Route public 
Route::get('/', [HomeController::class, 'index'])->name('Accueil');
Route::get('/voitures', [VoitureController::class, 'index'])->name('voitures.index');
// Routes pour les pages statiques 
Route::get('/contact', function () {
    return inertia('Contact'); 
})->name('contact');

Route::get('/about', function () {
    return inertia('About'); 
})->name('about');

Route::get('/about', function () {
    return inertia('About'); 
})->name('about');

//Inscription
Route::get('/register', [AuthController::class, 'showRegistrationForm'])->name('register'); //afficher form d'inscription
Route::post('/register', [AuthController::class, 'register']);//inscription d'un utilisateur

//login
Route::get('/login', [AuthController::class, 'index'])->name('login.index'); //afficher form
Route::post('/login', [AuthController::class, 'userLogin'])->name('login.userLogin'); // fonctionalité login

// Route logout
Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth:sanctum');
Route::resource('/voitures', VoitureController::class);

// Routes authentifiées
Route::middleware([EnsureFrontendRequestsAreStateful::class, 'auth:sanctum'])->group(function () {
    // Routes pour le VoituresController
  

    // Routes pour le UtilisateursController
    Route::resource('/utilisateurs', UtilisateurController::class);
});
Route::get('/api/voitures/filter', [VoitureController::class, 'filter'])->name('voitures.filter');


Route::resource('constructeurs', ConstructeurController::class);
Route::resource('transmissions', TransmissionController::class);
Route::resource('status', StatusController::class);
Route::resource('privileges', PrivilegeController::class);
Route::resource('typecarburants', TypeCarburantController::class);
Route::resource('modeles', ModeleController::class);
Route::resource('groupes_motopropulseur', GroupeMotopropulseurController::class);
Route::resource('carrosseries', CarrosserieController::class);
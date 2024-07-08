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

use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

use App\Http\Middleware\CheckPrivilege;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('Accueil');
Route::get('/voitures', [VoitureController::class, 'index'])->name('voitures.index');
Route::get('/voitures/{id}', [VoitureController::class, 'show'])->name('voitures.show');
Route::resource('/voitures', VoitureController::class)->except(['index', 'show']);


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', [UtilisateurController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [UtilisateurController::class, 'update'])->name('profile.update');
    Route::get('/contact', function () { return inertia('Contact'); })->name('contact');

    Route::middleware(CheckPrivilege::class . ':1,2')->group(function () {
        Route::resource('/voitures', VoitureController::class)->except(['index', 'show']);
    });

    Route::middleware(CheckPrivilege::class . ':1')->group(function () {
        Route::resource('/utilisateurs', UtilisateurController::class);
        Route::get('/voitures/{id}/edit', [VoitureController::class, 'edit'])->name('voitures.edit');
        Route::put('/voitures/{id}', [VoitureController::class, 'update'])->name('voitures.update');
        Route::get('/about', function () { return inertia('About'); })->name('about');
    });

    Route::middleware(CheckPrivilege::class . ':1,2')->group(function () {
        Route::post('/voitures/{id}/buy', [VoitureController::class, 'buy'])->name('voitures.buy');
    });
});
Route::get('/api/voitures/filter', [VoitureController::class, 'filter'])->name('voitures.filter');


Route::get('/register', [AuthController::class, 'showRegistrationForm'])->name('register');
Route::post('/register', [AuthController::class, 'register']);
Route::get('/login', [AuthController::class, 'index'])->name('login.index');
Route::post('/login', [AuthController::class, 'userLogin'])->name('login.userLogin');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth:sanctum');


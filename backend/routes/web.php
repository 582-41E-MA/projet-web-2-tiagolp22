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

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user/profile/{id}', [UtilisateurController::class, 'show'])->name('user.profile');
    Route::put('/user/profile/{id}', [UtilisateurController::class, 'update'])->name('user.update');


    Route::middleware(CheckPrivilege::class . ':1')->group(function () {
        Route::resource('/voitures', VoitureController::class)->except(['index', 'show']);
        Route::get('/voitures/create', [VoitureController::class, 'create'])->name('voitures.create');
        Route::post('/voitures', [VoitureController::class, 'store'])->name('voitures.store');
        Route::get('/voitures/{id}/edit', [VoitureController::class, 'edit'])->name('voitures.edit');
        Route::put('/voitures/{id}', [VoitureController::class, 'update'])->name('voitures.update');
    });

    Route::middleware(CheckPrivilege::class . ':2')->group(function () {
        Route::post('/voitures/{id}/buy', [VoitureController::class, 'buy'])->name('voitures.buy');
    });
});
Route::get('/api/voitures/filter', [VoitureController::class, 'filter'])->name('voitures.filter');


// Routes accessibles à tous les utilisateurs
Route::get('/', [HomeController::class, 'index'])->name('Accueil');
Route::get('/voitures', [VoitureController::class, 'index'])->name('voitures.index');
Route::get('/voitures/{id}', [VoitureController::class, 'show'])->name('voitures.show');
Route::get('/about', function () {
    return inertia('About');
})->name('about');
Route::get('/contact', function () {
    return inertia('Contact');
})->name('contact');
Route::get('/api/voitures/filter', [VoitureController::class, 'filter'])->name('voitures.filter');
Route::get('/register', [AuthController::class, 'showRegistrationForm'])->name('register');
Route::post('/register', [AuthController::class, 'register']);
Route::get('/login', [AuthController::class, 'index'])->name('login.index');
Route::post('/login', [AuthController::class, 'userLogin'])->name('login.userLogin');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
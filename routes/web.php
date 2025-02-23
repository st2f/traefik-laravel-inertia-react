<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// public

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/article/{id}', [ArticleController::class,'show'])->name('article');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// admin

Route::middleware('auth')->group(function () {
    // article
    Route::get('/content/{id}', [ArticleController::class, 'edit'])->name('article.edit');
    Route::patch('/content/{id}', [ArticleController::class, 'update'])->name('article.update');
    Route::delete('/content/{id}', [ArticleController::class, 'destroy'])->name('article.destroy');
    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route::delete('profile', [ProfileController::class, 'deleteProfile']);

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

require __DIR__.'/auth.php';

//Route::get('/{any}', function () { return view('app'); })->where('any', '.*');






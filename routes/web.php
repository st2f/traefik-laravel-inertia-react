<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
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
    //categories
    Route::get('/content/categories', [CategoryController::class, 'edit'])->name('categories');
    Route::patch('/content/category/{id}', [CategoryController::class, 'update'])->name('category.update');
    Route::post('/content/category', [CategoryController::class, 'create'])->name('category.create');
    Route::post('/content/category/delete', [CategoryController::class, 'destroy'])->name('category.destroy');
    // article
    Route::get('/content/new', [ArticleController::class, 'new'])->name('article.new');
    Route::post('/content/create', [ArticleController::class, 'create'])->name('article.create');
    Route::get('/content/{id}', [ArticleController::class, 'edit'])->name('article.edit');
    Route::patch('/content/{id}', [ArticleController::class, 'update'])->name('article.update');
    Route::get('/content/delete/{id}', [ArticleController::class, 'destroy'])->name('article.destroy');
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






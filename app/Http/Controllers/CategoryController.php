<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Category;

class CategoryController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Content/EditCategories', [
            'status' => session('status'),
        ]);
    }

    public function create(Request $request): RedirectResponse
    {
        $request->validate([
            'categoryName' => ['required'],
        ]);

        $category = new Category();
        $category->categoryName = $request->categoryName;
        $category->save();

        return Redirect::route('categories');
    }

    public function update($id, Request $request): RedirectResponse
    {
        $request->validate([
            'categoryId' => ['required'],
            'categoryName' => ['required'],
        ]);

        $category = Category::findOrFail($id);
        $category->categoryName = $request->categoryName;
        $category->save();

        return Redirect::route('categories');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'categoryId' => ['required'],
        ]);

        $category = Category::findOrFail($request->categoryId);
        $category->delete();

        return Redirect::route('categories');
    }

}

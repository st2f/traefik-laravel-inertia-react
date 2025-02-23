<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories =  Category::all();

        return response()->json($categories);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $item)
    {
        return response()->json($item);
    }
}

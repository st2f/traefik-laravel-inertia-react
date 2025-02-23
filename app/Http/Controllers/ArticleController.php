<?php

namespace App\Http\Controllers;


use App\Http\Requests\ArticleStoreRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use App\Models\Article;

class ArticleController extends Controller
{
    /**
     * Show the article page
     */
    public function show($id)
    {
        return Inertia::render('Article', [
            'id' => $id,
        ]);
    }

    /**
     * Display the article form
     */
    public function edit($id): Response
    {
        return Inertia::render('Content/EditArticle', [
            'id' => $id,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the article information
     */
    public function update($id, Request $request): RedirectResponse
    {
        $request->validate([
            'id' => ['required'],
            'title' => ['required'],
            'content' => ['required'],
            'category' => ['required'],
        ]);

        $article = Article::find($id);
        $article->title = $request->title;
        $article->category = $request->category;
        $article->content = $request->content;
        $article->save();

        return Redirect::route('article.edit', [$id]);
    }

    /**
     * Delete the article
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'id' => ['required'],
        ]);

        $article = $request->article();
        $article->delete();

        return Redirect::to('/dashboard');
    }

}

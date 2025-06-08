<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArticleStoreRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Article;

class ArticleController extends Controller
{
    public function show($id)
    {
        return Inertia::render('Article', [
            'id' => $id,
        ]);
    }

    public function edit($id): Response
    {
        return Inertia::render('Content/EditArticle', [
            'id' => $id,
            'status' => session('status'),
        ]);
    }

    public function new(): Response
    {
        return Inertia::render('Content/NewArticle', [
            'status' => session('status'),
        ]);
    }

    public function create(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => ['required'],
            'content' => ['required'],
            'category' => ['required'],
        ]);

        $article = new Article();
        $article->title = $request->title;
        $article->category = $request->category;
        $article->content = $request->content;
        $article->save();
        return Redirect::route('article.edit', [$article->id]);
    }

    public function update($id, Request $request): RedirectResponse
    {
        if ($id && ($request->title || $request->category || $request->content)) {

            $article = Article::findOrFail($id);

            $request->title && $article->title = $request->title;
            $request->category && $article->category = $request->category;
            $request->content && $article->content = $request->content;
            $article->save();
        }

        return Redirect::route('article.edit', [$id]);
    }

    public function destroy($id): RedirectResponse
    {
        $article = Article::findOrFail($id);
        $article->delete();

        return Redirect::to('/dashboard');
    }

}

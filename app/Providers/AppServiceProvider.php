<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // $this->app->bind('path.public', function() {
        //     return base_path().'/public';
        // });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //if (config('app.env') === 'production') {
            URL::forceScheme('https');
        //}
    }
}

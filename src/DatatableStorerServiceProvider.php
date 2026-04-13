<?php

namespace SmartDev\DatatableStorer;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class DatatableStorerServiceProvider extends ServiceProvider
{
    public function boot()
    {
        // Load Migrations
        $this->loadMigrationsFrom(__DIR__.'/database/migrations');
        // Load Views from the package
        $this->loadViewsFrom(__DIR__.'/resources/views', 'datatable-storer');

        // Allow publishing the JS file to the public folder
        $this->publishes([
            __DIR__.'/resources/js' => public_path('vendor/datatable-storer'),
        ], 'datatable-storer-assets');

        // Load Routes
        $this->registerRoutes();
    }

    protected function registerRoutes()
    {
        Route::group([
            'prefix' => 'datatable-storer',
            'middleware' => ['web', 'auth'], // Adjust based on preference
        ], function () {
            Route::post('/save-state', [Http\Controllers\StateController::class, 'store'])->name('datatable-storer.save');
        });
    }

    public function register()
    {
        //
    }
}
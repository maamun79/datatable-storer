<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('table_settings', function (Blueprint $column) {
            $column->id();
            $column->unsignedBigInteger('user_id')->nullable(); // Nullable for global/admin settings
            $column->string('table_identifier')->index();
            $column->json('settings'); 
            $column->timestamps();

            $column->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('table_settings');
    }
};
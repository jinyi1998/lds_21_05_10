<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddAdminRoleUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function($table) {
            $table->boolean('is_admin')->default(0);
        });

        DB::table('users')
        ->where('id', 1)
        ->update(['is_admin' => 1]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::table('users', function($table) {
            $table->dropColumn('is_admin');
        });
    }
}

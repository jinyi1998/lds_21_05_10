<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InitTaxonomyCategoryData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        DB::table("taxonomy_category")->insert([
            [
                "name"=> "Dicrected Learning",
                "description" => "",
                "sequence" => 1,
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "name"=> "Exploratory Learning",
                "description" => "",
                "sequence" => 2,
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "name"=> "Productive Learning",
                "description" => "",
                "sequence" => 3,
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "name"=> "Reflective Learning",
                "description" => "",
                "sequence" => 4,
                "created_by" => 1,
                "updated_by" => 1
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        DB::table("taxonomy_category")->delete();
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InitTaxonomyCategoryTasktypeRelationData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        DB::table("taxonomy_category_tasktype_relation")->insert([
            //#region 1
            [
                "task_type_id" => 1,
                "taxonomy_category_id" => 1,
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "task_type_id" => 4,
                "taxonomy_category_id" => 1,
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "task_type_id" => 11,
                "taxonomy_category_id" => 1,
                "created_by" => 1,
                "updated_by" => 1
            ],
            //#endregion


             //#region 2
             [
                "task_type_id" => 5,
                "taxonomy_category_id" => 2,
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "task_type_id" => 2,
                "taxonomy_category_id" => 2,
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "task_type_id" => 8,
                "taxonomy_category_id" => 2,
                "created_by" => 1,
                "updated_by" => 1
            ],
            //#endregion

             //#region 3
             [
                "task_type_id" => 3,
                "taxonomy_category_id" => 3,
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "task_type_id" => 12,
                "taxonomy_category_id" => 3,
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "task_type_id" => 10,
                "taxonomy_category_id" => 3,
                "created_by" => 1,
                "updated_by" => 1
            ],
            //#endregion


             //#region 4
             [
                "task_type_id" => 9,
                "taxonomy_category_id" => 4,
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "task_type_id" => 7,
                "taxonomy_category_id" => 4,
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "task_type_id" => 6,
                "taxonomy_category_id" => 4,
                "created_by" => 1,
                "updated_by" => 1
            ],
            //#endregion
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
        DB::table("taxonomy_category_tasktype_relation")->delete();
    }
}

<?php

use Illuminate\Database\Seeder;

class RelationalTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //component pattern init data 
        DB::table('component_pattern_template_relational')->insert([
            //1
            [
                'component_id' => 1,
                'pattern_id' => 1,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_id' => 1,
                'pattern_id' => 2,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //2
            [
                'component_id' => 2,
                'pattern_id' => 3,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //3
            [
                'component_id' => 3,
                'pattern_id' => 4,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //4
            [
                'component_id' => 4,
                'pattern_id' => 5,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_id' => 4,
                'pattern_id' => 6,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //5
            [
                'component_id' => 5,
                'pattern_id' => 7,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //6
            [
                'component_id' => 6,
                'pattern_id' => 8,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //7
            [
                'component_id' => 7,
                'pattern_id' => 9,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //8
            [
                'component_id' => 8,
                'pattern_id' => 10,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //9
            [
                'component_id' => 9,
                'pattern_id' => 11,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //10
            [
                'component_id' => 10,
                'pattern_id' => 12,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
        
        //component outcome init data
        DB::table('component_outcome_template_relational')->insert([
            //1
            [
                'component_id' => 1,
                'outcome_id' => 1,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_id' => 1,
                'outcome_id' => 2,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_id' => 1,
                'outcome_id' => 3,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //2
            [
                'component_id' => 2,
                'outcome_id' => 4,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_id' => 2,
                'outcome_id' => 5,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //3
            [
                'component_id' => 3,
                'outcome_id' => 6,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_id' => 3,
                'outcome_id' => 7,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //4
            [
                'component_id' => 4,
                'outcome_id' => 8,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_id' => 4,
                'outcome_id' => 9,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //5
            [
                'component_id' => 5,
                'outcome_id' => 10,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_id' => 5,
                'outcome_id' => 11,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //6
            [
                'component_id' => 6,
                'outcome_id' => 12,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_id' => 6,
                'outcome_id' => 13,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_id' => 6,
                'outcome_id' => 3,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //7
            [
                'component_id' => 7,
                'outcome_id' => 14,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_id' => 7,
                'outcome_id' => 3,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //8
            [
                'component_id' => 8,
                'outcome_id' => 15,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_id' => 8,
                'outcome_id' => 5,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //9
            [
                'component_id' => 9,
                'outcome_id' => 16,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_id' => 9,
                'outcome_id' => 7,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //10
            [
                'component_id' => 10,
                'outcome_id' => 17,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_id' => 10,
                'outcome_id' => 9,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_id' => 10,
                'outcome_id' => 11,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);

        //pattern task init data
        DB::table('pattern_task_template_relational')->insert([
            // 1
            [
                'pattern_id' => 1,
                'task_id' => 1,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 1,
                'task_id' => 2,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 1,
                'task_id' => 3,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 1,
                'task_id' => 4,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //2
            [
                'pattern_id' => 2,
                'task_id' => 5,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 2,
                'task_id' => 6,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 2,
                'task_id' => 7,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 2,
                'task_id' => 8,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //3
            [
                'pattern_id' => 3,
                'task_id' => 9,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 3,
                'task_id' => 10,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 3,
                'task_id' => 11,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 3,
                'task_id' => 12,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 3,
                'task_id' => 13,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //4
            [
                'pattern_id' => 4,
                'task_id' => 14,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 4,
                'task_id' => 15,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 4,
                'task_id' => 16,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 4,
                'task_id' => 17,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //5
            [
                'pattern_id' => 5,
                'task_id' => 18,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 5,
                'task_id' => 19,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 5,
                'task_id' => 20,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //6
            [
                'pattern_id' => 6,
                'task_id' => 21,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 6,
                'task_id' => 22,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 6,
                'task_id' => 23,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //7
            [
                'pattern_id' => 7,
                'task_id' => 24,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 7,
                'task_id' => 25,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 7,
                'task_id' => 26,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 7,
                'task_id' => 27,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //8
            [
                'pattern_id' => 8,
                'task_id' => 28,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 8,
                'task_id' => 29,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 8,
                'task_id' => 30,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 8,
                'task_id' => 31,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //9
            [
                'pattern_id' => 9,
                'task_id' => 32,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 9,
                'task_id' => 33,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 9,
                'task_id' => 34,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 9,
                'task_id' => 35,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 9,
                'task_id' => 36,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //10
            [
                'pattern_id' => 10,
                'task_id' => 37,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 10,
                'task_id' => 38,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 10,
                'task_id' => 39,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 10,
                'task_id' => 40,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //11
            [
                'pattern_id' => 11,
                'task_id' => 41,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 11,
                'task_id' => 42,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 11,
                'task_id' => 43,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 11,
                'task_id' => 44,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 11,
                'task_id' => 45,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 11,
                'task_id' => 46,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //12
            [
                'pattern_id' => 12,
                'task_id' => 47,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 12,
                'task_id' => 48,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 12,
                'task_id' => 49,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 12,
                'task_id' => 50,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pattern_id' => 12,
                'task_id' => 51,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);

        DB::table('designtype_component_template_relational')->insert([
            //1
            [
                'designtype_id' => 1,
                'component_id' => 1,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'designtype_id' => 1,
                'component_id' => 2,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'designtype_id' => 1,
                'component_id' => 3,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'designtype_id' => 1,
                'component_id' => 4,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'designtype_id' => 1,
                'component_id' => 5,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            //2
            [
                'designtype_id' => 2,
                'component_id' => 6,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'designtype_id' => 2,
                'component_id' => 7,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'designtype_id' => 2,
                'component_id' => 8,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'designtype_id' => 2,
                'component_id' => 9,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'designtype_id' => 2,
                'component_id' => 10,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}

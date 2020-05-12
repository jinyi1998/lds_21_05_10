<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateLearningTaskTypeOtps extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        $data = [
            [
                'id' => 1,
                'description' => 'Receiving & Interpreting Information',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now(),
                'color' => '#48448a',
            ],
            [
                'id' => 2,
                'description' => 'Explorations through Conversation',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now(),
                'color' => '#91b541',
            ],
            [
                'id' => 3,
                'description' => 'Construction: Conceptual / Visual Artefacts',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now(),
                'color' => '#ff5513',
            ],
            [
                'id' => 4,
                'description' => 'Presentations, Performance Illustrations',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now(),
                'color' => '#ffc500',
            ],
            [
                'id' => 5,
                'description' => 'Information Exploration',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now(),
                'color' => '#4cc981',
            ],
            [
                'id' => 6,
                'description' => 'Self-/Peer-assessment',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now(),
                'color' => '#b759ef',
            ],
            [
                'id' => 7,
                'description' => 'Revision',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now(),
                'color' => '#82009d',
            ],
            [
                'id' => 8,
                'description' => 'Tangible / Immersive Investigation',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now(),
                'color' => '#abd848',
            ],
            [
                'id' => 9,
                'description' => 'Reflection',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now(),
                'color' => '#7f1b72',
            ],
            [
                'id' => 10,
                'description' => 'Presentations, Performance Illustrations',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now(),
                'color' => '#ffc500',
            ],
            [
                'id' => 11,
                'description' => 'Test / Assessment',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now(),
                'color' => '#48aeda',
            ],
            [
                'id' => 12,
                'description' => 'Construction: Tangible / Manipulable Artifacts',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now(),
                'color' => '#ff8d00',
            ]
          
        ];

        foreach($data as $_learningtype){
            if( DB::table('learningTasktypeOpts') ->where('id', $_learningtype['id'])->exists()){
                DB::table('learningTasktypeOpts')
                ->where('id', $_learningtype['id'])
                ->update(['color' => $_learningtype['color'], 'description' => $_learningtype['description']]);
            }else{
                DB::table('learningTasktypeOpts')
                ->insert($_learningtype);
            }        
        }
       


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}

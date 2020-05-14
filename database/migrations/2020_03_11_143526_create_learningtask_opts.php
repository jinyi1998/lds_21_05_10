<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLearningtaskOpts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('classTypeOpts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('description', 100);
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });
        DB::table('classTypeOpts')->insert([
            [
                'description' => 'In Class',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Out Class',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);

        Schema::create('classTargetOpts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('description', 100);
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });
        DB::table('classTargetOpts')->insert([
            [
                'description' => 'Whole Class',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],[
                'description' => 'Group',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],[
                'description' => 'Individual',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);

        Schema::create('learningTasktypeOpts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('description', 100);
            $table->char('color', 100);
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });

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
        DB::table('learningTasktypeOpts')->insert($data);

        Schema::create('classSizeOpts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('description', 100);
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });
        DB::table('classSizeOpts')->insert([
            [
                'description' => 'N/A',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => '6 per group',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => '5 per group',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => '4 per group',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => '3 per group',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => '2 per group',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Individual',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);

        Schema::create('resourceOpts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('description', 100);
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });

        DB::table('resourceOpts')->insert([
            [
                'description' => 'Videos',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Articles',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Worksheets',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Rubrics',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Materials',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Guidelines',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Quiz',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Survey',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);

        Schema::create('elearningtoolOpts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('description', 100);
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });
        DB::table('elearningtoolOpts')->insert([
            [
                'description' => 'Moodle (discussion forum)',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Moodle (wiki)',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Moodle (portfolio)',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Moodle (Polling/ survey)',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Instant messenger',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Video conferencing system',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Google toolkits',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Assignment Submission',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
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
        Schema::dropIfExists('classTypeOpts');
        Schema::dropIfExists('classTargetOpts');
        Schema::dropIfExists('learningTasktypeOpts');
        Schema::dropIfExists('classSizeOpts');
        Schema::dropIfExists('resourceOpts');
        Schema::dropIfExists('elearningtoolOpts');
    }
}

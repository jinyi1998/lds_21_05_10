<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLearningoutcomeTemplate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('learningoutcome_template', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('level', 100);
            $table->integer('outcomeType');
            $table->char('description', 100);
            $table->char('STEMType', 100);
            $table->boolean('isCourseLevel', 100);
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });

        $initData = [
            [
                'id' => 1,
                'level' => 'Apply',
                'outcomeType' => 1,
                'description' => 'Apply design thinking process to plan and create an artifact that solves an authentic problem',
                'STEMType' => 'E',
                'isCourseLevel' => true,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 2,
                'level' => 'Apply',
                'outcomeType' => 3,
                'description' => 'Apply self-directed learning strategies in the learning process and become a self-directed learner',
                'STEMType' => '',
                'isCourseLevel' => true,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 3,
                'level' => 'Apply',
                'outcomeType' => 2,
                'description' => 'Apply scientific investigation process to solve a scientific problem',
                'STEMType' => 'S',
                'isCourseLevel' => true,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 4,
                'level' => 'Apply',
                'outcomeType' => 3,
                'description' => 'Apply self-directed learning strategies in the learning process and become a self-directed learner',
                'STEMType' => '',
                'isCourseLevel' => true,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 5,
                'level' => 'Apply',
                'outcomeType' => 1,
                'description' => 'Empathize with users',
                'STEMType' => 'E',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 6,
                'level' => 'Apply',
                'outcomeType' => 1,
                'description' => 'Define design problems',
                'STEMType' => 'E',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 7,
                'level' => 'Apply',
                'outcomeType' => 3,
                'description' => 'Goal setting',
                'STEMType' => '',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 8,
                'level' => 'Apply',
                'outcomeType' => 1,
                'description' => 'Ideate innovative solutions ',
                'STEMType' => 'E',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 9,
                'level' => 'Apply',
                'outcomeType' => 3,
                'description' => 'Self-planning',
                'STEMType' => '',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 10,
                'level' => 'Apply',
                'outcomeType' => 1,
                'description' => 'Build prototype',
                'STEMType' => 'E',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 11,
                'level' => 'Apply',
                'outcomeType' => 3,
                'description' => 'Self-monitoring',
                'STEMType' => '',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 12,
                'level' => 'Apply',
                'outcomeType' => 1,
                'description' => 'Test solution',
                'STEMType' => 'E',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 13,
                'level' => 'Apply',
                'outcomeType' => 3,
                'description' => 'Self-evaluation',
                'STEMType' => '',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 14,
                'level' => 'Apply',
                'outcomeType' => 3,
                'description' => 'Revision',
                'STEMType' => '',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 15,
                'level' => 'Apply',
                'outcomeType' => 1,
                'description' => 'Gathering observational evidence about the problem(s)',
                'STEMType' => 'S',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 16,
                'level' => 'Apply',
                'outcomeType' => 1,
                'description' => 'Formulate inquiry questions',
                'STEMType' => 'E',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 17,
                'level' => 'Apply',
                'outcomeType' => 3,
                'description' => 'Goal setting',
                'STEMType' => '',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 18,
                'level' => 'Apply',
                'outcomeType' => 1,
                'description' => 'Propose hypothesis',
                'STEMType' => 'S',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 19,
                'level' => 'Apply',
                'outcomeType' => 1,
                'description' => 'Design a fair test',
                'STEMType' => 'S',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 20,
                'level' => 'Apply',
                'outcomeType' => 3,
                'description' => 'Self-planning',
                'STEMType' => '',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 21,
                'level' => 'Apply',
                'outcomeType' => 1,
                'description' => 'Collect evidence',
                'STEMType' => 'S',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 22,
                'level' => 'Apply',
                'outcomeType' => 3,
                'description' => 'Self-monitoring',
                'STEMType' => '',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 23,
                'level' => 'Apply',
                'outcomeType' => 1,
                'description' => 'Scientific reasoning',
                'STEMType' => 'S',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 24,
                'level' => 'Apply',
                'outcomeType' => 3,
                'description' => 'Self-evaluation',
                'STEMType' => '',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 25,
                'level' => 'Apply',
                'outcomeType' => 3,
                'description' => 'Revision',
                'STEMType' => '',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];

        DB::table('learningoutcome_template')->insert($initData);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('learningoutcome_template');
    }
}

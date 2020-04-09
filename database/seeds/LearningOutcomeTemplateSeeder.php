<?php

use Illuminate\Database\Seeder;

class LearningOutcomeTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('learningoutcome_template')->insert([
            [
                'level' => 'level 1',
                'outcomeType' => 1,
                'description' => 'Empathize with users (design thinking)',
                'STEMType' => 'E',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'level' => 'level 1',
                'outcomeType' => 1,
                'description' => 'Define design problems (design thinking)',
                'STEMType' => 'E',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'level' => 'level 1',
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
                'level' => 'level 1',
                'outcomeType' => 1,
                'description' => 'Ideate innovative solutions (design thinking)',
                'STEMType' => 'E',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'level' => '',
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
                'level' => '',
                'outcomeType' => 1,
                'description' => 'Build prototype (design thinking)',
                'STEMType' => 'E',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'level' => '',
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
                'level' => '',
                'outcomeType' => 1,
                'description' => 'Test solution (design thinking)',
                'STEMType' => 'E',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'level' => '',
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
                'level' => '',
                'outcomeType' => 1,
                'description' => 'Test solution (design thinking)',
                'STEMType' => 'E',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'level' => '',
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
                'level' => '',
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
                'level' => '',
                'outcomeType' => 1,
                'description' => 'Formulate inquiry questions',
                'STEMType' => 'S',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'level' => '',
                'outcomeType' => 1,
                'description' => 'Propose hypothesisg',
                'STEMType' => 'S',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'level' => '',
                'outcomeType' => 1,
                'description' => 'Fair test',
                'STEMType' => 'S',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'level' => '',
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
                'level' => '',
                'outcomeType' => 1,
                'description' => 'Reasoning and make claims',
                'STEMType' => 'S',
                'isCourseLevel' => false,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}

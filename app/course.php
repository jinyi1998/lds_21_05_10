<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    //
    protected $table = 'course';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $attributes = [
        'unit_title' => '',
        'level' => '',
        'no_of_lesson' => 1,
        'description' => '',
        'design_type_id' => 1,
    ];

    public function components(){
        return $this->hasManyThrough(
            'App\Component',
            'App\CourseComponentRelation',
            'course_id', //ComponentPatternTemplateRelation compoent id
            'id', // LearningPatternTemplate id
            'id', // component_template id
            'component_id' //LearningPatternTemplate pattern id
        )->with(['tasks', 'outcomes', 'patterns'])->orderBy('sequence');
    }

    public function componentid(){
        return $this->hasMany(
            'App\CourseComponentRelation',
            'course_id'
        )->where('is_deleted', 0)->select(['course_id','component_id']);
    }

    public function outcomes(){
        return $this->hasManyThrough(
            'App\LearningOutcome',
            'App\CourseOutcomeRelation',
            'course_id', //ComponentPatternTemplateRelation compoent id
            'id', // LearningPatternTemplate id
            'id', // component_template id
            'outcome_id' //LearningPatternTemplate pattern id
        );
    }

    public function outcomeid(){
        return $this->hasMany(
            'App\CourseOutcomeRelation',
            'course_id'
        )->where('is_deleted', 0)->select(['course_id','outcome_id']);
    }


    public function lessons(){
        return $this->hasManyThrough(
            'App\Lesson',
            'App\LessonCourseRelation',
            'course_id', //ComponentPatternTemplateRelation compoent id
            'id', // LearningPatternTemplate id
            'id', // component_template id
            'lesson_id' //LearningPatternTemplate pattern id
        )->with(['tasks', 'tasksid']);
    }

    public function lessonid(){
        return $this->hasMany(
            'App\LessonCourseRelation',
            'course_id'
        )->where('is_deleted', 0)->select(['course_id','lesson_id']);
    }
}

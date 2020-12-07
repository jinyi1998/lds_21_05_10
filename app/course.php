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

    protected static function boot() 
    {
      parent::boot();
 
      static::deleting(function($course) {
         foreach ($course->components()->get() as $components) {
            $components->delete();
         }
         foreach ($course->outcomes()->get() as $outcomes) {
            $outcomes->delete();
         }
         foreach ($course->lessons()->get() as $lessons) {
            $lessons->delete();
         }
         foreach ($course->usergroupid()->get() as $usergroupid) {
            $usergroupid->delete();
         }
      });
    }

    public function components(){
        return $this->hasManyThrough(
            'App\Component',
            'App\CourseComponentRelation',
            'course_id', //ComponentPatternTemplateRelation compoent id
            'id', // LearningPatternTemplate id
            'id', // component_template id
            'component_id' //LearningPatternTemplate pattern id
        )->with(['tasks', 'outcomes', 'patterns', 'outcomeid', 'patterntaskid'])->orderBy('sequence');
    }

    public function createdby(){
        return $this->hasOne(
            'App\User',
            'id',
            'created_by'
        );
    }

    public function updatedby(){
        return $this->hasOne(
            'App\User',
            'id',
            'updated_by'
        );
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
        )->orderBy('course_outcome_relation.sequence');
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

    public function usergroupid(){
        return $this->hasMany(
            'App\UsergroupCourseRelation',
            'course_id'
        )->select(['usergroup_id', 'course_id']);
    }

    public function tagsid(){
        return $this->hasMany(
            'App\CourseTagsRelation',
            'course_id'
        )->where('is_deleted', 0);
    }
    public function tags(){
        return $this->hasManyThrough(
            'App\Tags',
            'App\CourseTagsRelation',
            'course_id', //ComponentPatternTemplateRelation compoent id
            'id', // LearningPatternTemplate id
            'id', // component_template id
            'tags_id' //LearningPatternTemplate pattern id
        );
    }
}

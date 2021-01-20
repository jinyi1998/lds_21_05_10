<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    //
    protected $table = 'lesson';
    protected $primaryKey = 'id';
    public $timestamps = true;

    public function tasks(){
        return $this->hasManyThrough(
            'App\LearningTask',
            'App\LessonTaskRelation',
            'lesson_id', //PatternTaskRelation compoent id
            'id', // LearningPattern id
            'id', // component id
            'task_id' //PatternTaskRelation task id
        )->with(['resourceid', 'toolid', 'pattern', 'component', 'lessonid'])->orderBy('lesson_task_relation.sequence');
    }

    public function tasks_analysis(){
        return $this->hasManyThrough(
            'App\LearningTask',
            'App\LessonTaskRelation',
            'lesson_id', //PatternTaskRelation compoent id
            'id', // LearningPattern id
            'id', // component id
            'task_id' //PatternTaskRelation task id
        )->with(['resourceid', 'toolid', 'assessment_with_component']);
    }

    public function tasksid(){
        return $this->hasMany(
            'App\LessonTaskRelation',
            'lesson_id'
        )->where('is_deleted', 0)->select(['lesson_id','task_id', 'lessontype', 'starttime']);
    }

    public function courseid(){
        return $this->belongsTo(
            'App\LessonCourseRelation', 
            'id', 
            'lesson_id'
        )->where('is_deleted', 0)->select(['lesson_id','course_id']);
    }
}

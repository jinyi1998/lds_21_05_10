<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Component extends Model
{
    //
    protected $table = 'component';
    protected $primaryKey = 'id';
    public $timestamps = true;


    //get the retlated pattern id 
    public function patternid(){
        return $this->hasMany(
            'App\ComponentPatternRelation',
            'component_id'
        )->where('is_deleted', 0)->select(['pattern_id','component_id']);
    }

    //get the related pattern details
    public function patterns(){
        return $this->hasManyThrough(
            'App\LearningPattern',
            'App\ComponentPatternRelation',
            'component_id', 
            'id', 
            'id', 
            'pattern_id' 
        )->with(['tasks']);
    }

    public function outcomeid(){
        return $this->hasMany(
            'App\ComponentOutcomeRelation',
            'component_id'
        )->where('is_deleted', 0)->select(['outcome_id','component_id']);
    } 

    public function outcomes(){
        return $this->hasManyThrough(
            'App\LearningOutcome',
            'App\ComponentOutcomeRelation',
            'component_id', //middle retioan table local id
            'id', // target table target id
            'id', // local table local id
            'outcome_id' //middle relation table target id
        );
    }

    public function taskid(){
        return $this->hasMany(
            'App\ComponentTaskRelation',
            'component_id'
        )->where('is_deleted', 0)->select(['task_id','component_id']);
    } 

    public function tasks(){
        return $this->hasManyThrough(
            'App\LearningTask',
            'App\ComponentTaskRelation',
            'component_id', //middle retioan table local id
            'id', // target table target id
            'id', // local table local id
            'task_id' //middle relation table target id
        )->with(["assessment", "assessmentid", "resourceid", "toolid", "componentid"])->orderBy('sequence');
    }

    public function courseid(){
        return $this->belongsTo('App\CourseComponentRelation', 'id', 'component_id');
    }

}

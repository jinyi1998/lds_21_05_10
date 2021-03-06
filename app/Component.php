<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Component extends Model
{
    //
    protected $table = 'component';
    protected $primaryKey = 'id';
    public $timestamps = true;


    protected static function boot() 
    {
      parent::boot();
 
      static::deleting(function($components) {
         foreach ($components->outcomes()->get() as $outcomes) {
            $outcomes->delete();
         }
         foreach ($components->patterns()->get() as $patterns) {
            $patterns->delete();
         }
         foreach ($components->tasks()->get() as $tasks) {
            $tasks->delete();
         }
      });
    }

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
            'App\ComponentPatternTaskRelation',
            'component_id', 
            'id', 
            'id', 
            'pattern_id' 
        )->with(['tasks'])->orderBy('component_pattern_task_relation.sequence');
    }

    public function outcomeid(){
        return $this->hasMany(
            'App\ComponentOutcomeRelation',
            'component_id'
        )->where('is_deleted', 0)->orderBy('component_outcome_relational.sequence');
    } 

    public function outcomes(){
        return $this->hasManyThrough(
            'App\LearningOutcome',
            'App\ComponentOutcomeRelation',
            'component_id', //middle retioan table local id
            'id', // target table target id
            'id', // local table local id
            'outcome_id' //middle relation table target id
        )->with(['unit_outcomeid'])->orderBy('component_outcome_relational.sequence');
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
            'App\ComponentPatternTaskRelation',
            'component_id', //middle retioan table local id
            'id', // target table target id
            'id', // local table local id
            'task_id' //middle relation table target id
        )->with(["assessment", "assessmentid", "resourceid", "toolid", "componentid", "motivatorid", "feedbackid"])->orderBy('component_pattern_task_relation.sequence');
    }
    public function patterntaskid(){
        return $this->hasMany(
            'App\ComponentPatternTaskRelation',
            'component_id'
        )->where('is_deleted', 0)->select(['task_id','component_id', 'pattern_id', 'sequence'])->orderBy('sequence');
    } 


    public function courseid(){
        return $this->belongsTo('App\CourseComponentRelation', 'id', 'component_id');
    }

}

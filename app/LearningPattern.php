<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LearningPattern extends Model
{
    //
    protected $table = 'learningpattern';
    protected $primaryKey = 'id';
    public $timestamps = true;

     /**
   * Override parent boot and Call deleting event
   *
   * @return void
   */
   protected static function boot() 
   {
     parent::boot();

     static::deleting(function($patterns) {
        foreach ($patterns->tasks()->get() as $tasks) {
           $tasks->delete();
        }
     });
   }


    public function tasks(){
        return $this->hasManyThrough(
            'App\LearningTask',
            'App\PatternTaskRelation',
            'pattern_id', //PatternTaskRelation compoent id
            'id', // LearningPattern id
            'id', // component id
            'task_id' //PatternTaskRelation task id
        )->with(["assessmentid", "resourceid", "toolid", 'assessment', 'patternid'])->orderBy('sequence');
    }

    public function tasksid(){
        return $this->hasMany(
            'App\PatternTaskRelation',
            'pattern_id'
        )->where('is_deleted', 0)->select(['pattern_id','task_id']);
    }

    public function componentid(){
        return $this->belongsTo('App\ComponentPatternTaskRelation', 'id', 'pattern_id');
    }

    public function component(){
        return $this->hasOneThrough(
            'App\Component',
            'App\ComponentPatternTaskRelation',
            'pattern_id', 
            'id',
            'id', 
            'component_id' 
        );
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LearningPattern extends Model
{
    //
    protected $table = 'learningpattern';
    protected $primaryKey = 'id';
    public $timestamps = true;

    public function tasks(){
        return $this->hasManyThrough(
            'App\LearningTask',
            'App\PatternTaskRelation',
            'pattern_id', //PatternTaskRelation compoent id
            'id', // LearningPattern id
            'id', // component id
            'task_id' //PatternTaskRelation task id
        )->with(["assessmentid", "resourceid", "toolid", 'assessment'])->orderBy('sequence');
    }

    public function tasksid(){
        return $this->hasMany(
            'App\PatternTaskRelation',
            'pattern_id'
        )->where('is_deleted', 0)->select(['pattern_id','task_id']);
    }

    public function componentid(){
        return $this->belongsTo('App\ComponentPatternRelation', 'id', 'pattern_id');
    }

    public function component(){
        return $this->hasOneThrough(
            'App\Component',
            'App\ComponentPatternRelation',
            'pattern_id', 
            'id',
            'id', 
            'component_id' 
        );
    }
}

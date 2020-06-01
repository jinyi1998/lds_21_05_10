<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LearningOutcome extends Model
{
    //
    protected $table = 'learningoutcome';
    protected $primaryKey = 'id';
    public $timestamps = true;
    public $with = ['componentid', 'courseid'];

    public function component(){
        return $this->hasManyThrough(
            'App\Component',
            'App\ComponentOutcomeRelation',
            'outcome_id', //middle retioan table local id
            'id', // target table target id
            'id', // local table local id
            'component_id' //middle relation table target id
        );
    }

    public function componentid(){
        return $this->hasMany('App\ComponentOutcomeRelation', 'outcome_id', 'id');
    }

    public function courseid(){
        return $this->belongsTo('App\CourseOutcomeRelation', 'id', 'outcome_id');
    }

    public function unit_outcomeid(){
        return $this->hasOne('App\LearningOutcomeCLOULORelation', 'component_outcomeid');
    }

    public function component_outcomeid(){
        return $this->hasMany('App\LearningOutcomeCLOULORelation', 'unit_outcomeid');
    }
}

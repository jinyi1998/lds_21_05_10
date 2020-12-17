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

    public function lo_outcome_id(){
        //parent lo
        return $this->hasOne('App\LearningOutcomeCLOULORelation', 'component_outcomeid');
    }

     public function lo_outcome(){
        return $this->hasOneThrough(
            'App\LearningOutcome',
            'App\LearningOutcomeCLOULORelation',
            'component_outcomeid', //middle retioan table local id
            'id', // target table target id
            'id', // local table local id
            'unit_outcomeid' //middle relation table target id
        );
    }

    public function slo_outcome_id(){
        //child lo
        return $this->hasMany('App\LearningOutcomeCLOULORelation', 'unit_outcomeid');
    }

    public function slo_outcome(){
        return $this->hasManyThrough(
            'App\LearningOutcome',
            'App\LearningOutcomeCLOULORelation',
            'unit_outcomeid', //middle retioan table local id
            'id', // target table target id
            'id', // local table local id
            'component_outcomeid' //middle relation table target id
        );
    }

    public function stemtypesid(){
        return $this->hasMany('App\LearningOutcomeSTEMRelation', 'outcome_id');
    }
}

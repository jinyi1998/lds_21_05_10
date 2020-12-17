<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class LearningOutcomeTemplate extends Model
{
    //
    protected $table = 'learningoutcome_template';
    protected $primaryKey = 'id';
    public $timestamps = true;

    public function unit_outcomeid_temp(){
        return $this->belongsTo('App\LearningOutcomeCLOULOTemplateRelation', 'id', 'component_outcome_id');
    }

    public function componentid(){
        return $this->hasMany('App\ComponentOutcomeTemplateRelation', 'outcome_id');
    }

    public function designtypeid(){
        return $this->belongsTo('App\DesigntypeOutcomeTempRelation', 'id', 'outcome_id');
    }

    public function stemtypesid(){
        return $this->hasMany('App\LearningOutcomeTemplateSTEMRelation', 'outcome_id');
    }

    public function lo_outcome_id(){
        //parent lo
        return $this->hasOne('App\LearningOutcomeCLOULOTemplateRelation', 'component_outcome_id');
    }

     public function lo_outcome(){
        return $this->hasOneThrough(
            'App\LearningOutcomeTemplate',
            'App\LearningOutcomeCLOULOTemplateRelation',
            'component_outcome_id', //middle retioan table local id
            'id', // target table target id
            'id', // local table local id
            'unit_outcome_id' //middle relation table target id
        );
    }

    public function slo_outcome_id(){
        //child lo
        return $this->hasMany('App\LearningOutcomeCLOULOTemplateRelation', 'unit_outcome_id');
    }

    public function slo_outcome(){
        return $this->hasManyThrough(
            'App\LearningOutcomeTemplate',
            'App\LearningOutcomeCLOULOTemplateRelation',
            'unit_outcome_id', //middle retioan table local id
            'id', // target table target id
            'id', // local table local id
            'component_outcome_id' //middle relation table target id
        )->with(['componentid']);
    }
}

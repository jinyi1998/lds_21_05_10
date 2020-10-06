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
        return $this->hasMany('App\ComponentOutcomeTemplateRelation', 'outcome_id', 'id');
    }

    public function designtypeid(){
        return $this->belongsTo('App\DesigntypeOutcomeTempRelation', 'id', 'outcome_id');
    }
}

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
        return $this->belongsTo('App\LearningOutcomeCLOULOTemplateRelation', 'id', 'component_outcomeid');
    }
}

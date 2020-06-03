<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ComponentTemplate extends Model
{
    //
    protected $table = 'component_template';
    protected $primaryKey = 'id';
    public $timestamps = true;

    public function patterns(){
        return $this->hasManyThrough(
            'App\LearningPatternTemplate',
            'App\ComponentPatternTemplateRelation',
            'component_id', //ComponentPatternTemplateRelation compoent id
            'id', // LearningPatternTemplate id
            'id', // component_template id
            'pattern_id' //LearningPatternTemplate pattern id
        )->with(['tasks']);
    }

    public function outcomes(){
        return $this->hasManyThrough(
            'App\LearningOutcomeTemplate',
            'App\ComponentOutcomeTemplateRelation',
            'component_id', //middle retioan table local id
            'id', // target table target id
            'id', // local table local id
            'outcome_id' //middle relation table target id
        )->with(['unit_outcomeid_temp']);
    }
}

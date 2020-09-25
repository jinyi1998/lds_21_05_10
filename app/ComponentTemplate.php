<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ComponentTemplate extends Model
{
    //
    protected $table = 'component_template';
    protected $primaryKey = 'id';
    public $timestamps = true;

    public function patternid(){
        return $this->hasMany('App\ComponentPatternTemplateRelation', 'component_id');
    }

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

    public function tasks(){
        return $this->hasManyThrough(
            'App\LearningTaskTemplate',
            'App\ComponentTaskTemplateRelation',
            'component_id', //ComponentPatternTemplateRelation compoent id
            'id', // LearningPatternTemplate id
            'id', // component_template id
            'task_id' //LearningPatternTemplate pattern id
        )->with(['assessmentid', 'toolid', 'resourceid', 'componentid'])->orderBy('sequence');
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

    public function instructions(){
        return $this->hasManyThrough(
            'App\ComponentInstruction',
            'App\ComponentComponentInstructionRelation',
            'component_id', //middle retioan table local id
            'id', // target table target id
            'id', // local table local id
            'component_instruction_id' //middle relation table target id
        );
    }
}

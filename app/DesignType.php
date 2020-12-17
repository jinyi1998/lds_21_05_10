<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DesignType extends Model
{
    //
    protected $table = 'design_type';
    protected $primaryKey = 'id';
    protected $fillable = ['name', 'description', 'hint', 'media','created_by', 'updated_by', 'is_deleted'];
    public $timestamps = true;

    public function componentsid(){
        return $this->hasMany(
            'App\DesignTypeComponentTemplateRelation',
            'designtype_id'
        )->select(['designtype_id', 'component_id']);
    }

    public function outcomes(){
        return $this->hasManyThrough(
            'App\LearningOutcomeTemplate',
            'App\DesigntypeOutcomeTempRelation',
            'designtype_id', //ComponentPatternTemplateRelation compoent id
            'id', // LearningPatternTemplate id
            'id', // component_template id
            'outcome_id' //LearningPatternTemplate pattern id
        )->select(['learningoutcome_template.*','learningoutcome_template.id as template_id'])->with(['stemtypesid', 'slo_outcome', 'componentid']);
    }

    public function components(){
        return $this->hasManyThrough(
            'App\ComponentTemplate',
            'App\DesignTypeComponentTemplateRelation',
            'designtype_id', //ComponentPatternTemplateRelation compoent id
            'id', // LearningPatternTemplate id
            'id', // component_template id
            'component_id' //LearningPatternTemplate pattern id
        )->select(['component_template.*','component_template.id as template_id'])->with(['instructions']);
    }

    public function instructions(){
        return $this->hasManyThrough(
            'App\DesigntypeInstruction',
            'App\DesigntypeInstructionRelation',
            'designtype_id', 
            'id',
            'id',
            'designtype_instruction_id'
        )->orderBy('designtype_instruction_relation.sequence')->with(['designtypeid']);
    }

    public function createdby(){
        return $this->hasOne(
            'App\User',
            'id',
            'created_by'
        );
    }

    public function updatedby(){
        return $this->hasOne(
            'App\User',
            'id',
            'updated_by'
        );
    }

}

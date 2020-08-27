<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DesignTypeComponentTemplateRelation;

class DesignType extends Model
{
    //
    protected $table = 'design_type';
    protected $primaryKey = 'id';
    public $timestamps = true;

    public function componentsid(){
        return $this->hasMany(
            'App\DesignTypeComponentTemplateRelation',
            'designtype_id'
        )->select(['designtype_id', 'component_id']);
    }

    public function outcomes(){
        // return $this->hasMany(
        //     'App\DesigntypeOutcomeTempRelation',
        //     'designtype_id'
        // )->select(['designtype_id', 'outcome_id']);
        return $this->hasManyThrough(
            'App\LearningOutcomeTemplate',
            'App\DesigntypeOutcomeTempRelation',
            'designtype_id', //ComponentPatternTemplateRelation compoent id
            'id', // LearningPatternTemplate id
            'id', // component_template id
            'outcome_id' //LearningPatternTemplate pattern id
        )->select(['learningoutcome_template.*','learningoutcome_template.id as template_id']);
    }

    public function components(){
        // return $this->hasMany(
        //     'App\DesigntypeOutcomeTempRelation',
        //     'designtype_id'
        // )->select(['designtype_id', 'outcome_id']);
        return $this->hasManyThrough(
            'App\ComponentTemplate',
            'App\DesignTypeComponentTemplateRelation',
            'designtype_id', //ComponentPatternTemplateRelation compoent id
            'id', // LearningPatternTemplate id
            'id', // component_template id
            'component_id' //LearningPatternTemplate pattern id
        )->select(['component_template.*','component_template.id as template_id']);
    }
}
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LearningTaskTemplate extends Model
{
    //
    protected $table = 'learningtask_template';
    protected $primaryKey = 'id';
    public $timestamps = true;
     /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    // protected $with = ['type', 'classType', 'classTarget', 'classSize'];

    public function type(){
        return $this->hasOne('App\LearningTasktypeOpts', 'id');
    }

    public function classType(){
        return $this->hasOne('App\ClassTypeOpts', 'id');
    }

    public function classTarget(){
        return $this->hasOne('App\ClassTargetOpts', 'id');
    }

    public function classSize(){
        return $this->hasOne('App\ClassSizeOpts', 'id');
    }

    public function assessment(){
        return $this->hasManyThrough(
            'App\LearningOutcomeTemplate',
            'App\TaskTemplateAssessmentRelation',
            'learningtask_id', //middle retioan table local id
            'id', // target table target id
            'id', // local table local id
            'learningoutcome_id' //middle relation table target id
        );
    }


    public function assessmentid(){
        return $this->hasMany(
            'App\TaskTemplateAssessmentRelation',
            'learningtask_id'
        )->where('is_deleted', 0)->select(['learningtask_id','learningoutcome_id']);
    }

    public function resourceid(){
        return $this->hasMany(
            'App\TaskTemplateResourceRelation',
            'learningtask_id'
        )->where('is_deleted', 0)->select(['learningtask_id','resource_id']);
    }

    public function toolid(){
        return $this->hasMany(
            'App\TaskTemplateToolRelation',
            'learningtask_id'
        )->where('is_deleted', 0)->select(['learningtask_id','elearningtool_id']);
    }
    // public function type(){
    //     return $this->hasOne('App\getLearningTaskType');
    // }
    // public function type(){
    //     return $this->hasOne('App\ClassTypeOpts');
    // }
}

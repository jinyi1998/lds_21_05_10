<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LearningPatternTemplate extends Model
{
    //
    protected $table = 'learningpatteren_template';
    protected $primaryKey = 'id';
    public $timestamps = true;

    public function tasks(){
        return $this->hasManyThrough(
            'App\LearningTaskTemplate',
            'App\PatternTaskTemplateRelation',
            'pattern_id', //PatternTaskTemplateRelation compoent id
            'id', // LearningPatternTemplate id
            'id', // component_template id
            'task_id' //PatternTaskTemplateRelation task id
        )->with(['assessmentid', 'toolid', 'resourceid', 'patternid'])->orderBy('sequence');
    }


    public function tasksid(){
        return $this->belongsTo('App\PatternTaskTemplateRelation', 'id','pattern_id');
    }

    public function componentsid(){
        return $this->belongsTo('App\ComponentPatternTemplateRelation', 'id','pattern_id');
    }

}

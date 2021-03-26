<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LearningPatternTemplate extends Model
{
    //
    protected $table = 'learningpattern_template';
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
        )->with(["assessmentid", "resourceid", "toolid", 'patternid',  "motivatorid", "feedbackid"])->orderBy('sequence');
    }


    public function tasksid(){
        return $this->belongsTo('App\PatternTaskTemplateRelation', 'id','pattern_id');
    }

    public function componentsid(){
        return $this->hasMany('App\ComponentPatternTemplateRelation', 'pattern_id');
    }

    public function patternbinsid(){
        return $this->hasMany('App\PatternBinPatternRelation', 'pattern_id');
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

    public function tagsid(){
        return $this->hasMany(
            'App\PatternTempTagsRelation',
            'pattern_id'
        )->where('is_deleted', 0);
    }
    public function tags(){
        return $this->hasManyThrough(
            'App\Tags',
            'App\PatternTempTagsRelation',
            'pattern_id', //ComponentPatternTemplateRelation compoent id
            'id', // LearningPatternTemplate id
            'id', // component_template id
            'tags_id' //LearningPatternTemplate pattern id
        )->select(['name']);
    }

}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PatternBin extends Model
{
    //
    protected $table = 'patternbin';
    protected $primaryKey = 'id';
    protected $fillable = ['name', 'created_by', 'updated_by', 'created_at', 'updated_at', 'is_deleted'];
    public $timestamps = true;

    public function patterns(){
        return $this->hasManyThrough(
            'App\LearningPatternTemplate',
            'App\PatternBinPatternRelation',
            'patternbin_id', //PatternTaskTemplateRelation compoent id
            'id', // LearningPatternTemplate id
            'id', // component_template id
            'pattern_id' //PatternTaskTemplateRelation task id
        );
    }

    public function patternsid(){
        return $this->hasMany('App\PatternBinPatternRelation', 'patternbin_id');
    }

    // public function patternbin_category(){
    //     return $this->belongsTo('App\PatternTaskTemplateRelation', 'id','pattern_id');
    // }

    public function patternbin_categoryid(){
        return $this->belongsTo('App\PatternBinCategoryRelation', 'id','patternbin_id');
    }
}

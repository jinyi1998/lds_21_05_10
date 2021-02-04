<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TaxonomyCategory extends Model
{
    //
    protected $table = 'taxonomy_category';
    protected $primaryKey = 'id';
    public $timestamps = true;

    public function tasktype(){
        return $this->hasManyThrough(
            'App\LearningTasktypeOpts',
            'App\TaxonomyCategoryTasktypeRelation',
            'taxonomy_category_id', 
            'id', 
            'id', 
            'task_type_id'
        )->orderBy('learningTasktypeOpts.sequence');
    }


    public function tasktypeid(){
        return $this->hasMany(
            'App\TaxonomyCategoryTasktypeRelation',
            'taxonomy_category_id'
        )->where('is_deleted', 0)->select(['taxonomy_category_id','task_type_id']);
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

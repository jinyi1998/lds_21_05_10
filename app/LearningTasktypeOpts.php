<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LearningTasktypeOpts extends Model
{
    //
    protected $table = 'learningTasktypeOpts';
    protected $primaryKey = 'id';
    public $timestamps = true;

    public function category(){
        return $this->hasOneThrough(
            'App\TaxonomyCategory',
            'App\TaxonomyCategoryTasktypeRelation',
            'task_type_id', 
            'id',
            'id', 
            'taxonomy_category_id' 
        );
    }

    public function categoryid(){
        return $this->hasOne(
            'App\TaxonomyCategoryTasktypeRelation',
            'task_type_id'
        );
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

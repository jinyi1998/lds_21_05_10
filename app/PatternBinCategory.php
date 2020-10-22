<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PatternBinCategory extends Model
{
    //
    protected $table = 'patternbin_category';
    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $fillable = ['name', 'created_by', 'updated_by', 'is_deleted'];

    public function patternbin(){
        return $this->hasManyThrough(
            'App\PatternBin',
            'App\PatternBinCategoryRelation',
            'patternbin_category_id', //PatternBinCategoryRelation category id
            'id', // patternbin_category id
            'id', // PatternBin id
            'patternbin_id' //PatternBinCategoryRelation pattern bin id
        );
    }

    public function patternbinid(){
        return $this->hasMany('App\PatternBinCategoryRelation', 'patternbin_category_id');
    }

    public function createdby(){
        return $this->hasOne('App\User', 'id','created_by');
    }

    public function updatedby(){
        return $this->hasOne('App\User', 'id','updated_by');
    } 
}

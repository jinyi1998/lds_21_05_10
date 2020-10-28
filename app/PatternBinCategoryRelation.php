<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PatternBinCategoryRelation extends Model
{
    //
    protected $table = 'patternbin_category_relation';
    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $fillable = ['patternbin_id', 'patternbin_category_id', 'created_by', 'updated_by', 'is_deleted'];
}

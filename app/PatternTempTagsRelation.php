<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PatternTempTagsRelation extends Model
{
    //
    protected $table = 'patterntemp_tags_relation';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [ 'pattern_id', 'tags_id', 'created_by', 'updated_by', 'is_deleted'];
}

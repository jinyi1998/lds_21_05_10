<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PatternBinPatternRelation extends Model
{
    //
    protected $table = 'patternbin_pattern_relation';
    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $fillable = ['patternbin_id', 'pattern_id', 'sequence', 'created_by', 'updated_by', 'is_deleted'];
}

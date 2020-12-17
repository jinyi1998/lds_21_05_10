<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BloomTaxonomyLevelVerbRelation extends Model
{
    //
    protected $table = 'bloom_taxonomy_level_verb_relation';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = ['bloom_taxonomy_level_id', 'bloom_taxonomy_verb_id', 'created_by', 'updated_by', 'is_deleted'];
}

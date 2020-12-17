<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BloomTaxonomyLevel extends Model
{
    //
    protected $table = 'bloom_taxonomy_level';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = ['name', 'level', 'created_by', 'updated_by', 'is_deleted', 'sequence'];

    public function verbs(){
        return $this->hasManyThrough(
            'App\BloomTaxonomyVerb',
            'App\BloomTaxonomyLevelVerbRelation',
            'bloom_taxonomy_level_id', 
            'id', 
            'id',
            'bloom_taxonomy_verb_id'
        );
    }
}

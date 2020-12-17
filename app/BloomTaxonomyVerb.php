<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BloomTaxonomyVerb extends Model
{
    //
    protected $table = 'bloom_taxonomy_verb';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = ['name', 'created_by', 'updated_by', 'is_deleted', 'sequence'];
}

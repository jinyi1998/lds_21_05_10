<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DesigntypeOutcomeTempRelation extends Model
{
    //
    protected $table = 'designtype_outcome_template_relation';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [ 'designtype_id', 'outcome_id', 'created_by', 'updated_by', 'is_deleted'];
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DesigntypeInstructionRelation extends Model
{
    //
    protected $table = 'designtype_instruction_relation';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [ 'designtype_id', 'designtype_instruction_id', 'sequence', 'created_by', 'updated_by', 'is_deleted'];
}

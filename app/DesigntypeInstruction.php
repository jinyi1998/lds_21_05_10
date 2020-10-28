<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DesigntypeInstruction extends Model
{
    //
    protected $table = 'designtype_instruction';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [ 'title', 'media', 'description', 'created_by', 'updated_by', 'is_deleted'];


    public function designtypeid(){
        return $this->belongsTo('App\DesigntypeInstructionRelation', 'id','designtype_instruction_id');
    }
}
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MoodleMod extends Model
{
    //
    protected $table = 'moodle_mod';
    protected $primaryKey = 'id';
    protected $fillable = ['name', 'name_moodle', 'created_by', 'updated_by', 'created_at', 'updated_at', 'is_deleted'];
    public $timestamps = true;

    public function createdby(){
        return $this->hasOne(
            'App\User',
            'id',
            'created_by'
        );
    }

    public function updatedby(){
        return $this->hasOne(
            'App\User',
            'id',
            'updated_by'
        );
    }
}

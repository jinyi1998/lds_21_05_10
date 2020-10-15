<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClassSizeOpts extends Model
{
    //
    protected $table = 'classSizeOpts';
    protected $primaryKey = 'id';
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

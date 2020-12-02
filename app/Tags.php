<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tags extends Model
{
    //
    protected $table = 'tags';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [ 'name', 'created_by', 'updated_by', 'is_deleted'];
}

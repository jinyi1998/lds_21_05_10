<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usergroup extends Model
{
    //
    protected $table = 'usergroup';
    protected $primaryKey = 'id';
    protected $fillable = ['name', 'description', 'type', 'created_by', 'updated_by', 'is_deleted'];
    public $timestamps = true;

    public function userid(){
        return $this->hasMany(
            'App\UsergroupUserRelation',
            'user_id'
        )->where('is_deleted', 0)->select(['course_id','component_id']);
    }
}

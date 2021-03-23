<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TaskFeedbackRelation extends Model
{
    //
    protected $table = 'learningtask_feedback_relation';
    protected $primaryKey = 'id';
    protected $fillable = ['task_id', 'feedback_id', 'created_by', 'updated_by', 'is_deleted', 'deleted_at'];
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

    public function delete(){
        $this->is_deleted = true;
        $this->delated_at = now();
        $this->save();

        return;
        // return parent::delete();
    }
}

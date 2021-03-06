<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LearningTask extends Model
{
    //
    protected $table = 'learningtask';
    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $fillable = ['title', 'time', 'type', 'class_type', 'target', 'size', 'description', 'created_by', 'updated_by', 'is_deleted'];
     /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    // protected $with = ['type', 'classType', 'classTarget', 'classSize'];

      public static function boot() {
        parent::boot();
        self::deleting(function($task) { // before delete() method call this
             $task->componentid()->each(function($component) {
                $component->delete(); // <-- direct deletion
             });

             $task->resourceid()->each(function($resource) {
                $resource->delete(); // <-- direct deletion
             });

             $task->patternid()->each(function($pattern) {
                $pattern->delete(); // <-- direct deletion
             });

             $task->assessmentid()->each(function($assessment) {
                $assessment->delete(); // <-- direct deletion
             });

             $task->toolid()->each(function($tool) {
                $tool->delete(); // <-- direct deletion
             });
             // do the rest of the cleanup...
        });
    }

    public function type(){
        return $this->hasOne('App\LearningTasktypeOpts', 'id');
    }

    public function classType(){
        return $this->hasOne('App\ClassTypeOpts', 'id');
    }

    public function classTarget(){
        return $this->hasOne('App\ClassTargetOpts', 'id');
    }

    public function classSize(){
        return $this->hasOne('App\ClassSizeOpts', 'id');
    }

    public function lessonid(){
        return $this->belongsTo('App\LessonTaskRelation', 'id','task_id');
    }

    public function pattern(){
        return $this->hasOneThrough(
            'App\LearningPattern',
            'App\PatternTaskRelation',
            'task_id', 
            'id',
            'id', 
            'pattern_id' 
        )->with(['component']);
    }

    public function patternid(){
        return $this->belongsTo('App\PatternTaskRelation', 'id','task_id')->with(['componentid:pattern_id,component_id']);
    }

    public function component(){
        return $this->hasOneThrough(
            'App\Component',
            'App\ComponentPatternTaskRelation',
            'task_id', 
            'id',
            'id', 
            'component_id' 
        );
    }

    public function componentid(){
        return $this->belongsTo('App\ComponentPatternTaskRelation', 'id','task_id');
    }

  

    public function assessment(){
        return $this->hasManyThrough(
            'App\LearningOutcome',
            'App\TaskAssessmentRelation',
            'learningtask_id', //middle retioan table local id
            'id', // target table target id
            'id', // local table local id
            'learningoutcome_id' //middle relation table target id
        );
    }

    public function assessment_with_component(){
        return $this->hasManyThrough(
            'App\LearningOutcome',
            'App\TaskAssessmentRelation',
            'learningtask_id', //middle retioan table local id
            'id', // target table target id
            'id', // local table local id
            'learningoutcome_id' //middle relation table target id
        )->with(['component']);
    }


    public function assessmentid(){
        return $this->hasMany(
            'App\TaskAssessmentRelation',
            'learningtask_id'
        )->where('is_deleted', 0)->select(['learningtask_id','learningoutcome_id']);
    }

    public function resourceid(){
        return $this->hasMany(
            'App\TaskResourceRelation',
            'learningtask_id'
        )->where('is_deleted', 0)->select(['learningtask_id','resource_id'])->with(['moodlemod:moodle_mod_id,name_moodle']);
    }

    public function toolid(){
        return $this->hasMany(
            'App\TaskToolRelation',
            'learningtask_id'
        )->where('is_deleted', 0)->select(['learningtask_id','elearningtool_id'])->with(['moodlemod:moodle_mod_id,name_moodle']);
    }

    public function feedbackid(){
        return $this->hasMany(
            'App\TaskFeedbackRelation',
            'task_id'
        )->where('is_deleted', 0)->select(['task_id','feedback_id']);
    }

    public function motivatorid(){
        return $this->hasMany(
            'App\TaskMotivatorRelation',
            'task_id'
        )->where('is_deleted', 0)->select(['task_id','motivator_id']);
    }
}

<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\LearningOutcome;

class LearningOutcomesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $outcomes = LearningOutcome::All();
        return response()->json($outcomes);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public static function store(Request $request)
    {
        //
        $outcome = new LearningOutcome;
        $outcome = LearningOutcomesController::save($outcome, $request);
        return response()->json($outcome);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $outcome = LearningOutcome::with(['componentid'])->find($id);
        return response()->json($outcome);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $outcome = LearningOutcome::find($id);
        $outcome->level = $request->level;
        $outcome->description = $request->description;
        $outcome->STEMType = $request->STEMType;
        $outcome->isCourseLevel = $request->isCourseLevel;
        $outcome->updated_by = 1;
        $outcome->is_deleted = 0;
        $outcome->updated_at = now();

        if($request->has('component_id')){
            $outcome->componentid()->create([
                'outcome_id' => $pattern->id,
                'component_id' => $request->component_id,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => 0
            ]);
        }

        $outcome->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $outcome = LearningOutcome::find($id);
        $outcome->delete();
        return response()->json("");
    }

    public static function save(LearningOutcome $outcome, Request $request){
        $outcome->level = $request->level;
        $outcome->outcomeType = $request->outcomeType;
        $outcome->description = $request->description;
        $outcome->STEMType = $request->STEMType;
        $outcome->isCourseLevel = $request->isCourseLevel;
        $outcome->created_by = 1;
        $outcome->updated_by = 1;
        $outcome->is_deleted = 0;
        $outcome->created_at = now();
        $outcome->updated_at = now();

        $outcome->save();

        if($request->has('component_id')){
            $outcome->componentid()->create([
                'outcome_id' => $outcome->id,
                'component_id' => $request->component_id,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => 0
            ]);
        }

        if($request->has('course_id') && $outcome->isCourseLevel == true){
            $outcome->courseid()->create([
                'outcome_id' => $outcome->id,
                'course_id' => $request->course_id,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => 0
            ]);
        }   
        return $outcome;
    }

    public function getDefaultOutcomeByLearningType($id){
        $data = [
            "1" => [
                [ 
                    'id' => 1,
                    'level' => "",
                    'outcomeType' => 1,
                    'STEMType' => ["E"],
                    'description' => "Design Thinking",
                    'isCourseLevel' => true
                ],
                [ 
                    'id' => 2,
                    'level' => "",
                    'outcomeType' => 3,
                    'STEMType' => [],
                    'description' => "Communication Skill",
                    'isCourseLevel' => true
                ],
            ],
            "2" => [
                [ 
                    'id' => 1,
                    'level' => "",
                    'outcomeType' => 2,
                    'STEMType' => ["E"],
                    'description' => "learning outcome 1",
                    'isCourseLevel' => true
                ],
                [ 
                    'id' => 2,
                    'level' => "",
                    'outcomeType' => 1,
                    'STEMType' => ["S", "T"],
                    'description' => "learning outcome 2",
                    'isCourseLevel' => true
                ],

            ],
            "3" => [
                [ 
                    'id' => 1,
                    'level' => "",
                    'outcomeType' => 1,
                    'STEMType' => ["E"],
                    'description' => "learning outcome 1",
                    'isCourseLevel' => true
                ],
                [ 
                    'id' => 2,
                    'level' => "",
                    'outcomeType' => 2,
                    'STEMType' => ["S", "T", "E", "M"],
                    'description' => "learning outcome 2",
                    'isCourseLevel' => true
                ],

            ],
            "4" => [
                [ 
                    'id' => 1,
                    'level' => "",
                    'outcomeType' => 1,
                    'STEMType' => ["E"],
                    'description' => "learning outcome 1",
                    'isCourseLevel' => true
                ],
                [ 
                    'id' => 2,
                    'level' => "",
                    'outcomeType' => 2,
                    'STEMType' => [],
                    'description' => "learning outcome 2",
                    'isCourseLevel' => true
                ],
                [ 
                    'id' => 3,
                    'level' => "",
                    'outcomeType' => 3,
                    'STEMType' => [],
                    'description' => "learning outcome 3",
                    'isCourseLevel' => true
                ],
            ]
        ];
        return response()->json($data[$id]);
    }

    public function getLearningOutcomeByComponentTemp($id){
        $data = [
            "1" => [
                [ 
                    'id' => 1,
                    'level' => "",
                    'outcomeType' => 1,
                    'STEMType' => ["E"],
                    'description' => "Empathize with users (design thinking)",
                    'isCourseLevel' => false
                ],
                [ 
                    'id' => 2,
                    'level' => "",
                    'outcomeType' => 1,
                    'STEMType' => ["E"],
                    'description' => "Define design problems (design thinking)",
                    'isCourseLevel' => false
                ],
                [ 
                    'id' => 3,
                    'level' => "",
                    'outcomeType' => 3,
                    'STEMType' => [],
                    'description' => "Goal setting",
                    'isCourseLevel' => false
                ],
            ],
            "2" => [
                [ 
                    'id' => 1,
                    'level' => "",
                    'outcomeType' => 1,
                    'STEMType' => ["E"],
                    'description' => "Ideate innovative solutions (design thinking)",
                    'isCourseLevel' => false
                ],
                [ 
                    'id' => 2,
                    'level' => "",
                    'outcomeType' => 3,
                    'STEMType' => [],
                    'description' => "Self-planning",
                    'isCourseLevel' => false
                ],
            ],
            "3" => [
                [ 
                    'id' => 1,
                    'level' => "",
                    'outcomeType' => 1,
                    'STEMType' => ["E"],
                    'description' => "Build prototype (design thinking)",
                    'isCourseLevel' => false
                ],
                [ 
                    'id' => 2,
                    'level' => "",
                    'outcomeType' => 3,
                    'STEMType' => [],
                    'description' => "Self-monitoring",
                    'isCourseLevel' => false
                ],
            ],
            "4" => [
                [ 
                    'id' => 1,
                    'level' => "",
                    'outcomeType' => 1,
                    'STEMType' => ["E"],
                    'description' => "Test solution (design thinking)",
                    'isCourseLevel' => false
                ],
                [ 
                    'id' => 2,
                    'level' => "",
                    'outcomeType' => 3,
                    'STEMType' => [],
                    'description' => "Self-evaluation",
                    'isCourseLevel' => false
                ],
            ],
            "5" => [
                [ 
                    'id' => 1,
                    'level' => "",
                    'outcomeType' => 1,
                    'STEMType' => ["E"],
                    'description' => "Test solution (design thinking)",
                    'isCourseLevel' => false
                ],
                [ 
                    'id' => 2,
                    'level' => "",
                    'outcomeType' => 3,
                    'STEMType' => [],
                    'description' => "Revision",
                    'isCourseLevel' => false
                ],
            ],
            "6" => [
                [ 
                    'id' => 1,
                    'level' => "",
                    'outcomeType' => 1,
                    'STEMType' => ["S"],
                    'description' => "Gathering observational evidence about the problem(s)",
                    'isCourseLevel' => false
                ],
                [ 
                    'id' => 2,
                    'level' => "",
                    'outcomeType' => 1,
                    'STEMType' => ["S"],
                    'description' => "Formulate inquiry questions",
                    'isCourseLevel' => false
                ],
                [ 
                    'id' => 3,
                    'level' => "",
                    'outcomeType' => 3,
                    'STEMType' => [],
                    'description' => "Goal setting",
                    'isCourseLevel' => false
                ],
            ],
            "7" => [
                [ 
                    'id' => 1,
                    'level' => "",
                    'outcomeType' => 1,
                    'STEMType' => ["S"],
                    'description' => "Propose hypothesis",
                    'isCourseLevel' => false
                ],
                [ 
                    'id' => 2,
                    'level' => "",
                    'outcomeType' => 3,
                    'STEMType' => [],
                    'description' => "Goal setting",
                    'isCourseLevel' => false
                ],
            ],
            "8" => [
                [ 
                    'id' => 1,
                    'level' => "",
                    'outcomeType' => 1,
                    'STEMType' => ["S"],
                    'description' => " Fair test",
                    'isCourseLevel' => false
                ],
                [ 
                    'id' => 2,
                    'level' => "",
                    'outcomeType' => 3,
                    'STEMType' => [],
                    'description' => " Self-planning",
                    'isCourseLevel' => false
                ],
            ],
            "9" => [
                [ 
                    'id' => 1,
                    'level' => "",
                    'outcomeType' => 1,
                    'STEMType' => ["S"],
                    'description' => "Collect evidence",
                    'isCourseLevel' => false
                ],
                [ 
                    'id' => 2,
                    'level' => "",
                    'outcomeType' => 3,
                    'STEMType' => [],
                    'description' => "Self-monitoring",
                    'isCourseLevel' => false
                ],
            ],
            "10" => [
                [ 
                    'id' => 1,
                    'level' => "",
                    'outcomeType' => 1,
                    'STEMType' => ["S"],
                    'description' => "Reasoning and make claims",
                    'isCourseLevel' => false
                ],
                [ 
                    'id' => 2,
                    'level' => "",
                    'outcomeType' => 3,
                    'STEMType' => [],
                    'description' => "Self-evaluation and Revision",
                    'isCourseLevel' => false
                ],
            ],
        ];
        return response()->json(
            $data[$id]
        );

    }

    public function getOutcomeType(){
        //
        return response()->json([
            [
                'id' => 1,
                'description' => 'Disciplinary Knowledge',
                'value' => 1
            ],
            [
                'id' => 2,
                'description' => 'Disciplinary Skills',
                'value' => 2
            ],
            [
                'id' => 3,
                'description' => 'Generic Skills',
                'value' => 3
            ],
           
        ]);
    }

    public function getOutcomeLevel($id = 1){

        switch ($id){
            default:
            case 3:
                return response()->json([
                    [
                        'id' => 1,
                        'description' => 'Pedagogical level 1',
                        'value' => 'PL1'
                    ],
                    [
                        'id' => 2,
                        'description' => 'Pedagogical level 2',
                        'value' => 'PL2'
                    ],
                    [
                        'id' => 3,
                        'description' => 'Pedagogical level 3',
                        'value' => 'PL3'
                    ],
                ]);
                break;
            case 1:
            case 2:
                return response()->json([
                    [
                        'id' => 1,
                        'description' => 'Bloom\'s taxonomy level 1',
                        'value' => 'BT1'
                    ],
                    [
                        'id' => 2,
                        'description' => 'Bloom\'s taxonomy level 2',
                        'value' => 'BT2'
                    ],
                    [
                        'id' => 3,
                        'description' => 'Bloom\'s taxonomy level 3',
                        'value' => 'BT3'
                    ],
                ]);
                break;
        }

    }

    public function getSTEMType(){
        return response()->json([
            '1' => [
                'id' => 1,
                'description' => 'Science',
                'value' => 'S'
            ],
            '2' => [
                'id' => 2,
                'description' => 'Technology',
                'value' => 'T'
            ],
            '3' => [
                'id' => 3,
                'description' => 'Engineering',
                'value' => 'E'
            ],
            '4' => [
                'id' => 3,
                'description' => 'Mathamatics',
                'value' => 'M'
            ],
           
        ]);
    }
}

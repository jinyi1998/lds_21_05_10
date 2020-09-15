<?php

namespace App\Http\Controllers\Auth;

use Auth;
use App\User;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/mydesign';
    protected $redirectAfterLogout = '/mydesign';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }


    public function login(Request $request){
        $input = $request->all();

        $rules = ['email'=>'required|email',
                  'password'=>'required'
                  ];
    
        $validator = Validator::make($input, $rules);
    
        if ($validator->passes()) {
            $attempt = Auth::attempt([
                'email' => $input['email'],
                'password' => $input['password']
            ]);
    
            if ($attempt) {
                $user = User::find(Auth::user()->id);
                $token = $user->createToken('apitoken')->accessToken;
                session(['apitoken' => $token]);
                return redirect('mydesign');
            }
    
            return Redirect::to('login')
                    ->withError('Email or password is wrong. Please try again. =)');
        }
    
        //fails
        return Redirect::to('login')
                    ->withErrors($validator)
                    ->withInput($request->except('password'));
    }

    public function showLoginForm(){
        return view('login'); 
    }

    // protected function authenticated(Request $request, $user){
    //     return redirect('/mydesign');
    // }

    public function logout() {
        Auth::logout();
        return redirect('/login');
    }
}

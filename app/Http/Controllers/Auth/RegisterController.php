<?php

namespace App\Http\Controllers\Auth;

use Auth;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    // protected $redirectTo = '/designstudio';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
            'passwordcomfirm' =>  ['required', 'string', 'min:8', 'same:password'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'school' => $data['school'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }


    public function register(Request $request)
    {
        $validator = $this->validator($request->all());

        if ($validator->fails()) {
            return redirect('register')
                        ->withErrors($validator);
        }else{
            
            $user = $this->create($request->all());

            $attempt = Auth::attempt([
                'email' => $user->email,
                'password' => $request->password
            ]);
    
            if ($attempt) {
                $user = User::find(Auth::user()->id);
                $token = $user->createToken('apitoken')->accessToken;
                session(['apitoken' => $token]);



                $this->guard()->login($user);

                return $this->registered($request, $user)
                    ?: redirect()->intended($this->redirectPath('/designstudio'));
                // $this->guard()->login($user);
                // return redirect()->intended('/designstudio');
                // return Redirect::to('/designstudio' );
            }else{
                 return Redirect::to('login');
            }       

            // $this->guard()->login($user);

            // return $this->registered($request, $user)?redirect('/login'): redirect($this->redirectPath());
        }

    }

    public function showRegistrationForm(){
        return view('register'); 
    }
}

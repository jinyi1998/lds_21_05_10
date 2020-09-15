<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta name="apitoken" content={{session('apitoken')}}>
        <meta name="csrf-token" content="{{ csrf_token() }}">
     
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>LDS K-12 STEM Beta</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <script src="{{ asset('js/app.js') }}"></script>

        <!-- Styles -->
        <style>
            .root {display: 'flex'},
        </style>
    </head>
    <body>
        <div class="root">
            <div class="">
                <div>
                    <div 
                    id= "appcontainer" 
                    data-user = {{ isset($user)? $user : '{}'}}
                    data-courseid = {{ isset($courseid)? $courseid : -1}} 
                    data-design_step = {{ isset($step)? $step : 0 }}
                    data-module = {{ isset($module)? $module : '' }}
                    data-usergroupid = {{ isset($usergroupid)? $usergroupid : '-1' }}
                    >
                    <!-- <?php print_r(session()->all()) ?> -->
                    </div>
                </div>
            </div>
        
        </div>
    </body>
</html>
<script type="text/javascript" src="/js/app.js"> </script>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Confirm Password') }}</div>

                <div class="card-body">
                    {{ __('Please confirm your password before continuing.') }}

                    <form method="POST" action="{{ route('password.confirm') }}">
                        @csrf

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Confirm Password') }}
                                </button>

                                @if (Route::has('password.request'))
                                    <a class="btn btn-link" href="{{ route('password.request') }}">
                                        {{ __('Forgot Your Password?') }}
                                    </a>
                                @endif
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>LDSK12 Beta</title>

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

                <!-- <div class="row">
                    <div id="applayout"></div>
                </div> -->
                <!-- <div class="row" >
                    <div id="topmenu" class="col-10">
                    </div>
                </div> -->

                <div class="row">
                    <div id="topmenu" class="col-12" style="height: 128px;" data-user = {{$user}}>
                    </div>
                    <div id="sidemenu" class="col-2">
                    </div>
                   
                    <div class="col-10"> 
                        @yield('content')
                    </div>
                    
                </div>
            </div>
        
        </div>
    </body>
</html>
<script type="text/javascript" src="/js/app.js"> </script>
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
    @yield('content')
    </body>
</html>
<script type="text/javascript" src="/js/app.js"> </script>
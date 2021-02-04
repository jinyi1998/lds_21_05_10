<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>LDS K-12 STEM Beta</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <style>
            .root {display: 'flex'}
            .copyright {bottom: 0; width: 100%; text-align: center; position: fixed; background-color: #ffffff}
        </style>
        <!-- Styles -->
    </head>
    <body>
        <div class="flex-center position-ref full-height">
           <div id="welcome"></div>
        </div>

        <div class="copyright">
            <a href = "https://forms.gle/BZwGMm4jzWUMqg9CA" target="_blank"> Report Bug </a> 
            <br />
            © 2020 All rights reserved, CITE, HKU
            <br />
            LDS K-12 STEM Beta v{{Config::get('app.app_ver')}}
        </div>
    </body>
</html>
<script type="text/javascript" src="js/app.js"> </script>
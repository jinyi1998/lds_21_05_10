License
MIT License


Requirements:


You need to install the following items first


npm v6.9.0
composer 1.10.17


To begin with, please clone this repository to your local mechine

```git clone -b ust_timeline https://github.com/ldsstem/ldsk12_beta.git```

Go into the directory of the project source code

```cd ldsk12_beta```

Run the composer install command to install all the laravel dependency.

```composer install```

Please edit your own ```.env``` file and config the database setting
and then run

```php artisan cache:clear```

```php artisan key:generate```

Run the migration to update your database

```php artisan migrate```

Run the npm to install all the front end dependency.

```npm install```

Run the npm build to apply the latest front code changes.

```npm run dev```


enjoy your coding.

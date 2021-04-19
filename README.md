## License
MIT License


## Requirements:

For example if your server distro is Ubuntu 20.04, you need to install the following items first

* NGINX (1.18.0, stock Ubuntu repo build using ```sudo apt install nginx```)
* MySQL (Ver 8.0.23, stock Ubuntu repo build ```sudo apt install mysql```)
* PHP (7.4.3, stock Ubuntu repo build ```sudo apt install php-fpm php-mysql```)
* npm v6.9.0 (use nvm: ```nvm install 6.9.0```)
* Composer 1.10.17

Detail steps for installing specific version (e.g. 1.10.17) of Composer:

```
curl -O "https://getcomposer.org/download/1.10.17/composer.phar"
chmod a+x composer.phar
sudo mv composer.phar /usr/local/bin/composer
```

Install the following packages for Laravel/Composer:

```sudo apt install zip unzip php7.4-zip```

```sudo apt install php7.4-common php7.4-bcmath openssl php7.4-json php7.4-mbstring php7.4-xml php7.4-gd php7.4-curl```

## Installation Steps

To begin with, please clone this repository to your local machine 
(copy it to your WWW folder for production build)

```git clone -b ust_timeline https://github.com/ldsstem/ldsk12_beta.git```

Go into the directory of the project source code

```cd ldsk12_beta```

Run the composer install command to install all the laravel dependency.

```composer install```

Please edit your own ```.env``` file and config the database setting (Change DB_DATABASE, DB_USERNAME, DB_PASSWORD to your MySQL settings)

```sudo cp .env.example .env```

Set the NGINX server block for the LDS site, for example:

```sudo nano /etc/nginx/sites-available/lds```

Sample config:

```
server {
    listen 80;
    server_name lds.localhost www.lds.localhost;
    root /var/www/ldsk12_beta/public;

    index index.html index.htm index.php;

    location / {
        try_files $uri $uri/ /index.php$is_args$args;
    }

    location ~ \.php$ {
        #include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
        try_files $uri /index.php =404;
        fastcgi_index index.php;
        fastcgi_buffers 16 16k;
        fastcgi_buffer_size 32k;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        #fixes timeouts
        fastcgi_read_timeout 600;
        include fastcgi_params;
     }

    location ~ /\.ht {
        deny all;
    }
}
```

Remember to link it to enabled sites and disable default:

```sudo ln -s /etc/nginx/sites-available/lds /etc/nginx/sites-enabled/```

```sudo unlink /etc/nginx/sites-enabled/default```

Set the proper files owner for public and storage folder, for example:

```sudo chown -R www-data:www-data /var/www/ldsk12_beta/public```

```sudo chown -R www-data:www-data /var/www/ldsk12_beta/storage```

(You may also need to use ```chmod``` if you encounter permission issue)

Then run 3 PHP artisan commands:

```php artisan cache:clear```

```php artisan key:generate```

```php artisan passport:install```

Run the migration to update your database

```php artisan migrate```

Run the npm to install all the front end dependency.

```npm install```

At this point you may want to restart NGINX to apply any changes that is not loaded

```service nginx restart```

Run the npm build to apply the latest front code changes.

```npm run prod``` or ```npm run dev``` for dev build


enjoy your coding.

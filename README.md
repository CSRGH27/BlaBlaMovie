# BlaBlaMovie

Requirement: 
- Composer
- Yarn ou NPM
- Symfony Cli (doc  <a href="https://symfony.com/download">here</a>) 

How to start the demo:
  - Clone this repository
  - Change the acces to your local db in .env file (see the doc <a href="https://symfony.com/doc/current/doctrine.html#configuring-the-database">here</a>)
  - Create the the database with the command "php bin/console doctrine:database:create"
  - Send the migration with the command "php bin/console doctrine:migrations:migrate"
  - Install symfony components with command "composer install"
  - Install package dependecies with or npm
  - Launch symfony web server with "symfony server:start -d"
  - Launch Encore web server with "yarn run dev-server"
 
 
Use the API: 
  To have all the command all API got this url 'https://127.0.0.1:8000/api/'

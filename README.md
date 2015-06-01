Madeo TODOs app
===============

```
$ npm install
$ composer install
$ bower install
$ grunt

$ vim Config/database.php # edit db credentials
$ mysql -u user -p madeo < schema.sql
$ apache vhost is located at Config/Vhost/local.madeo.conf
```

open http://local.madeo/users/add

enjoy!


code pointers:
app is a cakephp2.x app
interesting hand written code (or at least hand edited code) is to be found at following paths:
 * [Controller/ItemsController.php](Controller/ItemsController.php)
 * [View/Items/index](View/Items/index.ctp)
 * [js/post.js](js/post.js)

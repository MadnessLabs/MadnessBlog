<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', array('before' => 'seo4ajax', 'uses' => 'RoutingController@index'));
Route::get('home/', array('before' => 'seo4ajax', 'uses' => 'RoutingController@index'));

Route::group(array('prefix' => 'api/v1'), function(){
    //Route::resource('test', 'TestController');
});
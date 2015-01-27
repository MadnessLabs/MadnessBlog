<?php

/*
|--------------------------------------------------------------------------
| Application & Route Filters
|--------------------------------------------------------------------------
|
| Below you will find the "before" and "after" events for the application
| which may be used to do any work before or after a request into your
| application. Here you may also register your custom route filters.
|
*/

App::before(function($request)
{
	//
});


App::after(function($request, $response)
{
	//
});

/*
|--------------------------------------------------------------------------
| Authentication Filters
|--------------------------------------------------------------------------
|
| The following filters are used to verify that the user of the current
| session is logged into this application. The "basic" filter easily
| integrates HTTP Basic authentication for quick, simple checking.
|
*/

Route::filter('auth', function()
{
	if (Auth::guest())
	{
		if (Request::ajax())
		{
			return Response::make('Unauthorized', 401);
		}
		else
		{
			return Redirect::guest('login');
		}
	}
});


Route::filter('auth.basic', function()
{
	return Auth::basic();
});

/*
|--------------------------------------------------------------------------
| Seo4Ajax Filter
|--------------------------------------------------------------------------
|
| The following filter is used to load html from SEO4AJAX.com and 
| serve it specifically to search engine / social networking bots. 
| EXAMPLE - Route::get('/', array('before' => 'seo4ajax', 'uses' => 'controller@index'));
|
*/

Route::filter('seo4ajax', function()
{
	$authKey = Config::get('settings.seo4ajax');
	$UserAgentsToMatch = '/bot|crawler|spider|archiver|pinterest|facebookexternalhit|flipboardproxy|slurp/i';
	$UserAgentsNotToMatch = '/google.*bot|bing|msnbot|yandexbot|pinterest.*ios|mail\.ru/i';
	if (isset($_SERVER['QUERY_STRING']) && preg_match('/_escaped_fragment_=/i', $_SERVER['QUERY_STRING'])) {
		return file_get_contents("http://api.seo4ajax.com/".$authKey.$_SERVER['REQUEST_URI']);
	}
	if (isset($_SERVER['HTTP_USER_AGENT']) && !preg_match($UserAgentsNotToMatch, $_SERVER['HTTP_USER_AGENT']) && preg_match($UserAgentsToMatch, $_SERVER['HTTP_USER_AGENT'])) {
		return file_get_contents("http://api.seo4ajax.com/".$authKey.$_SERVER['REQUEST_URI']);
	}
});

/*
|--------------------------------------------------------------------------
| Guest Filter
|--------------------------------------------------------------------------
|
| The "guest" filter is the counterpart of the authentication filters as
| it simply checks that the current user is not logged in. A redirect
| response will be issued if they are, which you may freely change.
|
*/

Route::filter('guest', function()
{
	if (Auth::check()) return Redirect::to('/');
});

/*
|--------------------------------------------------------------------------
| CSRF Protection Filter
|--------------------------------------------------------------------------
|
| The CSRF filter is responsible for protecting your application against
| cross-site request forgery attacks. If this special token in a user
| session does not match the one given in this request, we'll bail.
|
*/

Route::filter('csrf', function()
{
	if (Session::token() !== Input::get('_token'))
	{
		throw new Illuminate\Session\TokenMismatchException;
	}
});

<?php

class RoutingController extends \BaseController {

	/**
	 * Load the master view and serve it. Angular will pick up on the
	 * rest on the client side to map the content.
	 *
	 * @return View
	 */
	public function index()
	{
		return View::make('master');
	}
}

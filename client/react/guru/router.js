import React, { Component } from 'react';
import { Switch } from 'react-router';

import { Route } from '../components';
import SignUp from './signUp';
import SessionsRouter from './sessions';
import GuruDashboard from "./dashboard";
import GuruProfile from "./profile";

export default class GuruRouter extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let { match: { url } } = this.props;
		
		return (
			<Switch>
				<Route exact path={`${url}`} component={GuruDashboard} />
				<Route path={`${url}/signUp`} component={SignUp} />
				<Route path={`${url}/sessions`} component={SessionsRouter} />
				<Route path={`${url}/profile/:guruUUID`} component={GuruProfile} />
			</Switch>
		);
	}
}
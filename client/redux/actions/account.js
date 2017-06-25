import fetch from 'isomorphic-fetch';

import cookie from 'react-cookie';
import { push } from 'react-router-redux';

import store from '../store.js';
import { createForm, sendFormErr } from './forms.js';
import { verifySession } from './session.js';
import { initUserInfo, updateUserInfo, createUserInfoForm } from './userInfo.js';

import { types } from '../../reference/actionTypes.js';

import { serverURL } from '../../config.js';

/**
 * Redux Thunk action for creating a student account.
 */
export const createAccount = () => async dispatch => {
	// Get the 'createAccount' form stored in the Redux store.
	let accountForm = store.getState().forms.createAccount;
	if (accountForm) {
		dispatch({
			type: types.CREATE_ACCOUNT,
			status: types.REQUEST
		});

		// Send a POST request to create the account.
		const response = await fetch(serverURL + '/api/createAccount', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: accountForm.username,
				password: accountForm.password
			})
		});

		if (response.ok) {
			// Initialize all of the information from the server.
			let json = await response.json();
			dispatch(initUserInfo({}, 'student'));

			// Store the session JWT as a cookie.
			await cookie.save('sessionJWT', json.sessionJWT);

			// Refresh the session and push to the account page.
			await dispatch(verifySession());
			dispatch(push('/'));

			dispatch({
				type: types.CREATE,
				status: types.SUCCESS,
				successText: 'Account Created!'
			});
		} else {
			// If the account is not created successfully, dispatch an action to inform the user that the email has been taken.
			dispatch(sendFormErr('create', 'email', 'This email has been taken.'));

			dispatch({
				type: types.CREATE,
				status: types.FAILURE
			});
		}
	}
};

/**
 * Redux Thunk action to send a user info edit to the server.
 */
export const sendEdit = () => async dispatch => {
	let oldInfo = store.getState().userInfo;
	let newInfo = store.getState().forms.userInfo;

	if (oldInfo && newInfo) {
		dispatch({
			type: types.SEND_EDIT,
			status: types.REQUEST
		});

		// Create an object with only the changed values from the user info form object
		let info = {};
		for (let varName in newInfo) {
			info[varName] = newInfo[varName];
		}

		// Send a POST request to the server to send the edits
		const response = await fetch(serverURL + '/api/account/edit', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				info
			}),
			credentials: 'include'
		});

		if (response.ok) {
			// Upon success, update the user info object with the new info
			dispatch(updateUserInfo(newInfo));

			dispatch({
				type: types.SEND_EDIT,
				status: types.SUCCESS,
				successText: 'Saved!'
			});
		}
		else {
			dispatch({
				type: types.SEND_EDIT,
				status: types.FAILURE
			});
		}
	}
};

/**
 * Redux Thunk action for editing one's password.
 *
 * @return {Boolean} Whether the request was successful
 */
export const editPassword = () => async dispatch => {
	dispatch({
		type: types.SEND_EDIT,
		status: types.REQUEST
	});

	let form = store.getState().forms.editPassword;

	// Send a POST request to edit the password.
	const response = await fetch(serverURL + '/api/account/editPassword', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			oldPassword: form.oldPassword,
			newPassword: form.newPassword
		}),
		credentials: 'include'
	});

	if (response.ok) {
		// Upon success clear the form.
		dispatch(createForm('editPassword'));

		dispatch({
			type: types.SEND_EDIT,
			status: types.SUCCESS,
			successText: 'Saved!'
		});

		return true;
	} else {
		// Upon failure send an incorrect password error to the form.
		dispatch(sendFormErr('editPassword', 'oldPassword', 'Incorrect password.'));

		dispatch({
			type: types.SEND_EDIT,
			status: types.FAILURE
		});

		return false;
	}
};

/**
 * Redux Thunk action to edit one's email.
 */
export const editEmail = () => async dispatch => {
	dispatch({
		type: types.SEND_EDIT,
		status: types.REQUEST
	});

	let form = store.getState().forms.editEmail;

	// Send a POSt request to edit the email.
	const response = await fetch(serverURL + '/api/account/editEmail', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			password: form.password,
			email: form.email
		}),
		credentials: 'include'
	});

	if (response.ok) {
		// Upon success clear the form.
		dispatch(createForm('editEmail'));

		dispatch({
			type: types.SEND_EDIT,
			status: types.SUCCESS,
			successText: 'Saved!'
		});
	} else {
		// Upon failure send an incorrect password error to the form.
		dispatch(sendFormErr('editEmail', 'password', 'Incorrect password.'));

		dispatch({
			type: types.SEND_EDIT,
			status: types.FAILURE
		});
	}
};
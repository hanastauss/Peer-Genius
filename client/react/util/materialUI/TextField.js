import React from 'react';
import { connect } from 'react-redux';

import { sendFormVar } from '../../../redux/actions/forms.js';

import MuiTextField from 'material-ui/TextField';

import { verifyText } from './verifyField.js';

const style = {
	text: {
		marginLeft: 20,
		paddingRight: 40
	}
};

/**
 * @classdesc Wrapper component for Material UI TextFields.
 */
@connect((state, ownProps) => {
	let form = state.forms[ownProps.formName];
	if (form) {
		return {
			checkErrors: form.check,
			text: form[ownProps.varName],
			err: form.err[ownProps.varName]
		};
	} else {
		return {
			checkErrors: false,
			text: '',
			err: ''
		}
	}
}, {
	sendFormVar
})
export default class TextField extends React.Component {
	static propTypes = {
		formName: React.PropTypes.string.isRequired,	// The name of the form in the Redux store.
		varName: React.PropTypes.string.isRequired,		// The name of the variable in the Redux store.
		hintText: React.PropTypes.string.isRequired,	// The hint text to display.
		floatingLabelText: React.PropTypes.string,		// The label text floating above the field (defaults to the hint text).
		underlineShow: React.PropTypes.bool,			// Whether to show an underline underneath the field (defaults to false).
		required: React.PropTypes.bool,					// Whether the field is required (defaults to true).
		onEnterPress: React.PropTypes.func.isRequired,	// The function to call on pressing enter.
		verifyFunc: React.PropTypes.func,				// The function used to verify the field (defauls to simply checking required).
		markRequired: React.PropTypes.bool.isRequired,	// Whether the field should be marked as required if it is.
		showErrors: React.PropTypes.bool,				// Whether to show errors (defaults to true).
		multiLine: React.PropTypes.bool,				// Whether the text field is multi-line (defaults to false).
		width: React.PropTypes.number.isRequired,		// The width of the field.
		rows: React.PropTypes.number,					// The number of initial rows to display
		rowsMax: React.PropTypes.number					// The maximum number of allowed rows
	};

	static defaultProps = {
		underlineShow: true,
		required: true,
		showErrors: true,
		multiLine: false,
		verifyFunc: verifyText,
		rows: 1,
		rowsMax: 10
	};

	/** @class */
	constructor(props) {
		super(props);

		this.state = {
			text: this.props.text || ''
		}
	}

	componentWillReceiveProps= nextProps => {
		// If a form check is started, calculate errors.
		if (nextProps.checkErrors && !this.props.checkErrors) {
			this._onBlur(null, nextProps);
		}
	}

	/**
	 * Event handler for when the text changes.
	 * 
	 * @param {Object} event
	 */
	_onChange = event => {
		this.setState({
			text: event.target.value
		});
	}

	/**
	 * Event handler for when the field loses focus.
	 *
	 * Calculates the error and updates the Redux store.
	 * 
	 * @param {Object} [event]
	 * @param {Object} [props] The props to use (defaults to this.props)
	 */
	_onBlur = (event, props=this.props) => {
		// Calculate the error.
		let newErr = this.props.verifyFunc(this.state.text, props.required);

		// Update the Redux store if anything changed.
		if (this.state.text !== props.text || newErr !== props.err) {
			props.sendFormVar(props.formName, props.varName, this.state.text, newErr);
		}
	}

	/**
	 * Event handler for when a key is pressed.
	 *
	 * Triggers onEnterPress if the key was the enter key.
	 * 
	 * @param {Object} [event]
	 */
	_onKeyPress = event => {
		if (event.key === 'Enter' && !this.props.multiLine) {
			this.props.onEnterPress();
		}
	}

	render = () => {
		return (
			<MuiTextField
				value={this.state.text}
				hintText={this.props.hintText}
				floatingLabelText={(this.props.floatingLabelText || this.props.hintText) + (this.props.required && this.props.markRequired ? '*' : '')}
				errorText={this.props.showErrors ? this.props.err : ''}
				underlineShow={this.props.underlineShow}
				inputStyle={style.text}
				hintStyle={style.text}
				floatingLabelStyle={style.text}
				errorStyle={style.text}
				onChange={this._onChange}
				onBlur={this._onBlur}
				onKeyPress={this._onKeyPress}
				fullWidth={true}
				multiLine={this.props.multiLine}
				type={this.props.password ? 'password' : 'text'}
				rows={this.props.rows}
				rowsMax={this.props.rowsMax}
			/>
		);
	}
}
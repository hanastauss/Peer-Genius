import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import { orange } from 'material-ui/colors';
import Menu, { MenuItem } from 'material-ui/Menu';
import { FormHelperText } from 'material-ui/Form';
import ArrowDropdown from 'material-ui-icons/ArrowDropDown';

import Flex from '../Flex';
import HelperText from './HelperText';

const styles = ({ palette: { primary, grey, error, warning }, transitions, spacing }) => ({
	root: {
		position: 'relative',
	},
	sizing: {
		width: '100%',
		padding: spacing.unit,
		boxSizing: 'border-box',
	},
	input: {
		borderWidth: 1,
		borderRadius: spacing.unit / 2,
		borderStyle: 'solid',
		borderColor: grey[300],
		
		fontSize: 'inherit',
		cursor: 'pointer',
		
		'&:focus': {
			outline: 'none'
		}
	},
	errorInput: {
		borderColor: error[500],
		boxShadow: `0 0 4px ${error[500]}`
	},
	warningInput: {
		borderColor: orange[500],
		boxShadow: `0 0 4px ${orange[500]}`
	},
	dropdownIconWrapper: {
		position: 'absolute',
		right: 0,
		top: 0,
		bottom: 0,
		pointerEvents: 'none'
	},
	dropdownIcon: {
		color: primary[700]
	}
});

@withStyles(styles)
export class SelectFieldComponent extends Component {
	static propTypes = {
		name: PropTypes.string,
		label: PropTypes.string,
		options: PropTypes.arrayOf(PropTypes.shape({
			value: PropTypes.any,
			label: PropTypes.string
		}))
	};
	
	constructor(props) {
		super(props);
		
		this._input = null;
		
		this.state = {
			anchor: null,
			open: false
		};
	}
	
	_openMenu = () => {
		this.setState({
			anchor: this._input,
			open: true
		});
	};
	
	_closeMenu = () => {
		this.setState({
			open: false
		});
	};
	
	_makeClickHandler = value => () => {
		this._closeMenu();
		this.props.input.onBlur(value);
	};
	
	render() {
		let {
			input, meta, options, classes, className,
			...inputProps
		} = this.props;
		let { open, anchor } = this.state;
		
		let label = '';
		for (let option of options) {
			if (option.value === input.value) {
				label = option.label;
			}
		}
		
		return (
			<Flex column>
				<div className={classes.root}>
					<input
						ref={self => this._input = self}
						className={classNames(
							classes.sizing, classes.input,
							{
								[classes.warningInput]: meta.touched && meta.warning,
								[classes.errorInput]: meta.touched && meta.error
							},
							className
						)}
						value={label} readOnly
						onClick={this._openMenu}
					/>
					<Menu
						anchorEl={anchor} style={{ width: this._input ? this._input.clientWidth : 0 }}
						open={open} onRequestClose={this._closeMenu}
					>
						{options.map(option => (
							<MenuItem
								selected={option.value === input.value}
								onClick={this._makeClickHandler(option.value)}
							>
								{option.label}
							</MenuItem>
						))}
					</Menu>
					<Flex align="center" justify="center" className={classes.dropdownIconWrapper}>
						<ArrowDropdown className={classes.dropdownIcon} />
					</Flex>
				</div>
				<HelperText error={meta.touched && meta.error} warning={meta.touched && meta.warning} />
			</Flex>
		);
	}
}

export default class SelectField extends Component {
	static propTypes = {
		name: PropTypes.string,
		label: PropTypes.string,
		options: PropTypes.arrayOf(PropTypes.shape({
			value: PropTypes.any,
			label: PropTypes.string
		}))
	};
	
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<Field
				component={SelectFieldComponent}
				format={this._format}
				parse={this._parse}
				{...this.props}
			/>
		);
	}
}
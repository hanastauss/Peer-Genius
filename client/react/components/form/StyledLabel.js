import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import { orange } from 'material-ui/colors';

const styles = ({ typography }) => ({
	label: {
		fontFamily: typography.fontFamily
	}
});

const StyledLabel =
	withStyles(styles)(
		props => {
			let {
				classes, className,
				style, width,
				...others
			} = props;
			
			return (
				<label
					className={classNames(classes.label, className)}
					style={{ width, ...style }}
					{...others}
				/>
			);
		}
	);

StyledLabel.displayName = 'StyledLabel';

StyledLabel.propTypes = {
	className: PropTypes.string,
	htmlFor: PropTypes.string,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default StyledLabel;
import React from 'react';

import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import Text from '../components/Text';
import ProgressBar from 'react-progressbar.js';
import Button from '../components/Button';

let styles = {
  headerBackground: {
    backgroundImage: 'linear-gradient(to bottom, rgba(244, 252, 0, 0.8) 0%,rgba(0, 174, 183, 0.8) 100%), url(assets/home_page_3rd.jpg)',
    backgroundSize: 'cover',
    overflow: 'hidden'
  },
  headerText: {
    paddingTop: 50,
    paddingBottom: 50
  },
  centerText: {
    textAlign: 'center'
  },
  textPadding: {
    paddingTop: 10,
    paddingBottom: 10
  },
  leftPadding1: {
    marginLeft: 15,
    paddingTop: 7,
    paddingBottom: 7
  },
  darkGreyBackground: {
    backgroundColor: 'rgb(244, 244, 244)',
    width: 200
  },
  lightGreyBackground: {
    backgroundColor: 'rgb(252, 252, 252)',
    height: 300
  },
  sidePadding: {
    paddingLeft: 300,
    paddingRight: 300
  },
  paddingLeft: {
    paddingLeft: 30
  },
  roundedDot: {
    width: 10,
    borderRadius: '50%',
    backgroundColor: 'black',
    paddingBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  inlineDiv: {
    display: 'inline-block',
    float: 'left'
  }
};


@withStyles(styles)
export default class NewbieDashboard extends React.Component {
  render = () => {
    let { classes, currentHours } = this.props;
    if (!currentHours) {
      currentHours = 25;
    }
    let notifications = null;

    return (
      <div style={{ display: 'block', width: '100%' }}>
        <div className={classNames(classes.headerText, classes.headerBackground)}>
          <Text type='display1' color='white' className={classNames(classes.centerText, classes.headerText)}>YOUR
            DASHBOARD</Text>
        </div>
        <div style={{ width: '100%', height: 20 }} />
        <div className={classNames(classes.sidePadding)}>
          <div className={classNames(classes.inlineDiv)}>
            <div className={classNames(classes.darkGreyBackground)}>
              <Text type='subheading' color='black' className={classes.leftPadding1}>Notification</Text>
            </div>
            <div className={classNames(classes.lightGreyBackground)}>
              {notifications}
            </div>
          </div>
          <div className={classNames(classes.inlineDiv, classes.paddingLeft)}>
            <Text type='title' color='black' className={classes.textPadding}>HOUR TIMELINE</Text>
            <ProgressBar.Line progress={(currentHours / 250)} text={currentHours + ' hours'} options={{
              color: 'rgb(1,147,172)',
              strokeWidth: 6
            }} initialAnimate={true} containerStyle={{ width: 600, height: 35, marginBottom: 15 }} />
            <Text
              type='subheading' color='rgb(1,147,172)'
              className={classNames(classes.inlineDiv, classes.textPadding, classes.centerText)}
              style={{ marginLeft: 30 }}>
              <div className={classes.roundedDot} />
              <br />25 Hours</Text>
            <Text
              type='subheading' color='rgb(1,147,172)'
              className={classNames(classes.inlineDiv, classes.textPadding, classes.centerText)}
              style={{ marginLeft: 90 }}>
              <div className={classes.roundedDot} />
              <br />Bronze<br />100 Hours</Text>
            <Text
              type='subheading' color='rgb(1,147,172)'
              className={classNames(classes.inlineDiv, classes.textPadding, classes.centerText)}
              style={{ marginLeft: 90 }}>
              <div className={classes.roundedDot} />
              <br />Silver<br />175 Hours</Text>
            <Text
              type='subheading' color='rgb(1,147,172)'
              className={classNames(classes.inlineDiv, classes.textPadding, classes.centerText)}
              style={{ marginLeft: 90 }}>
              <div className={classes.roundedDot} />
              <br />Gold<br />250 Hours</Text>
            <Button
              flat color="primary"
              onClick={() => window.location.href = 'https://voluntu.io'}
              style={{ display: 'block' }}
            >
              <Text type="button" weight='bold'>Voluntu.io</Text>
            </Button>
          </div>
        </div>
      </div>
    );
  };
}
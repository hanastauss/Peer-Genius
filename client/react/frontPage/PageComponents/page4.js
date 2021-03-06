import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { Button, Logo, Text, Spacer } from '../../components';
import Page from './Page';


const styles = {
  withColor: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)'
  },
  background: {
    backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9) 100%), url(assets/home_page_5th.jpg)',
    backgroundSize: 'cover',
    overflow: 'hidden'
  },
  centerText: {
    textAlign: 'center',
    marginBottom: 10
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    width: '12em',
    height: '3em'
  }
};

@withStyles(styles)
export default class PageFour extends Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    createAccount: PropTypes.func.isRequired
  };

  render() {
    let { classes, currentPage, createAccount } = this.props;

    return (
      <Page
        page={4} currentPage={currentPage}
        className={classNames(classes.background, classes.withColor)}
      >
        <Logo
          imageOnly
          height='256pt'
          width='256pt'
          style={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 10,
            marginBottom: 10
          }}
        />
        <Text type="display2" color="black" className={classes.centerText}>Get started for free!</Text>
        <Spacer height='2%'/>
        <div className={classes.buttons}>
          <Button
            raised
            color="rgba(249,202,120, 0.9)"
            onClick={createAccount}
            style={styles.button}
          >
            <Text type="button" fontWeight='bold' size='12pt'>Create Account</Text>
          </Button>
        </div>
      </Page>
    );
  }
}

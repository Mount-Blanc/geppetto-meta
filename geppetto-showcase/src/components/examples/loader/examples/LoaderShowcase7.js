import React, { Component } from 'react';
import Loader from '@metacell/geppetto-meta-ui/loader/Loader';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

const styles = () => ({ typography: { textDecoration: 'underline', }, });

class LoaderShowcase7 extends Component {
  constructor (props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = { active: false, };
  }

  handleClose () {
    const { active } = this.state;
    this.setState({ active: !active });
  }

  handleToggle () {
    const { active } = this.state;
    this.setState({ active: !active });
  }

  render () {
    const { active } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleToggle}>
          Show Loader
        </Button>
        <Loader
          className={classes.typography}
          active={active}
          handleClose={this.handleClose}
          messages={['Loading Project', 'Did you know you can...']}
        />
      </div>
    );
  }
}
export default withStyles(styles)(LoaderShowcase7);

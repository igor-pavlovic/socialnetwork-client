import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// Components
import TooltipButton from "../TooltipButton";
import PostStory from "../story/PostStory";
import Notifications from "./Notifications";

// Router
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";

// MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// MUI Icons
import HomeIcon from "@material-ui/icons/Home";

export class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <PostStory />
              <Link to="/">
                <TooltipButton tip="Home">
                  <HomeIcon />
                </TooltipButton>
              </Link>
              <Notifications />
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);

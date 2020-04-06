import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import TooltipButton from "../TooltipButton";

// Router
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { likeStory, unlikeStory } from "../../redux/actions/dataActions";

// MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";

// MUI Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const styles = theme => ({
  ...theme.spreadThis
});

export class LikeButton extends Component {
  likedStory = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.storyId === this.props.storyId)
    )
      return true;
    else return false;
  };

  likeStory = () => {
    this.props.likeStory(this.props.storyId);
  };

  unlikeStory = () => {
    this.props.unlikeStory(this.props.storyId);
  };

  render() {
    const { classes } = this.props;
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <TooltipButton tip="Like" btnClassName={classes.actionButton}>
          <FavoriteBorderIcon color="primary" />
        </TooltipButton>
      </Link>
    ) : this.likedStory() ? (
      <TooltipButton
        tip="Unlike"
        onClick={this.unlikeStory}
        btnClassName={classes.actionButton}
      >
        <FavoriteIcon color="primary" />
      </TooltipButton>
    ) : (
      <TooltipButton
        tip="Like"
        onClick={this.likeStory}
        btnClassName={classes.actionButton}
      >
        <FavoriteBorderIcon color="primary" />
      </TooltipButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  likeStory: PropTypes.func.isRequired,
  unlikeStory: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  storyId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeStory,
  unlikeStory
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(LikeButton));

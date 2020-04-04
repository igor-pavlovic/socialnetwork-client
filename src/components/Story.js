import React, { Component } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Components
import TooltipButton from "./TooltipButton";
import DeleteStory from "./DeleteStory";

// Router
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { likeStory, unlikeStory } from "../redux/actions/dataActions";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

// MUI Icons
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 15
  },
  image: {
    minWidth: 200,
    minHeight: 200
  },
  content: {
    padding: "30px 45px 50px 50px",
    objectFit: "cover"
  },
  body: {
    margin: "10px 0 40px 0"
  }
};

class Story extends Component {
  likedStory = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        like => like.storyId === this.props.story.storyId
      )
    )
      return true;
    else return false;
  };

  likeStory = () => {
    this.props.likeStory(this.props.story.storyId);
  };

  unlikeStory = () => {
    this.props.unlikeStory(this.props.story.storyId);
  };

  render() {
    dayjs.extend(relativeTime);

    const {
      classes,
      story: {
        body,
        createdAt,
        userImage,
        storyId,
        userHandle,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { userHandle: authUserHandle }
      }
    } = this.props;

    const likeButton = !authenticated ? (
      <TooltipButton tip="Like">
        <Link to="/login">
          <FavoriteBorderIcon color="primary" />
        </Link>
      </TooltipButton>
    ) : this.likedStory() ? (
      <TooltipButton tip="Unlike" onClick={this.unlikeStory}>
        <FavoriteIcon color="primary" />
      </TooltipButton>
    ) : (
      <TooltipButton tip="Like" onClick={this.likeStory}>
        <FavoriteBorderIcon color="primary" />
      </TooltipButton>
    );
    const deleteButton =
      authenticated && authUserHandle === userHandle ? (
        <DeleteStory storyId={storyId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1" className={classes.body}>
            {body}
          </Typography>

          <Typography variant="caption">
            {likeButton} {likeCount} likes {"      "}
            <TooltipButton tip="Comments">
              <ChatIcon color="primary" />
            </TooltipButton>
            {commentCount} comments
          </Typography>

          <Typography variant="body2"></Typography>
        </CardContent>
      </Card>
    );
  }
}

Story.propTypes = {
  likeStory: PropTypes.func.isRequired,
  unlikeStory: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  story: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
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
)(withStyles(styles)(Story));

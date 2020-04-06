import React, { Component } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Components
import TooltipButton from "../TooltipButton";
import DeleteStory from "./DeleteStory";
import StoryDialog from "./StoryDialog";
import LikeButton from "./LikeButton";

// Router
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

// MUI Icons
import ChatIcon from "@material-ui/icons/Chat";

const styles = theme => ({
  ...theme.spreadThis,
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
});

class Story extends Component {
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

          <div className={classes.actionButtonContainer}>
            <LikeButton storyId={storyId} />
            <Typography variant="caption" className={classes.actionButtonText}>
              {likeCount} likes
            </Typography>
            <TooltipButton tip="Comments" btnClassName={classes.actionButton}>
              <ChatIcon color="primary" />
            </TooltipButton>
            <Typography variant="caption" className={classes.actionButtonText}>
              {commentCount} comments
            </Typography>
            <StoryDialog storyId={storyId} user={userHandle} />
          </div>
        </CardContent>
      </Card>
    );
  }
}

Story.propTypes = {
  user: PropTypes.object.isRequired,
  story: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {})(withStyles(styles)(Story));

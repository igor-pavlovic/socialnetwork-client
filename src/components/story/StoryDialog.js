import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

// Components
import TooltipButton from "../TooltipButton";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

// Router
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { getStory, clearErrors } from "../../redux/actions/dataActions";

// MUI stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// MUI Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

// MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  ...theme.spreadThis,

  profileImage: {
    width: "100%",
    height: "100%",
    maxWidth: 175,
    maxHeight: 175,
    borderRadius: "50%",
    objectFit: "cover",
    display: "block",
    margin: "0 auto"
  },
  dialogContent: {
    padding: 40
  },
  closeButton: {
    position: "absolute",
    left: "95%"
  },
  expandButton: {
    position: "absolute",
    left: "90%"
  },
  spinnerDiv: {
    textAlign: "center",
    margin: "50px 0"
  }
});

class StoryDialog extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.props.getStory(this.props.storyId);
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      story: {
        storyId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments
      },
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={100} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={4}>
        <Grid item sm={3}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={9}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
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
          </div>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm storyId={storyId} />
        {comments ? <Comments comments={comments} /> : null}
      </Grid>
    );
    return (
      <Fragment>
        <TooltipButton
          tip="Expand story"
          onClick={this.handleOpen}
          tipClassName={classes.expandButton}
        >
          <UnfoldMoreIcon color="secondary" />
        </TooltipButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="md"
        >
          <TooltipButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </TooltipButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

StoryDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getStory: PropTypes.func.isRequired,
  storyId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  story: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  story: state.data.story,
  UI: state.UI
});

const mapActionsToProps = {
  getStory,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(StoryDialog));

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

// Router
import { Link } from "react-router-dom";

// MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  ...theme.spreadThis,
  commentImage: {
    width: "100%",
    height: "100%",
    maxWidth: 100,
    maxHeight: 100,
    borderRadius: "50%",
    objectFit: "cover",
    display: "block",
    margin: "0 auto"
  },
  commentData: {
    marginLeft: 20
  }
});

class Comments extends Component {
  render() {
    const { classes, comments } = this.props;
    return (
      <Grid container>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={3}>
                <img
                  src={userImage}
                  alt="comment"
                  className={classes.commentImage}
                />
              </Grid>
              <Grid item sm={9}>
                <div className={classes.commentData}>
                  <Typography
                    variant="h5"
                    component={Link}
                    to={`/users/${userHandle}`}
                    color="primary"
                  >
                    {userHandle}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                  </Typography>
                  <hr className={classes.invisibleSeparator} />
                  <Typography variant="body1">{body}</Typography>
                </div>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);

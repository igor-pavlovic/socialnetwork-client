import React from "react";
import NoImg from "../images/no-img.png";
import PropTypes from "prop-types";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";

// MUI icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = (theme) => ({
  ...theme.spreadThis,
  handle: {
    width: 100,
    height: 22,
    backgroundColor: theme.palette.primary.main,
    margin: "20px auto 15px auto",
  },
  fullLine: {
    height: 16,
    width: "100%",
    marginBottom: 10,
    backgroundColor: `rgba(0,0,0, 0.2)`,
  },
});

const ProfileSkeleton = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={NoImg} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.handle} />
          <hr />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr />
          <LocationOn color="primary" /> <span>Location</span>
          <hr />
          <LinkIcon color="primary" />{" "}
          <span style={{ color: "#00bcd4" }}>https://www.website.com</span>
          <hr />
          <CalendarToday color="primary" /> Join date
        </div>
      </div>
    </Paper>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton);

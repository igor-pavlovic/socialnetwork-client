import React, { Fragment } from "react";
import NoImg from "../images/no-img.png";
import PropTypes from "prop-types";

// MUI
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.spreadThis,
  card: {
    display: "flex",
    marginBottom: 20,
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: "30px 45px 50px 50px",
  },
  cover: {
    minWidth: 200,
    minHeight: 200,
    objectFit: "cover",
  },
  handle: {
    width: 100,
    height: 22,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 7,
  },
  date: {
    height: 14,
    width: 70,
    backgroundColor: `rgba(0,0,0, 0.1)`,
    marginBottom: 10,
  },
  fullLine: {
    height: 16,
    width: "100%",
    marginBottom: 10,
    backgroundColor: `rgba(0,0,0, 0.2)`,
  },
  halfLine: {
    height: 16,
    width: "50%",
    marginBottom: 10,
    backgroundColor: `rgba(0,0,0, 0.2)`,
  },
});

const StorySkeleton = (props) => {
  const { classes } = props;
  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={NoImg} />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));
  return <Fragment>{content}</Fragment>;
};

StorySkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StorySkeleton);

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// Components
import TooltipButton from "../TooltipButton";

// Redux
import { connect } from "react-redux";
import { deleteStory } from "../../redux/actions/dataActions";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

// MUI Icons
import DeleteOutline from "@material-ui/icons/DeleteOutline";

const styles = {
  deleteButton: {
    position: "absolute",
    top: "10%",
    left: "90%"
  }
};
class DeleteStory extends Component {
  state = { open: false };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deleteStory = () => {
    this.props.deleteStory(this.props.storyId);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <TooltipButton
          tip="Delete story"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary" />
        </TooltipButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Are you sure you want to delete this story?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteStory} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteStory.propTypes = {
  deleteStory: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  storyId: PropTypes.string.isRequired
};

export default connect(null, { deleteStory })(withStyles(styles)(DeleteStory));

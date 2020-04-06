import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { getStories } from "../redux/actions/dataActions";

// MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Components
import Story from "../components/story/Story";
import Profile from "../components/profile/Profile";

class Home extends Component {
  componentDidMount() {
    this.props.getStories();
  }
  render() {
    const { stories, loading } = this.props.data;
    let recentStoriesMarkup = !loading ? (
      stories.map(story => <Story key={story.storyId} story={story} />)
    ) : (
      <div style={{ textAlign: "center" }}>
        <Typography variant="body2" style={{ margin: "50% auto" }}>
          Loading...
        </Typography>
      </div>
    );
    return (
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          {recentStoriesMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  getStories: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getStories })(Home);

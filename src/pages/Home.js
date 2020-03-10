import React, { Component } from "react";
import axios from "axios";

// MUI stuff
import Grid from "@material-ui/core/Grid";

// Components
import Story from "../components/Story";

class Home extends Component {
  state = {
    stories: null
  };
  componentDidMount() {
    axios.get("/stories").then(res => {
      this.setState({ stories: res.data });
    });
  }
  render() {
    let recentStoriesMarkup = this.state.stories ? (
      this.state.stories.map(story => (
        <Story key={story.storyId} story={story} />
      ))
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={4}>
        <Grid item sm={8} xs={12}>
          {recentStoriesMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    );
  }
}

export default Home;

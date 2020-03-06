import React, { Component } from "react";
import axios from "axios";

import Grid from "@material-ui/core/Grid";

class Home extends Component {
  state = {
    stories: null
  };
  componentDidMount() {
    axios.get("/stories").then(res => {
      console.log(res.data);
      this.setState({ stories: res.data });
    });
  }
  render() {
    let recentStoriesMarkup = this.state.stories ? (
      this.state.stories.map(story => <p>{story.body}</p>)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={16}>
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

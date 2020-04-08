import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Components
import Story from "../components/story/Story";
import StaticProfile from "../components/profile/StaticProfile";
import StorySkeleton from "../util/StorySkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

// Redux
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

// MUI
import Grid from "@material-ui/core/Grid";

class User extends Component {
  state = {
    profile: null,
    storyId: null,
  };
  componentDidMount() {
    const userHandle = this.props.match.params.userHandle;
    const storyIdParam = this.props.match.params.storyId;
    if (storyIdParam) this.setState({ storyId: storyIdParam });

    this.props.getUserData(userHandle);
    axios
      .get(`/user/${userHandle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { stories, loading } = this.props.data;
    const { storyId } = this.state;
    const storiesMarkup = loading ? (
      <StorySkeleton />
    ) : stories === null ? (
      <p>No stories from this user.</p>
    ) : !storyId ? (
      stories.map((story) => <Story key={story.storyId} story={story} />)
    ) : (
      stories.map((story) => {
        if (story.storyId !== storyId)
          return <Story key={story.storyId} story={story} />;
        else return <Story key={story.storyId} story={story} openDialog />;
      })
    );
    return (
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          {storiesMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

User.propTyps = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps, { getUserData })(User);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import plansAPI from "../../services/plan-service";
import Moment from "react-moment";
import BackNav from "../../components/BackNav";

import { View, Text, StyleSheet, Button } from "react-native";

class Plan extends Component {
  state = {
    plan: {},
    planOwner: "",
    planJoinedUsers: [],
    plansWithCounter: {},
    user: {},
    isJoined: false,
    isOwner: false,
    loading: true
  };

  componentDidMount() {
    plansAPI
      .getOnePlan(this.props.match.params.id)
      .then(data => {
        // console.log(data)
        this.setState({
          plan: data.plan,
          planOwner: data.planOwner,
          planJoinedUsers: data.planJoinedUsers,
          plansWithCounter: data.plansWithCounter,
          user: data.fullUser,
          isJoined: data.isJoined,
          isOwner: data.isOwner,
          loading: false
        });
      })
      .catch(error => console.log(error));
  }

  handleSubmitVale = event => {
    event.preventDefault();
    plansAPI
      .valePlan(this.props.match.params.id)
      .then(({ data }) => {
        this.setState({ plan: data.plan, isJoined: true });
      })
      .catch(error => console.log(error));
  };

  handleSubmitLeave = event => {
    event.preventDefault();
    plansAPI
      .leavePlan(this.props.match.params.id)
      .then(({ data }) => {
        this.setState({ plan: data.plan, isJoined: false });
      })
      .catch(error => console.log(error));
  };

  handleSubmitDelete = event => {
    event.preventDefault();
    plansAPI
      .leavePlan(this.props.match.params.id)
      .then(({ data }) => {
        this.setState({ plan: data.plan, isOwner: false });
      })
      .catch(error => console.log(error));
  };

  render() {
    const { plan, plansWithCounter, planOwner, planJoinedUsers } = this.state;
    console.log(planOwner);
    return (
      <>
        <BackNav />

        <View style="form-wrapper" id="plan-detail">
          <View style="plan-detail-owner-info">
            <Link to={`/users/${planOwner._id}`}>
              <img
                style="avatar users-image"
                id="plan-detail-owner-avatar"
                src={planOwner.image}
                alt="user"
              />
            </Link>
            <Link to={`/users/${planOwner._id}`}>
              <Text id="name">{planOwner.name}</Text>
            </Link>
          </View>

          <View style={styles.cardGridPlanDetail}>
            <Text style={styles.title}>{plan.title}</Text>
            <Text style={styles.description}>{plan.description}</Text>
            <Text style={styles.date}>
              <Moment format="D MMM" style={{ paddingRight: 10 }}>
                {plan.date}
              </Moment>
              <Moment format="hh:mm">{plan.date}</Moment>
            </Text>
            <Text style={styles.category}>{plan.category}</Text>

            {this.state.loading ? null : (
              <View style={styles.planDetailJoinerInfo}>
                {planJoinedUsers.map(joiner => (
                  <Link to={`/users/${joiner._id}`}>
                    <img
                      style={
                        styles.avatarUsersImageplan - detail - joiner - avatar
                      }
                      src={joiner.image}
                      alt="user"
                    />
                  </Link>
                ))}
              </View>
            )}
          </View>

          {this.state.user.status === "created" ? (
            <form>
              <View style={styles.formButtonSignup}>
                <button style={styles.btnBtnSignup} type="submit">
                  <Link to="/user/onboarding">Vale!</Link>
                </button>
              </View>
            </form>
          ) : !plan.isOwner ? (
            !this.state.isJoined ? (
              <form onSubmit={this.handleSubmitVale}>
                <View style={styles.form - buttonsSignup}>
                  <Button style={styles.btnBtnSignup} type="submit">
                    Vale!
                  </Button>
                </View>
              </form>
            ) : (
              <form onSubmit={this.handleSubmitLeave}>
                <View style={styles.form - buttonsSignup}>
                  <Button style={styles.btnBtnSignup} type="submit">
                    Leave
                  </Button>
                </View>
              </form>
            )
          ) : (
            <form onSubmit={this.handleSubmitDelete}>
              <View style={styles.FormButtons} id="signup">
                <Button style={styles.deleteBtnBtnSignup} type="submit">
                  Delete
                </Button>
              </View>
            </form>
          )}
        </View>
      </>
    );
  }
}

export default Plan;

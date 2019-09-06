import React, { Component } from "react";
import { Link } from "react-router-dom";
import plansAPI from "../../services/plan-service";
// import Nav from "../../components/Nav";
// import LowNav from "../../components/LowNav";
import { View, Text, StyleSheet } from "react-native";

class Plans extends Component {
  state = {
    plans: [],
    loading: true,
    searchOpen: false
  };

  searchPlan = event => {
    this.setState({
      loading: true
    });
    plansAPI.searchPlans(event.target.value).then(data => {
      this.setState({ plans: data.plansWithCounter.reverse(), loading: false });
    });
  };

  toggleSearch = e => {
    this.setState({ searchOpen: !this.state.searchOpen });
  };

  componentDidMount() {
    plansAPI
      .getAllPlans()
      .then(data => {
        this.setState({ plans: data.plans.reverse(), loading: false });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <View>
        <Nav />
        <View style={styles.plansWrapper}>
          <Text style={styles.h1}>Plans</Text>
          <View style={styles.plansList}>
            {/* <input
              style={styles.searchBar {
                this.state.searchOpen ? "search-bar-open" : "search-bar-close"
              }}
              don't know how to pass this to RN
              type="text"
              onChange={this.searchPlan}
            />
            <View style="search-icon-wrapper">
              <img
                onClick={this.toggleSearch}
                style={styles.searchIcon}
                src="../images/search-icon-radio.png"
                alt="search-icon"
              /> */}
            </View>
            {!this.state.loading &&
              this.state.plans.map(plan => {
                return (
                  <View key={plan._id} style={`card ${plan.category}`}>
                    {/* don't know how to pass this to RN */}
                    <Link to={`/plans/${plan._id}`}>
                      <View style={styles.cardGrid}>
                        <Text style={[styles.title, styles.h3]}>
                          {plan.title}
                        </Text>
                        <Text style={styles.description}>
                          {plan.description}
                        </Text>
                        <Text style={styles.date}>
                            {/* inline style??? */}
                            {plan.date}
                          </Moment>
                          <Moment format="hh:mm">{plan.date}</Moment>
                        </Text>
                        <p style={styles.category}>{plan.category}</p>
                        <View style={styles.attendees}>
                          <Text style={styles.attendeesNumber}>
                            {" "}
                            {plan.counter}
                          </Text>
                          <img
                            style={styles.usersJoinedIcon}
                            src={require("../../images/users-joined-icon-gray.png")}
                            alt=""
                          />
                        </View>
                      </View>
                    </Link>
                  </View>
                );
              })}
          </View>
        </View>
        <LowNav />
      </View>
    );
  }
}

export default Plans;

const styles = StyleSheet.create({
  plansWrapper: {
    width: "100%",
    minWidth: "100vw",
    minHeight: "100vh",
    paddingTop: "12%",
    paddingBottom: "85px"
  },
  plansList: {
    padding: "2% 0"
  },
  // searchIcon: {
  //   height: 30,
  //   boxShadow: "0px 0px 5px 0px rgba(183, 179, 179, 0.75)",
  //   borderRadius: "50%"
  // }
  // h1: {
  //   margin: '0px 25px',
  //   paddingTop: '30px',
  //   color: var(--colorPrimary),
  //   textAlign: left,
  //   fontFamily: var(--sixthFont),
  //   fontSize: 30px,
  //   fontWeight: initial,
  // }
  // h3: {
  //   fontSize: 18px;
  //   fontWeight: initial !important;
  // }
  // esto hay que adaptarlo porque no hay grid en RN
  // cardGrid:{
  //   display: grid,
  //   gridTemplateColumns: '1fr 1fr 1fr',
  //   gridTemplateRows: auto,
  //   grid-template-areas:
  //   "title title title"
  //   "description description description"
  //   "date category attendees ",
  //   margin: 0,
  //   alignItems: center,
  //   gridColumnGap: 5,
  //   gridRowGap: 10,
  // },
  // title:{
  //   grid-area: title;
  //   margin: 0;
  //   font-size: 18px;
  // }
  // description: {
  //   grid-area: description;
  // },
  // date: {
  //   grid-area: date;
  //   margin: 0;
  //   font-size: 12px;
  //   text-align: center;
  //   color: grey;
  // }
  // .card-grid .category{
  //   grid-area: category;
  //   margin: 0;
  //   font-size: 12px;
  //   text-align: center;

  // }

  // .card-grid .attendees{
  //   grid-area: attendees;
  //   margin: 0;
  //   font-size: 12px;
  //   font-weight: 1000;
  //   text-align: center;
  //   color: grey;
  //   display: flex;
  //   align-content: center;
  //   justify-content: center;
  // }
  // .users-joined-icon{
  //   width: 14px;
  //   height: 14px;
  // }

  // .attendees-number{
  //   color: var(--colorPrimary) !important;
  //   padding-right: 5px;
  // }
});

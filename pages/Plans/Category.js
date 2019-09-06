import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "react-router-dom";
import plansAPI from "../../services/plan-service";
import Moment from "react-moment";
import Nav from "../../components/Nav";
import LowNav from "../../components/LowNav";

class Category extends Component {
  state = {
    plans: [],
    loading: true
  };

  componentDidMount() {
    plansAPI
      .getOneCategory(this.props.match.params.id)
      .then(plans => this.setState({ plans, loading: false }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <View>
        <Nav />
        <View style={styles.plans - wrapper}>
          <Text>Plans</Text>
          <View style={styles.plans - list}>
            {!this.state.loading &&
              this.state.plans.map(plan => {
                return (
                  <View key={plan._id} style={styles.cardplan.category}>
                    <Link to={`/plans/${plan._id}`}>
                      <View style={styles.card - grid}>
                        <Text style={styles.title}>{plan.title}</Text>
                        <Text style={styles.description}>
                          {plan.description}
                        </Text>
                        <Text style={styles.date}>
                          <Moment format="D MMM" style={{ paddingRight: 10 }}>
                            {plan.date}
                          </Moment>
                          <Moment format="hh:mm">{plan.date}</Moment>
                        </Text>
                        <Text style={styles.category}>{plan.category}</Text>
                        <Text style={styles.attendees}>
                          &#128101;{plan.counter}
                        </Text>
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

export default Category;

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
  searchIcon: {
    height: 30,
    boxShadow: "0px 0px 5px 0px rgba(183, 179, 179, 0.75)",
    borderRadius: "50%"
  }
});

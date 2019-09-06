import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "react-router-dom";
import plansAPI from "../../services/plan-service";
import Nav from "../../components/Nav";
import LowNav from "../../components/LowNav";

class Categories extends Component {
  state = {
    categories: [],
    loading: true
  };

  componentDidMount() {
    plansAPI
      .getAllCategories()
      .then(categories => this.setState({ categories, loading: false }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <View>
        <Nav />
        <View style={styles.plansWrapper}>
          <Text>Categories</Text>
          <View style={styles.plansListCategories}>
            {!this.state.loading &&
              this.state.categories.map(category => {
                return (
                  <Link
                    key={category._id}
                    to={`/plans/category/${category.category}`}
                  >
                    <View style={styles.card}>
                      <Text>{category.category}</Text>
                      <Text>{category.length}</Text>
                    </View>
                  </Link>
                );
              })}
          </View>
        </View>
        <LowNav />
      </View>
    );
  }
}

export default Categories;

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

import React, { Component } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import plansAPI from "../../services/plan-service";
import BackNav from "../../components/BackNav";

class CreatePlan extends Component {
  state = {
    title: "",
    description: "",
    date: "",
    category: "",
    // location: {
    //   type: "Point",
    //   coordinates: [
    //       0,
    //       0
    //   ]
    // },
    redirect: false,
    message: ""
  };

  handleOnChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    const { title, description, date, category, message } = this.state;
    event.preventDefault();
    plansAPI
      .addOnePlan({
        title,
        description,
        date,
        category
        // location,
      })
      .then(({ data }) => {
        data.message
          ? this.setState({
              message: data.message
            })
          : this.setState({
              redirect: true
            });
      })
      .catch(error => console.log(error));
  };

  render() {
    const { title, description, date, category, redirect } = this.state;
    return (
      <>
        <BackNav />
        <View style={styles.formWithTitleWrapper}>
          <Text>Create your plan</Text>
          <form style={styles.form} onSubmit={this.handleSubmit}>
            <label htmlFor="title" style={styles.np}>
              <TextInput
                type="text"
                name="title"
                id="title"
                onChange={this.handleOnChange}
                value={title}
                minLength="8"
                maxLength="60"
                placeholder="&nbsp;"
                required
              />
              <span style={styles.label}>Title</span>
            </label>

            <label htmlFor="description" style={styles.inp}>
              <TextInput
                type="text"
                name="description"
                id="description-create"
                onChange={this.handleOnChange}
                value={description}
                minLength="8"
                maxLength="50"
                placeholder="&nbsp;"
                required
              />
              <span style={styles.label}>Short description</span>
            </label>

            <Text htmlFor="date" style={styles.inp}>
              <span style={styles.label}>Date</span>
              <TextInput
                style={styles.dateInput}
                type="datetime-local"
                name="date"
                id="date"
                onChange={this.handleOnChange}
                value={date}
                placeholder="&nbsp;"
                required
              />
            </Text>

            <label htmlFor="category">Category</label>
            <select
              defaultValue={this.state.category}
              name="category"
              onChange={this.handleOnChange}
              value={category}
            >
              <option disabled={true} value="">
                Choose category
              </option>
              <option value="Culture">Culture</option>
              <option value="Drinks">Drinks</option>
              <option value="Food">Food</option>
              <option value="Party">Party</option>
              <option value="Shopping">Shopping</option>
              <option value="Sports">Sports</option>
              <option value="Travel">Travel</option>
              <option value="Volunteering">Volunteering</option>
              <option value="Others">Others</option>
            </select>
            {this.state.message ? <p id="error">{this.state.message}</p> : null}

            <View style={styles.formButtons}>
              <Button type="submit" style={styles.btnBtnSignup}>
                Create
              </Button>
            </View>
          </form>
          {redirect ? <Redirect to="/plans" /> : null}
        </View>
      </>
    );
  }
}

export default CreatePlan;

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

import firebase from "firebase";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import db from "../config";
import MyHeader from "../components/myHeader";
import moment from "moment";

export default class CalendarSample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStartDate: null,
      userId: firebase.auth().currentUser.email,
      milkDetails: [],
      rateOfCow: 0,
      rateOfBuffalo: 0,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentDidMount() {
    this.getRates();
  }

  getRates = () => {
    db.collection("users")
      .where("username", "==", this.state.userId)
      .get()
      .then((doc) => {
        doc.forEach((d) => {
          this.setState({
            rateOfCow: parseFloat(d.data().rateOfCowMilk),
            rateOfBuffalo: parseFloat(d.data().rateOfBuffaloMilk),
          });
        });
      });
  };

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
      milkDetails: [],
    });
    this.getTransactionData(date);
  }

  getTransactionData = async (selectedDate) => {
    console.log(selectedDate);
    var m = new moment(selectedDate);
    var dt = m.format("DD-MM-YYYY");
    console.log(dt);
    const query = await db
      .collection("all_transactions")
      .where("date", "==", dt)
      .where("user_id", "==", this.state.userId)
      .get();
    query.docs.map((d) => {
      this.setState({
        milkDetails: [...this.state.milkDetails, d.data()],
      });
    });

    console.log(this.state.milkDetails);
  };

  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : "";
    var cowMilkCounter = 0;
    var buffaloMilkCounter = 0;

    // // for (var milk in this.state.milkDetails) {
    //   console.log(this.state.milkDetails[milk])
    //   if (milk.type_of_milk === "CowMilk") {
    //     cowMilkCounter += milk.litres_of_milk;
    //   } else {
    //     buffaloMilkCounter += milk.litres_of_milk;
    //   }
    // }
    this.state.milkDetails.map((m) => {
      if (m.type_of_milk === "CowMilk") {
        cowMilkCounter += parseFloat(m.litres_of_milk);
      } else {
        buffaloMilkCounter += parseFloat(m.litres_of_milk);
      }
    });
    var costOfCow = cowMilkCounter * this.state.rateOfCow;
    var costOfBuffalo = buffaloMilkCounter * this.state.rateOfBuffalo;
    return (
      <View style={styles.container}>
        <MyHeader title="Calendar" navigation={this.props.navigation} />
        <CalendarPicker onDateChange={this.onDateChange} />

        <View>
          {/* <Text>SELECTED DATE:{startDate}</Text> */}
          <Text> Cow Milk: {cowMilkCounter} litres</Text>
          <Text> Buffalo Milk: {buffaloMilkCounter} litres</Text>
          <Text>Total Cost of Cow Milk: INR {costOfCow}</Text>
          <Text>Total Cost of Buffalo Milk: INR {costOfBuffalo}</Text>
          <Text>
            Total Cost of Milk for the Day: INR {costOfBuffalo + costOfCow}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    //marginTop: 100,
  },
});

import * as React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

import firebase from "firebase";
import MyHeader from "../components/myHeader";
import db from "../config";
import { Header } from "react-native/Libraries/NewAppScreen";
import { RFValue } from "react-native-responsive-fontsize";

export default class SettingScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      rateOfCowMilk: "",
      rateOfBuffaloMilk: "",
      rateOfCurd: "",
      rateOfGhee: "",
      showRates: true,
      isModalVisible: false,
      username: "",
      password: "",
      confirmPassword: "",
      docId: "",
    };
  }

  getUserDetails = () => {
    var user = firebase.auth().currentUser;
    var email = user.email;
    db.collection("users")
      .where("username", "==", email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            rateOfBuffaloMilk: data.rateOfBuffaloMilk,
            rateOfCowMilk: data.rateOfCowMilk,
            rateOfCurd: data.rateOfCurd,
            rateOfGhee: data.rateOfGhee,
            docId: doc.id,
          });
        });
      });
  };

  updateUserDetails = () => {
    db.collection("users").doc(this.state.docId).update({
      rateOfBuffaloMilk: this.state.rateOfBuffaloMilk,
      rateOfCowMilk: this.state.rateOfCowMilk,
      rateOfCurd: this.state.rateOfCurd,
      rateOfGhee: this.state.rateOfGhee,
    });
    Alert.alert("Profile Updated Successfully");
  };

  componentDidMount() {
    this.getUserDetails();
  }

  render() {
    return (
      <View style={styles.container}>
        <MyHeader title="Profile Settings" navigation={this.props.navigation} />

        <View style={styles.formContainer}>
          <TextInput
            style={styles.formTextInput}
            placeholder={"Rate of Cow Milk in your Area"}
            maxLength={3}
            keyboardType={"numeric"}
            value={this.state.rateOfCowMilk}
            onChangeText={(text) => {
              this.setState({
                rateOfCowMilk: text,
              });
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder={"Rate of Buffalo Milk in your Area"}
            maxLength={3}
            keyboardType={"numeric"}
            value={this.state.rateOfBuffaloMilk}
            onChangeText={(text) => {
              this.setState({
                rateOfBuffaloMilk: text,
              });
            }}
          />

          <TextInput
            style={styles.formTextInput}
            placeholder={"Rate of Curd in your Area"}
            maxLength={3}
            keyboardType={"numeric"}
            value={this.state.rateOfCurd}
            onChangeText={(text) => {
              this.setState({
                rateOfCurd: text,
              });
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder={"Rate of Ghee in your Area"}
            keyboardType={"numeric"}
            value={this.state.rateOfGhee}
            onChangeText={(text) => {
              this.setState({
                rateOfGhee: text,
              });
            }}
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              this.updateUserDetails();
            }}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CCFFCC",
  },
  formContainer: {
    marginTop: RFValue(35),
    flex: 1,
    justifyContent: "center",
  },

  formTextInput: {
    width: "90%",
    height: RFValue(50),
    padding: RFValue(10),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "grey",
    marginBottom: RFValue(20),
    marginLeft: RFValue(10),
  },
  saveButton: {
    width: 100,
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(25),
    backgroundColor: "#FF99CC",
    shadowColor: "#000",
    margin: RFValue(10),
    marginBottom: RFValue(5),
    marginTop: RFValue(20),
    marginLeft: RFValue(50),
    marginRight: RFValue(50),
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
  },

  saveButtonText: {
    fontSize: RFValue(23),
    fontWeight: "bold",
    color: "#fff",
  },
});

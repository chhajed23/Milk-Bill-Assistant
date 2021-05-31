import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Picker,
} from "react-native";

import MyHeader from "../components/myHeader";
import db from "../config";
import firebase from "firebase";
import ini from "../ini.json";
import { RFValue } from "react-native-responsive-fontsize";

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    // const editIni = require("../ini.json");
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
      place: "Camp",
      
    };
  }

  userSignUp = (username, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("password doesn't match\nCheck your password.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(username, password)
        .then(() => {
          db.collection("users").add({
            username: this.state.username,
            rateOfBuffaloMilk: this.state.rateOfBuffaloMilk,
            rateOfCowMilk: this.state.rateOfCowMilk,
            rateOfCurd: this.state.rateOfCurd,
            rateOfGhee: this.state.rateOfGhee,
            address: this.state.place,
          });
          return Alert.alert("User Added Successfully", "", [
            {
              text: "OK",
              onPress: () => this.setState({ isModalVisible: false }),
            },
          ]);
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    }
  };

 

  userLogin = (username, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        Alert.alert("Login Sucessfully");
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <ScrollView style={styles.scrollview}>
          <View style={styles.signupView}>
            <Text style={styles.signupText}> SIGN UP </Text>
          </View>

          <View style={{ flex: 0.95 }}>
            <Text style={styles.label}>Rate of Cow Milk in your Area </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Rate of Cow Milk in your Area"}
              maxLength={3}
              keyboardType={"numeric"}
              onChangeText={(text) => {
                this.setState({
                  rateOfCowMilk: text,
                });
              }}
            />

            <Text style={styles.label}>Rate of Buffalo Milk in your Area </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Rate of Buffalo Milk in your Area"}
              maxLength={3}
              keyboardType={"numeric"}
              onChangeText={(text) => {
                this.setState({
                  rateOfBuffaloMilk: text,
                });
              }}
            />

            <Text style={styles.label}>Rate of Curd in your Area</Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Rate of Curd in your Area"}
              maxLength={3}
              keyboardType={"numeric"}
              onChangeText={(text) => {
                this.setState({
                  rateOfCurd: text,
                });
              }}
            />

            <Text style={styles.label}> Rate of Ghee in your Area</Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Rate of Ghee in your Area"}
              keyboardType={"numeric"}
              onChangeText={(text) => {
                this.setState({
                  rateOfGhee: text,
                });
              }}
            />

            <Text style={styles.label}>Address </Text>
            <View style={styles.formInput}>
              <Picker
                selectedValue={this.state.place}
                onValueChange={(place) => this.setState({ place })}
                style={{
                  color: "red",
                  width: 160,
                  //margin: RFValue(10),
                  //borderRadius: 5,
                  width: "90%",
                  height: RFValue(45),
                  padding: RFValue(10),
                  borderWidth: 1,
                  borderRadius: 2,
                  borderColor: "grey",
                  paddingBottom: RFValue(10),
                  marginLeft: RFValue(20),
                  marginBottom: RFValue(14),
                }}
                mode="dropdown"
              >
                <Picker.Item label="Camp" value="Camp" />
                <Picker.Item label="Nibm" value="Nibm" />
                <Picker.Item label="Salisbary Park" value="Salisbary Park" />
                <Picker.Item label="Marketyard" value="Marketyard" />
                <Picker.Item label="Bibewadi" value="Bibewadi" />
                <Picker.Item label="Gangadham" value="Gangadham" />
                <Picker.Item label="Timber Market" value="Timber Market" />
                <Picker.Item label="Lulanagar" value="Lulanagar" />
                <Picker.Item label="Shrukwar Peth" value="Shrukwar Peth" />
                <Picker.Item label="Ravivar Peth" value="Ravivar Peth" />
              
                
              </Picker>
            </View>

            <Text style={styles.label}>Email </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Email"}
              keyboardType={"email-address"}
              onChangeText={(text) => {
                this.setState({
                  username: text,
                });
              }}
            />

            <Text style={styles.label}> Password </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Password"}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Confrim Password"}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  confirmPassword: text,
                });
              }}
            />
            <View style={{ flex: 0.2, alignItems: "center" }}>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() =>
                  this.userSignUp(
                    this.state.username,
                    this.state.password,
                    this.state.confirmPassword
                  )
                }
              >
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
              <Text
                style={styles.cancelButtonText}
                onPress={() => {
                  this.setState({ isModalVisible: false });
                }}
              >
                Cancel
              </Text>
            </View>
          </View>
        </ScrollView>
      </Modal>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.showModal()}
        <View style={{ flex: 0.25 }}>
          <View style={{ flex: 0.15 }} />
          <View style={styles.santaView}>
            <Image
              source={require("../assets/up-logo.jpeg")}
              style={styles.santaImage}
            />
          </View>
        </View>
        <View style={{ flex: 0.45 }}>
          <View style={styles.TextInput}>
            <TextInput
              style={styles.loginBox}
              placeholder="abc@example.com"
              placeholderTextColor="gray"
              keyboardType="email-address"
              onChangeText={(text) => {
                this.setState({
                  emailId: text,
                });
              }}
            />
            <TextInput
              style={[styles.loginBox, { marginTop: RFValue(15) }]}
              secureTextEntry={true}
              placeholder="Enter Password"
              placeholderTextColor="gray"
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />
          </View>
          <View style={{ flex: 0.5, alignItems: "center" }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.userLogin(this.state.emailId, this.state.password);
              }}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.setState({ isModalVisible: true })}
            >
              <Text style={styles.buttonText}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 0.3 }}>
          <Image
            source={require("../assets/down-logo.jpeg")}
            style={styles.bookImage}
            resizeMode={"stretch"}
          />
        </View>
      </View>

      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6fc0b8",
  },
  loginBox: {
    width: "80%",
    height: RFValue(50),
    borderWidth: 1.5,
    borderColor: "#ffffff",
    fontSize: RFValue(20),
    paddingLeft: RFValue(10),
  },
  button: {
    width: "80%",
    height: RFValue(50),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(25),
    backgroundColor: "#ffff",
    shadowColor: "#000",
    marginBottom: RFValue(10),
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText: {
    color: "#32867d",
    fontWeight: "200",
    fontSize: RFValue(20),
  },
  label: {
    fontSize: RFValue(13),
    color: "#717D7E",
    fontWeight: "bold",
    paddingLeft: RFValue(10),
    marginLeft: RFValue(20),
  },
  formInput: {
    width: "90%",
    height: RFValue(45),
    padding: RFValue(10),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "grey",
    paddingBottom: RFValue(10),
    marginLeft: RFValue(20),
    marginBottom: RFValue(14),
  },
  registerButton: {
    width: "75%",
    height: RFValue(50),
    marginTop: RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(3),
    backgroundColor: "#32867d",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: RFValue(10),
  },
  registerButtonText: {
    fontSize: RFValue(23),
    fontWeight: "bold",
    color: "#fff",
  },
  cancelButtonText: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: "#32867d",
    marginTop: RFValue(10),
  },
  scrollview: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  signupView: {
    flex: 0.05,
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: "#32867d",
  },
  santaView: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10),
  },
  santaImage: {
    width: "50%",
    height: "100%",
    resizeMode: "stretch",
  },
  TextInput: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  bookImage: {
    width: "100%",
    height: RFValue(220),
  },
});

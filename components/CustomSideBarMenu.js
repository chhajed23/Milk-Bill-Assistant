import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import { Avatar, Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
import db from "../config";
import { RFValue } from "react-native-responsive-fontsize";

export default class CustomSideBarMenu extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.3,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#32867d",
          }}
        >
          <Image
            source={require("../assets/drawer.png")}
            style={styles.bookImage}
          />
        </View>
        <View style={{ flex: 0.6 }}>
          <DrawerItems {...this.props} />
        </View>
        <View style={{ flex: 0.1 }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: "100%",
              height: "100%",
            }}
            onPress={() => {
              this.props.navigation.navigate("WelcomeScreen");
              firebase.auth().signOut();
            }}
          >
            <Icon
              name="logout"
              type="antdesign"
              size={RFValue(20)}
              iconStyle={{ paddingLeft: RFValue(10) }}
            />

            <Text
              style={{
                fontSize: RFValue(15),
                fontWeight: "bold",
                marginLeft: RFValue(30),
              }}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerItemsContainer: {
    flex: 0.6,
  },
  logOutContainer: {
    flex: 0.2,
    justifyContent: "flex-end",
    paddingBottom: 30,
    flexDirection: "row",
  },
  logOutButton: {
    height: 60,
    width: "100%",
    justifyContent: "center",
    padding: 10,
  },
  logOutText: {
    fontSize: RFValue(15),
    fontWeight: "bold",
    marginLeft: RFValue(30),
  },
  bookImage: {
    width: "100%",
    height: RFValue(220),
    margin:RFValue (25),
  },
});

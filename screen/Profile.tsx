import React from "react";
import { View } from "react-native";
import ProfileLoggedIn from "./Profile/ProfileLoggedIn";

const Profile = (props: any) => {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      {/* <ProfileNotLoggedIn props={props} /> */}
      <ProfileLoggedIn props={props} />
    </View>
  );
};

export default Profile;

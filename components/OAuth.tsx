/* eslint-disable prettier/prettier */
import { View, StyleSheet, Text } from "react-native";
import CustonButton from "./CustonButton";

const OAuth = () => {
  const handleGoogleSingIn = async() => {};
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.top} />
        <Text>Or</Text>
        <View style={styles.top} />
      </View>

      <CustonButton
        title="Log In with Google"
        onPress={() => {handleGoogleSingIn()}}
        bgVariant="outline"
        textVariant="default"
        IconLeft={false}
        IconRight={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  top: {
    flex: 1,
    height: 1,
    backgroundColor: "black",
  },
});

export default OAuth;

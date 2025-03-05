import * as React from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import signUpImg from "@/assets/images/fondo1.png";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import OAuth from "@/components/OAuth";
import CustonButton from "@/components/CustonButton";
import InputField from "@/components/CustonInput";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <>
        <View style={styles.modalContainerInner}>
          <Text>Verification</Text>
          <Text>We've sent a verification code to {emailAddress}</Text>
          <InputField
            label="Code"
            icon=""
            secureTextEntry={true}
            keyboardType="numeric"
            value={code}
            placeholder="Enter your verification code"
            onChangeText={(code) => setCode(code)}
          />
          <CustonButton
            title="Verify email"
            onPress={onVerifyPress}
            bgVariant="primary"
            textVariant="default"
            IconLeft={false}
            IconRight={false}
          />
        </View>
      </>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image source={signUpImg} style={styles.image} />
        <Text style={styles.title}>Create Your Account</Text>
      </View>
      <View style={styles.cardContainer}>
        <Text>Sign up</Text>
        <InputField
          label="Email"
          placeholder="Enter your email"
          icon=""
          value={emailAddress}
          onChangeText={(email) => setEmailAddress(email)}
        />
        <InputField
          label="Create Password"
          placeholder="Enter password"
          icon=""
          secureTextEntry={true}
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
        <CustonButton
          title="Sing Up"
          onPress={onSignUpPress}
          bgVariant="primary"
          textVariant="default"
          IconLeft={false}
          IconRight={false}
        />
      </View>
      <OAuth />

      <Link href="/(auth)/sign-in">
        <Text>Already have an account</Text>
        <Text> Log In</Text>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  image: {
    width: "100%",
    height: 300,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  modalContainerInner: {
    backgroundColor: "white",
    borderRadius: 30,
    height: 400,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

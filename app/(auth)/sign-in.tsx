import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, Button, View } from "react-native";
import React from "react";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button title="Sign in" onPress={onSignInPress} />
      <View>
        <Text>Don't have an account?</Text>
        <Link href="/sign-up">
          <Text>Sign up</Text>
        </Link>
      </View>
    </View>
  );
}

/* import CustonButton from "@/components/CustonButton";
import InputField from "@/components/CustonInput";
import OAuth from "@/components/OAuth";
import { Link } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View, Image, Text, StyleSheet } from "react-native";
import signUpImg from "@/assets/images/fondo1.png";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const onSignInPress = async () => {};
  return (
    <ScrollView style={styles.container}>
      <View>
        <View>
          <Image source={signUpImg} style={styles.image} />
          <Text style={styles.title}>Welcome</Text>
        </View>
        <View style={styles.cardContainer}>
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon=""
            value={form.email}
            onChange={(value: any) =>
              setForm((prevForm) => ({
                ...prevForm,
                email: value,
              }))
            }
          />
          <InputField
            label="Password"
            placeholder="Create Password"
            icon=""
            secureTextEntry={true}
            value={form.password}
            onChange={(value: any) =>
              setForm((prevForm) => ({
                ...prevForm,
                password: value,
              }))
            }
          />
          <CustonButton
            title="Log In"
            onPress={onSignInPress}
            bgVariant="primary"
            textVariant="default"
            IconLeft={false}
            IconRight={false}
          />

          <OAuth />

          <Link href="/(auth)/sign-up">
            <Text>Don't have an account</Text>
            <Text> Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

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
});

export default SignIn;
 */

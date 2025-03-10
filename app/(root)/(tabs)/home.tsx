import { Link } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";

const Home = () => {
  const { user } = useUser();
  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  );
};

export default Home;

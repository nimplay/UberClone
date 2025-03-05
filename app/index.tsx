import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { View, Text } from "react-native";

export default function App() {
  const { isSignedIn } = useAuth();
  if (isSignedIn) {
    return (
      <View>
        <Redirect href={"/(root)/(tabs)/home"} />
      </View>
    );
  }

  return (
    <View>
      <Redirect href="/(auth)/welcome" />
    </View>
  );
}

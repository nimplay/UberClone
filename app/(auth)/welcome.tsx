import React, { useRef } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Animated,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";

const HEADER_HEIGHT = 300; // Altura de la imagen de fondo

export default function App() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const backgroundTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -50], // Desplazamiento en el efecto Parallax
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => console.log("Button pressed")}
        style={styles.skipButton}
      >
        <Text style={styles.text}>Skip {">>"} </Text>
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }, // Cambia a false si sigue dando error
        )}
      >
        {/* Imagen de fondo con Parallax */}
        <Animated.View
          style={[
            styles.header,
            { transform: [{ translateY: backgroundTranslate }] },
          ]}
        >
          <Image
            source={require("../../assets/images/fondo1.png")}
            style={styles.image}
          />
        </Animated.View>

        {/* Contenido */}
        <View style={styles.content}>
          <Text style={styles.title}>MoveFast</Text>
          <Text style={styles.text}>Stay moving and without delays</Text>
          <Text style={styles.text}>
            Discover the best convenience of finding your perfect ride with
            MoveFast
          </Text>
          <Text style={styles.text}>Your best option</Text>
        </View>

        {/* Botón de siguiente */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Button pressed")}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ajusta a toda la pantalla
    alignItems: "center",
  },
  skipButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 20,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 30,
    marginTop: 20,
    backgroundColor: "#404D73",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});

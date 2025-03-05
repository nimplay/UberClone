import React, { useEffect, useRef, useState } from "react";
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
import { useRouter } from "expo-router";
import Swiper from "react-native-swiper";
import { onboarding } from "../../constants/index";
import CustonButton from "@/components/CustonButton";

const HEADER_HEIGHT = 400; // Altura de la imagen de fondo

export default function App() {
  const router = useRouter();
  const swiperRef = useRef<Swiper>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastIndex = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-up")}
        style={styles.skipButton}
      >
        <Text style={styles.text}>Skip </Text>
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
      >
        <View style={styles.content}>
          <Text style={styles.title}>MoveFast</Text>
          <Swiper
            ref={swiperRef}
            loop={false}
            dot={<View style={styles.dash} />}
            activeDot={<View style={styles.dashactive} />}
            onIndexChanged={(index) => setActiveIndex(index)}
            style={{ height: 600, width: 360 }}
          >
            {onboarding.map((item) => (
              <View key={item.id}>
                <Image
                  source={item.img}
                  style={styles.image}
                  resizeMode="contain"
                />
                <Text style={styles.text}>{item.title}</Text>
                <Text style={styles.text}>{item.description}</Text>
                <Text style={styles.text}>Your best option</Text>
              </View>
            ))}
          </Swiper>
          <CustonButton
            onPress={() => {
              if (!swiperRef.current) {
                console.log("Swiper ref is not defined");
                return;
              }
              if (isLastIndex) {
                router.replace("/(auth)/sign-up");
              } else {
                console.log("Dentro de swiper");
                swiperRef.current?.scrollBy(1);
              }
            }}
            title={isLastIndex ? "Get Started" : "Next"}
            bgVariant="primary"
            textVariant="default"
            IconLeft={false}
            IconRight={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    position: "absolute",
    top: 20,
    right: 40,
    zIndex: 10,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 300,
  },
  content: {
    paddingTop: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
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
  dash: {
    width: 32,
    height: 4,
    backgroundColor: "gray",
    marginRight: 2,
    marginLeft: 2,
  },
  dashactive: {
    width: 32,
    height: 5,
    backgroundColor: "black",
    marginRight: 2,
    marginLeft: 2,
  },
});

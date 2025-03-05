/* eslint-disable prettier/prettier */
import React from "react";
import { TouchableOpacity, Text } from "react-native";

const getBgVariantStyle = (variant: string) => {
  switch (variant) {
    case "secondary":
      return "gray";
    case "danger":
      return "gray";
    case "success":
      return "gray";
    case "outline":
      return "white";
    default:
      return "#7783A6";
  }
};

const getTextVariantStyle = (variant: string) => {
  switch (variant) {
    case "normal":
      return "normal";
    default:
      return "bold";
  }
};

type Props = {
  title: string;
  onPress: () => void;
  bgVariant: string;
  textVariant: string;
  IconLeft: boolean;
  IconRight: boolean;
};

const CustonButton = ({
  title,
  onPress,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
}: Props) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: `${getBgVariantStyle(bgVariant)}`,
      display: "flex",
      gap: "4px",
      flexDirection: "row",
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 30,
      minWidth: 150,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {IconLeft && <Text>{"<"}</Text>}
    <Text
      style={{
        fontWeight: `${getTextVariantStyle(textVariant)}`,
      }}
    >
      {title}
    </Text>
    {IconRight && <Text>{">"}</Text>}
  </TouchableOpacity>
);

export default CustonButton;

/* eslint-disable prettier/prettier */
import { useState } from "react";
import { InputFieldProps } from "../types/type";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Platform,
  Keyboard,
} from "react-native";

const isWeb = Platform.OS === "web";

const InputField = ({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  className,
  value,
  onChangeText,
  ...props
}: InputFieldProps) => {
  const [text, setText] = useState(value || ""); // Estado para manejar la entrada de texto

  const handleChangeText = (input: string) => {
    setText(input); // Actualiza el estado local
    if (onChangeText) {
      onChangeText(input); // Llama a la función si se proporciona
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      enabled={!isWeb}
    >
      {isWeb ? (
        <View style={[styles.container, containerStyle]}>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
          <View style={styles.inputContainer}>
            {icon && <Image source={icon} style={styles.icon} />}
            <TextInput
              style={[styles.inputStyle, inputStyle]}
              secureTextEntry={secureTextEntry}
              value={text} // Asegura que el valor sea una cadena
              onChangeText={handleChangeText} // Maneja el cambio de texto
              {...props}
            />
          </View>
        </View>
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.container, containerStyle]}>
            <Text style={[styles.label, labelStyle]}>{label}</Text>
            <View style={styles.inputContainer}>
              {icon && <Image source={icon} style={styles.icon} />}
              <TextInput
                style={[styles.inputStyle, inputStyle]}
                secureTextEntry={secureTextEntry}
                value={text} // Asegura que el valor sea un string
                onChangeText={handleChangeText} // Maneja cambios en el texto
                {...props}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 5,
    width: "100%",
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#7783A6",
    borderRadius: 30,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  inputStyle: {
    flex: 1,
    padding: 15,
    fontSize: 15,
    color: "#333",
    outlineStyle: "none",
  },
});

export default InputField;

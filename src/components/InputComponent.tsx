import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface InputComponentProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean; // For password field
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad"; 
}

const InputComponent: React.FC<InputComponentProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default", 
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!isPasswordVisible && secureTextEntry}
        keyboardType={keyboardType} 
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
          <MaterialIcons
            name={isPasswordVisible ? 'visibility' : 'visibility-off'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    padding: 5,
   
   
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  iconContainer: {
   marginRight: 30,
  },
});

export default InputComponent;

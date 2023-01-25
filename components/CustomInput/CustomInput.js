import { View, Text,TextInput,StyleSheet} from 'react-native'
import React from 'react'
import Colors from '../../assets/colors/colors'
import useFont from '../../useFont'

const CustomInput = ({value,setValue,placeholder,secureTextEntry,error}) => {
  const fonstloaded = useFont();

  const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '6%',

        borderColor: error ? 'red' : Colors.secondary,
        borderWidth: 1,
        borderRadius:4,

        paddingHorizontal: 7,
        marginVertical: 10,

        marginBottom: 15,
    },

    input: {
      height: '100%',
      fontFamily:"GilroyLight",
    }
  })
  return (
    <View style = {styles.container}>
      <TextInput
        value = {value}
        onChangeText = {setValue}
        placeholder = {placeholder}
        style = {styles.input}
        secureTextEntry = {secureTextEntry}
      />
    </View>
  )
}

export default CustomInput
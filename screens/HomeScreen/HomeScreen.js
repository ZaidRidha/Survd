import { View, Text,StyleSheet} from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed';
import { Header } from '@rneui/themed';
import useFont from '../../useFont';


const HomeScreen = () => {
  useFont();

  return (
    <View style = {styles.root}>
    <Header
    backgroundColor='white'
      centerComponent={{
        text: "Home",
        style: { color: "#000000", fontSize:25,fontFamily:"GilroyBold"},

      }}
      rightComponent={
        <Icon type="material-community" name="bell" color="black" size={25} />
      }
    />

    </View>
  )
}

const styles = StyleSheet.create({

  root:{
    flex:1,
  },

  inner:{

  }

})

export default HomeScreen
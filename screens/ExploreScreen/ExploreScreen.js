import { View, Text,ScrollView,TouchableWithoutFeedback,Keyboard,Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const ExploreScreen = () => {
  return (

    <ScrollView >

      <Text className = "text-red-500">ExploreScreen</Text>
      <Image source = {require('../../assets/images/bizlogo.jpg')}/>

    </ScrollView>

  )
}

export default ExploreScreen
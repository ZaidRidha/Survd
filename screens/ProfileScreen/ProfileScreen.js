import { View, Text,StyleSheet,SafeAreaView, ScrollView} from 'react-native'
import React from 'react'
import { Button, Icon } from '@rneui/themed';
import { authentication } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const signuserOut = () => {
        signOut(authentication).then(() => {
          // Sign-out successful.
          navigation.replace('Login');
        }).catch((error) => {
          // An error happened.
        });
      }
  return (
    <SafeAreaView style = {styles.root}>
      <ScrollView style = {styles.inner}>
      <View className = "flex flex-row items-center">
      <Icon type="ant-design" name="user" color="black" size={38}  />
      <Text style = {styles.PoppinsMed} className = "ml-2 text-3xl">Zaid Ridha</Text>
      </View>


      <Text style = {styles.PoppinsMed} className = "mt-5 ml-2 text-xl">Account Settings</Text>
      <View className = "flex flex-row mt-4 items-center justify-between">
      <Text style = {styles.PoppinsReg} className = "self-center text-base ml-2 ">Personal Information</Text>
      <Icon type="antdesign" name="right" color="black" size={24} />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center',marginTop:5, }}>
      <View style={{flex: 0.98, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", marginTop:5, marginBottom:5, marginLeft:6,}} />   
      </View>
      

      <View className = "flex flex-row mt-4 items-center justify-between">
      <Text style = {styles.PoppinsReg} className = "self-center text-base ml-2 ">Payment Methods</Text>
      <Icon type="antdesign" name="right" color="black" size={24} />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center',marginTop:5, }}>
      <View style={{flex: 0.98, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", marginTop:5, marginBottom:5, marginLeft:6,}} />   
      </View>

      <View className = "flex flex-row mt-4 items-center justify-between">
      <Text style = {styles.PoppinsReg} className = "self-center text-base ml-2 ">Notification Settings</Text>
      <Icon type="antdesign" name="right" color="black" size={24} />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center',marginTop:5, }}>
      <View style={{flex: 0.98, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", marginTop:5, marginBottom:5, marginLeft:6,}} />   
      </View>

      <View className = "flex flex-row mt-4 items-center justify-between">
      <Text style = {styles.PoppinsReg} className = "self-center text-base ml-2 ">Privacy Settings</Text>
      <Icon type="antdesign" name="right" color="black" size={24} />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center',marginTop:5, }}>
      <View style={{flex: 0.98, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", marginTop:5, marginBottom:5, marginLeft:6,}} />   
      </View>


      <Text style = {styles.PoppinsMed} className = "mt-5 ml-2 text-xl">Business</Text>
      <View className = "flex flex-row mt-4 items-center justify-between">
      <Text style = {styles.PoppinsReg} className = "self-center text-base ml-2 ">My Business</Text>
      <Icon type="antdesign" name="right" color="black" size={24} />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center',marginTop:5, }}>
      <View style={{flex: 0.98, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", marginTop:5, marginBottom:5, marginLeft:6,}} />   
      </View>

      <Text style = {styles.PoppinsMed} className = "mt-5 ml-2 text-xl">Referral</Text>
      <View className = "flex flex-row mt-4 items-center justify-between">
      <Text style = {styles.PoppinsReg} className = "self-center text-base ml-2 ">Refer a vendor/user</Text>
      <Icon type="antdesign" name="right" color="black" size={24} />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center',marginTop:5, }}>
      <View style={{flex: 0.98, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", marginTop:5, marginBottom:5, marginLeft:6,}} />   
      </View>


      <Text style = {styles.PoppinsMed} className = "mt-5 ml-2 text-xl">Support</Text>

      <View className = "flex flex-row mt-4 items-center justify-between">
      <Text style = {styles.PoppinsReg} className = "self-center text-base ml-2 ">How to use</Text>
      <Icon type="antdesign" name="right" color="black" size={24} />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center',marginTop:5, }}>
      <View style={{flex: 0.98, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", marginTop:5, marginBottom:5, marginLeft:6,}} />   
      </View>

      <View className = "flex flex-row mt-4 items-center justify-between">
      <Text style = {styles.PoppinsReg} className = "self-center text-base ml-2 ">Health & Safety</Text>
      <Icon type="antdesign" name="right" color="black" size={24} />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center',marginTop:5, }}>
      <View style={{flex: 0.98, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", marginTop:5, marginBottom:5, marginLeft:6,}} />   
      </View>

      <View className = "flex flex-row mt-4 items-center justify-between">
      <Text style = {styles.PoppinsReg} className = "self-center text-base ml-2 ">Get Help</Text>
      <Icon type="antdesign" name="right" color="black" size={24} />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center',marginTop:5, }}>
      <View style={{flex: 0.98, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", marginTop:5, marginBottom:5, marginLeft:6,}} />   
      </View>


      <Text style = {styles.PoppinsMed} className = "mt-5 ml-2 text-xl">Legal</Text>

    <View className = "flex flex-row mt-4 items-center justify-between">
    <Text style = {styles.PoppinsReg} className = "self-center text-base ml-2 ">Terms of service</Text>
    <Icon type="antdesign" name="right" color="black" size={24} />
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center',marginTop:5, }}>
    <View style={{flex: 0.98, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", marginTop:5, marginBottom:5, marginLeft:6,}} />   
    </View>


    <View className = "flex flex-row mt-4 items-center justify-between">
    <Text style = {styles.PoppinsReg} className = "self-center text-base ml-2 ">Privacy Policy</Text>
    <Icon type="antdesign" name="right" color="black" size={24} />
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center',marginTop:5, }}>
    <View style={{flex: 0.98, height: 1, backgroundColor: 'lightgray', alignSelf: "center", justifyContent: "center", marginTop:5, marginBottom:5, marginLeft:6,}} />   
    </View>


    
    <View style={{ marginBottom: 10 }}>
      <Button
        title="Log Out"
        buttonStyle={{
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'black',
          width: '100%',
          marginTop: 10,
          borderRadius:5,
        }}
        titleStyle={{
          color: 'black',
          fontFamily: 'PoppinsMed',
        }}
      />
    </View>
          




      </ScrollView>

    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },

  inner:{
    padding:5
  },

  PoppinsReg: {
    fontFamily: 'PoppinsReg',
  },


  PoppinsLight: {
    fontFamily: 'PoppinsLight',
  },


  PoppinsBold: {
    fontFamily: 'PoppinsBold',
  },


  PoppinsMed: {
    fontFamily: 'PoppinsMed',
  },
  
});


export default ProfileScreen
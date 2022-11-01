import { View, StyleSheet, Alert, Text, TextInput, TouchableOpacity } from "react-native";
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker'
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RadioForm from "react-native-simple-radio-button";
import {DatabaseConnected} from '../database/database'

const db =  DatabaseConnected.getConnection()

const EditDetail = ({route, navigation }) => {
  const {item} = route.params
    const [detailId, setDetailId] = useState('');
    const [name, setName] = useState('')
    const [date, setDate] = useState('01-01-2000')
    const [destination ,setDestination] = useState('')
    const [require ,setRequire] = useState('')
    const [description ,setDescription] = useState('')

    useEffect(() => {
      setDetailId(item.Id);
      setName(item.name_detail);
      setDate(item.date_detail);
      setDestination(item.destination_detail);
      setRequire(item.require_detail);
      setDescription(item.description_detail);
    }, []);
    let radio_props = [
        {label: 'Yes', value: 'Yes' },
        {label: 'No', value: 'No' }
      ];
    const submitted = () => {
    if(!name) {
        alert("Please input name !")
        return
    }
    if(!destination) {
        alert("Please input destination !")
        return
    }
    if(!date) {
        alert("Please pick date of trip !")
        return
    }
    if(!require) {
        alert("Please choose required risk assessment!")
        return
    } else {
      try {
        db.transaction((tx) => {
          tx.executeSql('UPDATE Detail SET name_detail = ? , date_detail = ? , destination_detail = ? , require_detail = ? , description_detail = ? where Id = ?',
          [name, date, destination, require, description, detailId], 
          (tx, results) => {
              console.log('Results', results.rowsAffected);
      });
    })
        navigation.navigate("Home")
        navigation.navigate("Detail")
      } catch (error) {
        console.log(error);
      }
        return alert(`Name: ${name}, Destination: ${destination}, Date of the Trip: ${date}, Risk Assessment: ${require}, Description: ${description}`)
    } 
    }




  return (
    <SafeAreaView style={styles.HomeContainer}>
    <View style={styles.Body} >
      
        <Text style={styles.text}>Name</Text>
        <TextInput style={styles.textInput} value={name} placeholder="Name of the Trip"  
        onChangeText={(name) => setName(name)} />

      
        <Text style={styles.text}>Destination</Text>
        <TextInput style={styles.textInput} value={destination} placeholder="Destination"  
        onChangeText={(destination) => setDestination(destination)} />

        <Text style={styles.text}>Date of the Trip</Text>  
        <TextInput style={styles.textInput} value={date} placeholder="Date"  
        onChangeText={(date) => setDate(date)} />

        <Text style={styles.text}>Require Risks Assessment</Text>
        <RadioForm
            radio_props={radio_props}
            onPress={(value) => {setRequire(value)}}
            value={require}
            formHorizontal={true}
            style={{marginLeft: '5%', marginTop: 5}}
        />

        <Text style={styles.text}>Description</Text>
        <TextInput style={styles.textInputArea} placeholder="Description ..."  
        onChangeText={(description) => setDescription(description)} />


      
      {/* <View > */}
        <TouchableOpacity 
        style={styles.CustomButton}
          onPress={submitted} title="Submit"
        ><Text>Edit</Text></TouchableOpacity>
                <TouchableOpacity 
        style={styles.CustomButton}
          onPress={submitted} title="Submit"
        ><Text>Delete</Text></TouchableOpacity>

      {/* </View> */}
  </View>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  HomeContainer: {
    paddingLeft: 30,
    flex: 1,
    // alignItems: "center",
    backgroundColor: "white",
  },
  text:{
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 5,
    fontSize: hp('2%') // End result looks like the provided UI mockup
  },
  textInput:{
    heigth:40,
    borderColor: "gray",
    width: "80%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginLeft:'5%',
    marginTop:5,
    height:40
  },
  textInputArea:{
    height:100,
    borderColor: "gray",
    width: "80%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginLeft:'5%',
    marginTop:5,
  },
  Body:{
    height: hp('50%'), // 70% of height device screen
    width: wp('90%')   // 80% of width device screen
  },
  CustomButton:{
    marginTop: 40,
    // flex:1,
    borderWidth: 1,
    borderRadius: 10,
    width:"80%",
    marginLeft:'5%',
    height:40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'space-around'
  }

});
export default EditDetail
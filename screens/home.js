import { View, StyleSheet, Alert, Text, TextInput, TouchableOpacity } from "react-native";
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker'
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RadioForm from "react-native-simple-radio-button";
import {DatabaseConnected} from '../database/database'

const db =  DatabaseConnected.getConnection()

const Home = ({navigation }) => {
    const [name, setName] = useState('')
    const [date, setDate] = useState('01-01-2000')
    const [destination ,setDestination] = useState('')
    const [require ,setRequire] = useState('')
    const [description ,setDescription] = useState('')

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
          tx.executeSql(
            "INSERT INTO Detail (name_detail, date_detail, destination_detail, require_detail, description_detail) VALUES (?,?,?,?,?)",
            [name, date, destination, require, description],
            (tx, results) => {
              console.log(results.rowsAffected);
            }
          );
        });
        navigation.navigate("Home")
      } catch (error) {
        console.log(error);
      }
        return alert(`Name: ${name}, Destination: ${destination}, Date of the Trip: ${date}, Risk Assessment: ${require}, Description: ${description}`)
    } 
    }

    const checkData = () => {
      try {
        db.transaction((tx) => {
          tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='Detail'", [], (tx, result) => {
            console.log('item:', result.rowsAffected.length);
            var len = result.rows.length;
            if (len > 0) {
              navigation.navigate("Home");
            }
          });
        });
      } catch (error) {
        console.log(error);
      }
    };

    const createTable = () => {
      db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS Detail(Id INTEGER PRIMARY KEY AUTOINCREMENT, name_detail VARCHAR(255), date_detail VARCHAR(255), destination_detail VARCHAR(255), require_detail VARCHAR(255), description_detail VARCHAR(255))",
        );
      });
    };

    useEffect(() => {
      checkData()
      createTable();
    },[])


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
        {/* <DatePicker
          style={{backgroundColor: 'white',
                  width: "90%", padding:5,
                  borderWidth: 1,borderRadius: 10,
                  borderColor: "gray",
                  paddingBottom:5,}}
        //   date={date} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={setDate}
      /> */}

        <Text style={styles.text}>Require Risks Assessment</Text>
        <RadioForm
            radio_props={radio_props}
            onPress={(value) => {setRequire(value)}}
            initial={'Yes'}
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
        ><Text>Add To Database</Text></TouchableOpacity>
        <TouchableOpacity 
        style={styles.CustomButton}
          onPress={() => navigation.navigate('Detail')} title="Submit"
        ><Text>Detail</Text></TouchableOpacity>
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
export default Home

import React, { useEffect, useState } from "react";
import {TouchableOpacity, Alert, StyleSheet, Text, TextInput, View, FlatList } from "react-native";
import {DatabaseConnected} from '../database/database'

const db =  DatabaseConnected.getConnection()

const Detail = ({ navigation }) => {
    const [listDetail, setListDetail] = useState([])

  // Call only one time when the component is loaded
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Detail',
        [],
        (tx, results) => {
          var detailItemp = [];
          for (let i = 0; i < results.rows.length; ++i)
          detailItemp.push(results.rows.item(i));
          setListDetail(detailItemp);
        }
      );
    });
  }, []);
  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#808080'
        }}
      />
    );
  };
  
  const listItemView = (item) => {
    return (
      <TouchableOpacity >
      <View
        key={item.Id}
        style={{ borderRadius: 5, margin: 5,
            borderWidth: 1, backgroundColor: 'white', padding: 10, flexDirection: "column",  
        flexWrap: "wrap", }}>
        <Text style={styles.text}>Id: {item.Id}</Text>
        <Text style={styles.text2}>Name: {item.name_detail}</Text>
        <Text style={styles.text2}>Destination: {item.destination_detail}</Text>
        <Text style={styles.text2}>Date: {item.date_detail}</Text>
        <Text style={styles.text2}>Require Assessment: {item.require_detail}</Text>
      </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.body}>
      <FlatList
            data={listDetail}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    borderRadius: 4,
  },
  
  text: {
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "flex-start",
  },
  text2: {
    fontSize: 14,
    justifyContent: "flex-start",
    marginLeft: 10
  },
  input: {
    borderWidth: 1,
    height: 50,
    width: 300,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 20,
    marginBottom: 15,
    marginTop: 15,
  },
  updateInput: {
    alignItems: "center",
  },
});

export default Detail;
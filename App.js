import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch("https://randomuser.me/api/?results=10")
      .then((response) => response.json())
      .then((data) => setData(data.results))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);


  const handleClick = (id) => {
    const newData = data.map((item) => {
      if (item.id.value === id) {
        const updatedItem = {
          ...item,
          isOpen: !item.isOpen,
        };

        return updatedItem;
      }

      return item;
    });
    setData(newData);
    console.log('id', id)
  }

  const renderOtherInformation = (city, country) => {
    return (
      <View style={styles.otherInfo}>
        <Text>{city} {country}</Text>
      </View>
    )
  }

  const renderCards = () => {
    return data.map((item, index) => {
      // Destructuring 
      const {location, picture, name, email, isOpen, id} = item;
      return (
        <View style={{alignItems: 'center'}} key={index}>
          <View key={index} style={[styles.cardContainer]}>
          <View>
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: picture.thumbnail }}
            />
          </View>
          <View>
            <Text style={{fontWeight: 'bold'}}>
              {name.first} {name.last}
            </Text>
            <Text>{email}</Text>
          </View>
          <Button title={isOpen ? "chiudi" : "apri"} onPress={() => handleClick(id.value)} />
        </View>
        {item.isOpen ? renderOtherInformation(location.city, location.country) : null}
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Persone strane</Text>
        {renderCards()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    padding: 10,
    width: "90%",
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 20
  },
  otherInfo: {
  }
});

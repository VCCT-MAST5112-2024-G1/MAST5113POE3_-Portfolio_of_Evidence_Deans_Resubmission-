import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type Main = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: string;
};

export default function DetailsScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { setMainData } = route.params;
  const [editedMeal, setEditedMeal] = useState<Main>({
    id: '',
    category: '',
    name: '',
    description: '',
    price: '',
  });


  const handleSaveMeal = () => {
    setMainData((prevMeals: Main[]) => [
      ...prevMeals,
      {
        ...editedMeal,
        id: (prevMeals.length + 1).toString(),
      },
    ]);
    navigation.goBack();
  };


  const handleCategoryChange = (itemValue: string) => {
    setEditedMeal((prevMeal) => ({
      ...prevMeal,
      category: itemValue,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Meal</Text>

      <Text>Meal Name</Text>
      <TextInput
        style={styles.input}
        value={editedMeal.name}
        onChangeText={(text) => setEditedMeal({ ...editedMeal, name: text })}
      />

      <Text>Description</Text>
      <TextInput
        style={styles.input}
        value={editedMeal.description}
        onChangeText={(text) =>
          setEditedMeal({ ...editedMeal, description: text })
        }
      />

      <Text>Price</Text>
      <TextInput
        style={styles.input}
        value={editedMeal.price}
        onChangeText={(text) => setEditedMeal({ ...editedMeal, price: text })}
      />

      <Text>Category</Text>
      <Picker
        selectedValue={editedMeal.category}
        onValueChange={handleCategoryChange}
      >
        <Picker.Item label="Meal" value="Meal" />
        <Picker.Item label="Starter" value="Starter" />
        <Picker.Item label="Dessert" value="Dessert" />
      </Picker>

      {/* Button to save the meal */}
      <Button title="Save Meal" onPress={handleSaveMeal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

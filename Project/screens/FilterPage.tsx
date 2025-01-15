import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { Main } from './HomeScreen';

export default function FilterPage({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { mainData, setMainData } = route.params;

  const handleRemoveMeal = (id: string) => {
    setMainData((prevMain: Main[]) => prevMain.filter((main: Main) => main.id !== id));
  };

  const handleRemoveAllMeals = () => {
    setMainData([]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Page</Text>
      <Text>Here you can remove saved meals</Text>

      <FlatList
        data={mainData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.mealItem}>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>{item.price}</Text>
            <Button title="Remove" onPress={() => handleRemoveMeal(item.id)} color="red" />
          </View>
        )}
      />

      <Button title="Remove All Meals" onPress={handleRemoveAllMeals} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mealItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
});

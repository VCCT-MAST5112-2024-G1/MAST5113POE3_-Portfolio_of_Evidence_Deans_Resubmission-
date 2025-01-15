import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackParams';

export type Main = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: string;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
  const [mainData, setMainData] = useState<Main[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Main | null>(null);

  const handleMealClick = (main: Main) => {
    setSelectedMeal(main);
  };

  const handleGoToFilterPage = () => {
    navigation.navigate('FilterPage', { mainData, setMainData });
  };

  const handleGoToDetailsPage = () => {
    navigation.navigate('Details', { setMainData });
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftPanel}>
        <Text style={styles.title}>Chef Christoffel</Text>

        <Text style={styles.categoryTitle}>Meals</Text>
        <FlatList
          data={mainData.filter((main) => main.category === 'Meal')}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleMealClick(item)}>
              <Text style={styles.mealName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        <Text style={styles.categoryTitle}>Starters</Text>
        <FlatList
          data={mainData.filter((main) => main.category === 'Starter')}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleMealClick(item)}>
              <Text style={styles.mealName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        <Text style={styles.categoryTitle}>Desserts</Text>
        <FlatList
          data={mainData.filter((main) => main.category === 'Dessert')}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleMealClick(item)}>
              <Text style={styles.mealName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.rightPanel}>
        {selectedMeal ? (
          <View style={styles.selectedMealBlock}>
            <Text style={styles.selectedMealTitle}>{selectedMeal.name}</Text>
            <Text style={styles.selectedMealDescription}>{selectedMeal.description}</Text>
            <Text style={styles.selectedMealPrice}>Price: {selectedMeal.price}</Text>
          </View>
        ) : (
          <Text style={styles.noSelectionText}>Select a meal to see details</Text>
        )}
      </View>

      <View style={styles.bottomButtons}>
        <Button title="Go to Filter Page" onPress={handleGoToFilterPage} />
        <View style={styles.buttonSpacer} />
        <Button title="Add a New Meal" onPress={handleGoToDetailsPage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftPanel: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    padding: 16,
    paddingTop: 40,
  },
  rightPanel: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  mealName: {
    fontSize: 18,
    marginBottom: 10,
    color: '#007BFF',
  },
  selectedMealBlock: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '80%',
  },
  selectedMealTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedMealDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  selectedMealPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSpacer: {
    width: 10,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  noSelectionText: {
    fontSize: 16,
    color: 'gray',
  },
});

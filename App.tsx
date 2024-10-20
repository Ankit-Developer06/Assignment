import * as React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import EmployeeDetail from './EmployeeDetail';


type RootStackParamList = {
  EmployeeDummy: undefined;
  EmployeeDetail: { name: string; age: number; salary: number };
};


const MyDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#282828',
    text: '#ffffff',
  },
};

const MyLightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
    text: '#282828',
  },
};


function HomeScreen({ navigation }: { navigation: any }): React.JSX.Element {
  const [employeeData, setEmployeeData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const scheme = useColorScheme();

  React.useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get('https://aamras.com/dummy/EmployeeDetails.json');
        setEmployeeData(response.data.employees);
      } catch (error) {
        setLoading(false);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);



  // Render the list item
  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        index === employeeData.length - 1 ? {} : styles.itemBorderBottom,
      ]}
      activeOpacity={0.5}
      onPress={() => navigation.navigate('EmployeeDetail', { name: item.name, age: item.age, salary: item.salary })}
    >
      <Text style={[styles.itemText, { color: scheme === 'dark' ? MyDarkTheme.colors.text : MyLightTheme.colors.text }]}>
        Name: {item.name}
      </Text>
      <Text style={[styles.itemText, { color: scheme === 'dark' ? MyDarkTheme.colors.text : MyLightTheme.colors.text }]}>
        Age: {item.age}
      </Text>
      <Text style={[styles.itemText, { color: scheme === 'dark' ? MyDarkTheme.colors.text : MyLightTheme.colors.text }]}>
        Salary: {item.salary}
      </Text>
    </TouchableOpacity>
  );

  // loader while fetching
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // If No Data
  if (!employeeData.length) {
    return (
      <View style={styles.centered}>
        <Text>No Data Found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={employeeData}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.name}-${item.age}`}
    />
  );
}






function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === 'dark' ? MyDarkTheme : MyLightTheme}>
      <Stack.Navigator>
        <Stack.Screen name="EmployeeDummy" component={HomeScreen} />
        <Stack.Screen name="EmployeeDetail" component={EmployeeDetail} options={{ title: 'Employee Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



// Styles
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    padding: 16,
  },
  itemText: {
    fontSize: 22,
  },
  itemBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default App;

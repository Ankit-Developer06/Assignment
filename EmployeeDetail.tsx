import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

function EmployeeDetail({ route }: { route: any }): React.JSX.Element {
  const { name, age, salary } = route.params; //Getting data from H

  return (
    <View style={styles.detailContainer}>
      <Text style={styles.detailText}>Name: {name}</Text>
      <Text style={styles.detailText}>Age: {age}</Text>
      <Text style={styles.detailText}>Salary: {salary}</Text>
    </View>
  );
}
const styles = StyleSheet.create({

  detailContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 24,
  },
});

export default EmployeeDetail
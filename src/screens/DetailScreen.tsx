import React from 'react';

import {
  View,
  Text,
 StyleSheet,
} from 'react-native';

const DetailScreen = ({route}: any) => {
  const {product} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {product.title}
      </Text>

      <Text style={styles.description}>
        {product.description}
      </Text>

      <Text style={styles.price}>
        ${product.price}
      </Text>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  description: {
    marginTop: 20,
    fontSize: 16,
  },

  price: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
 StyleSheet,
  ActivityIndicator,
  TextInput,
  Image,
} from 'react-native';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {fetchProducts} from '../redux/productSlice';

const HomeScreen = ({navigation}: any) => {
  const dispatch = useDispatch<any>();

  const {products = [], loading} = useSelector(
    (state: any) => state.products,
  );

  const [search, setSearch] = useState('');

  const [skip, setSkip] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts(0));
  }, []);

  const loadMore = () => {
    const newSkip = skip + 10;

    setSkip(newSkip);

    dispatch(fetchProducts(newSkip));
  };

  const filteredProducts = (products || []).filter(
    (item: any) =>
      item.title
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search products..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      <FlatList
        data={filteredProducts}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) =>
          item.id.toString()
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="large" />
          ) : null
        }
        renderItem={({item}: any) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('Details', {
                product: item,
              })
            }>
            <Image
              source={{uri: item.thumbnail}}
              style={styles.image}
            />

            <View style={styles.infoContainer}>
              <Text style={styles.title}>
                {item.title}
              </Text>

              <Text
                numberOfLines={2}
                style={styles.description}>
                {item.description}
              </Text>

              <Text style={styles.price}>
                ${item.price}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 10,
  },

  searchInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 4,
  },

  image: {
    width: '100%',
    height: 180,
  },

  infoContainer: {
    padding: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  description: {
    marginTop: 8,
    color: 'gray',
  },

  price: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
});
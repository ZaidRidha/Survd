import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Icon } from '@rneui/base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDocs, collection, onSnapshot } from 'firebase/firestore';
import { CheckBox } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import useFont from '../../useFont';
import { database } from '../../firebaseConfig';
import { addtoB, setcurrentVendor, selectCurrentVendor, clearBasket, selectCurrentBasket } from '../../slices/locSlice';

const PressService = () => {
  const navigation = useNavigation();
  useFont();
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [extras, setExtras] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [objectId, setobjectId] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const route = useRoute();
  const [checkedItems, setCheckedItems] = useState([]);
  const [basket, setBasket] = useState([]);
  const [extrasArray, setextrasArray] = useState([]);
  const [durationColor, setDurationColor] = useState('gray');
  const { name, price, duration, description, docId, notes, serviceId } = route.params;
  const dispatch = useDispatch();
  const currentVendor = useSelector(selectCurrentVendor);
  const reduxBasket = useSelector(selectCurrentBasket);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(database, 'barbers', docId, 'services', serviceId, 'extras'));
      const extrasArray = querySnapshot.docs.map((doc) => {
        const name = doc.get('name');
        const category = doc.get('category');
        const description = doc.get('description');
        const duration = doc.get('duration');
        const price = doc.get('price');
        const { id } = doc;
        return { name, category, description, duration, price, id };
      });
      setExtras(extrasArray);
    };

    const unsubscribe = onSnapshot(
      collection(database, 'barbers', docId, 'services', serviceId, 'extras'),
      (snapshot) => {
        fetchData();
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const groupedExtras = extras.reduce((groups, extra) => {
    const { category } = extra;
    groups[category] = groups[category] || [];
    groups[category].push(extra);
    return groups;
  }, {});

  const addtoBasket = () => {
    const basketWithExtras = [
      {
        ...basket,
        extras: extrasArray,
      },
    ];

    if (docId !== currentVendor) {
      dispatch(clearBasket());
    }

    dispatch(addtoB(basketWithExtras));
    dispatch(setcurrentVendor(docId));
    goBack();
  };

  const handleDurationChange = (value) => {
    setTotalDuration(value);
    setDurationColor('red'); // change color to red when duration is updated
    setTimeout(() => {
      setDurationColor('gray'); // change color back to gray after 500ms
    }, 700);
  };

  useEffect(() => {
    const basketLength = reduxBasket.length;
    setBasket({ name, price, duration, serviceId, objectId: basketLength });
  }, [name, price, duration]);

  useEffect(() => {
    const formattedPrice = price ? price.toFixed(2) : 0;
    setTotalPrice(formattedPrice);
    setTotalDuration(duration);
  }, [price]);

  const addStr = `Add Service ` + `(£${totalPrice})`;

  const goBack = () => {
    navigation.goBack();
  };

  console.log(groupedExtras);

  return (
    <View style={styles.root}>
      <View className="self-start ml-1">
        <TouchableOpacity onPress={goBack}>
          <Icon
            type="ant-design"
            name="close"
            color="black"
            size={38}
            style={styles.locationIcon}
          />
        </TouchableOpacity>
      </View>
      <View className="ml-5 mt-4">
        <Text
          style={styles.PoppinsMed}
          className="text-3xl">
          {name}
        </Text>
        <Text
          style={styles.PoppinsReg}
          className="text-lg">
          £{price.toFixed(2)}
        </Text>
        <Text
          style={[styles.PoppinsLight, { maxWidth: '95%' }]}
          numberOfLines={2}
          ellipsizeMode="tail"
          className="text-sm text-gray-600 ">
          {description}
        </Text>
      </View>

      <ScrollView>
        {Object.keys(groupedExtras).map((category) => (
          <View
            key={category}
            className="ml-5 mt-1">
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
              <View
                style={{
                  flex: 0.95,
                  height: 1,
                  backgroundColor: 'lightgray',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginTop: 5,
                  marginBottom: 5,
                }}
              />
            </View>
            <Text
              style={styles.PoppinsMed}
              className="text-xl mt-1">
              {category}
            </Text>
            {groupedExtras[category].map((extra) => (
              <View className="flex flex-row justify-between">
                <View>
                  {extra.name ? (
                    <Text
                      style={styles.PoppinsReg}
                      className="text-lg">
                      {extra.name}
                    </Text>
                  ) : null}
                  {extra.description ? (
                    <Text
                      style={[styles.PoppinsLight]}
                      className="text-base text-gray-600">
                      {extra.description}
                    </Text>
                  ) : null}
                  {extra.duration ? (
                    <Text
                      style={[styles.PoppinsLight]}
                      className="text-base text-gray-500">
                      {extra.duration} Minutes
                    </Text>
                  ) : null}
                  {extra.price ? (
                    <Text
                      style={[styles.PoppinsLight]}
                      className="text-base text-gray-600 mb-2">
                      £{extra.price.toFixed(2)}
                    </Text>
                  ) : null}
                </View>
                <CheckBox
                  checkedIcon={
                    <Icon
                      name="radio-button-checked"
                      type="material"
                      color="black"
                      size={25}
                      iconStyle={{ marginRight: 10 }}
                    />
                  }
                  uncheckedIcon={
                    <Icon
                      name="radio-button-unchecked"
                      type="material"
                      color="black"
                      size={25}
                      iconStyle={{ marginRight: 10 }}
                    />
                  }
                  checked={checkedItems.includes(extra.id)}
                  onPress={() => {
                    if (checkedItems.includes(extra.id)) {
                      setCheckedItems(
                        checkedItems.filter((value) => {
                          return (
                            value !== extra.id &&
                            value !== extra.price &&
                            value !== extra.duration &&
                            value !== extra.name
                          );
                        })
                      );

                      setextrasArray(extrasArray.filter((item) => item.id !== extra.id));

                      // Subtract the price when the checkbox is unchecked
                      const pri = parseFloat(totalPrice) - parseFloat(extra.price);
                      setTotalPrice(pri.toFixed(2));
                      // Subtract the duration when the checkbox is unchecked
                      if (extra.duration > 0) {
                        setTotalDuration(parseInt(totalDuration) - parseInt(extra.duration));
                      }
                    } else {
                      setCheckedItems([...checkedItems, extra.name, extra.id, extra.price, extra.duration]);
                      setextrasArray([
                        ...extrasArray,
                        {
                          name: extra.name,
                          id: extra.id,
                          price: extra.price,
                          duration: extra.duration,
                        },
                      ]);
                      let dur = parseInt(totalDuration, 10);
                      if (extra.duration > 0) {
                        dur = parseInt(totalDuration, 10) + parseInt(extra.duration, 10);
                        handleDurationChange(dur);
                      }

                      // Add the price when the checkbox is checked
                      const pri = parseFloat(totalPrice) + parseFloat(extra.price);
                      setTotalPrice(pri.toFixed(2));
                    }
                  }}
                />
              </View>
            ))}
          </View>
        ))}

        <View className="ml-5 mt-1">
          <Text
            style={styles.PoppinsLight}
            className="text-base text-gray-600 mt-2">
            <Text>Estimated Duration: </Text>
            <Text style={{ color: durationColor }}>{totalDuration} Minutes</Text>
          </Text>
        </View>
      </ScrollView>

      <Button
        title={addStr}
        onPress={addtoBasket}
        buttonStyle={{ backgroundColor: 'rgba(39, 39, 39, 1)', borderRadius: 10 }}
        containerStyle={{
          width: '80%',
          alignSelf: 'center',
          position: 'absolute',
          bottom: 50,
        }}
        titleStyle={{ fontFamily: 'PoppinsReg', color: 'white', marginHorizontal: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    flex: 1,
  },

  PoppinsReg: {
    fontFamily: 'PoppinsReg',
  },

  PoppinsLight: {
    fontFamily: 'PoppinsLight',
  },

  PoppinsMed: {
    fontFamily: 'PoppinsMed',
  },
});

export default PressService;

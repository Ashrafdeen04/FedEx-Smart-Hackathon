import {View, StyleSheet} from 'react-native';
import React from 'react';
import {observer} from 'mobx-react';
import {StoreData} from './DataStore';

const ModifyScreen = observer(() => {
  return (
    <View style={{flex: 1}}>
      <StoreData.ModifyVehicle />
    </View>
  );
});
const styles = StyleSheet.create({
  Input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginVertical: 5,
  },
});

export default ModifyScreen;

import {View} from 'react-native';
import React from 'react';
import {StoreData} from './DataStore';
import {observer} from 'mobx-react';

const NewRecordScreen = observer(() => {
  return (
    <View style={{flex: 1}}>
      <StoreData.AddVehicle />
    </View>
  );
});

export default NewRecordScreen;

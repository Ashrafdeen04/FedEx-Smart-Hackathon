import {TouchableOpacity, Image} from 'react-native';
import React from 'react';

const HeaderLeftFunction = props => {
  // BUNU NAVİGATİON.SETOPTİONS KISMI İLE DİĞER SAYFALARDA ÇAĞIR USEEFFECT İÇİNDE !
  return (
    <TouchableOpacity
      onPress={() =>
        Alert.alert(props.topmsg, props.bottommsg, [
          {
            text: props.leftbuttontext,
            onPress: props.leftbuttontask,
            style: 'cancel',
          },
          {
            text: props.rightbuttontext,
            onPress: props.rightbuttontask,
          },
        ])
      }>
      <Image
        style={{width: 25, height: 20, marginRight: 15}}
        source={require('../pictures/LeftArrow.png')}
      />
    </TouchableOpacity>
  );
};

export default HeaderLeftFunction;

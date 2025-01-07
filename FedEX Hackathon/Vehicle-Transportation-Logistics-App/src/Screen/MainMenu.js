import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  BackHandler,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RestService from '../../services/RestService';

const MainMenu = ({navigation}) => {
  const GetWaitingVehiclesFromAPI = () => {
    AsyncStorage.getItem('UserToken').then(value => {
      if (value != null) {
        RestService.GetWaitingVehicles(value).then(response => {
          global.total_vehicle_number = Object.keys(response.data).length; // KAÇ TANE ARAÇ OLDUĞUNA BAKTIK YANİ JSON ARRAYI İÇİNDE KAÇ JSON OBJESİ VAR
          global.ImageList = [];
          global.DetailList = [];
          global.index_for_vehicle; // bu değer flatlistteki index ile eş zamanlı değişiyor kontrol ettim.
          global.global_date;

          for (let i = 0; i < total_vehicle_number; i++) {
            ImageList.push([]);
            DetailList.push([]);
          }
        });
      }
    });
  };

  useEffect(() => {
    GetWaitingVehiclesFromAPI();

    const backAction = () => {
      return true;
    };
    // headerleffunction();
    const backHandler = BackHandler.addEventListener(
      // Bu sadece Androidde geçerli
      'hardwareBackPress',
      backAction,
    );
    return () => {
      // headerleffunction();
      backHandler.remove();
    };
  }, []);
  const ExitwithAlertForButton = () => {
    Alert.alert(
      'Hesabınızdan çıkış yapılacaktır.',
      'Giriş Ekranına dönmek istediğinize emin misiniz?',
      [
        {
          text: 'Hayır',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: async () => {
            await AsyncStorage.removeItem('UserToken');
            await AsyncStorage.removeItem('VehicleItems');
            navigation.navigate('Login Screen');
          },
        },
      ],
    );
  };
  const NavigateVehicleScreen = () => {
    setTimeout(() => {
      navigation.navigate('Vehicle Waiting For Unloading Screen');
    }, 200);
  };
  return (
    <View style={styles.Container}>
      <Text
        style={{
          fontWeight: 'bold',
          color: 'black',
          fontSize: 40,
          bottom: '90%',
          position: 'absolute',
        }}>
        Ana Menü
      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '35%',
        }}>
        <Image
          style={{width: 300, height: 200}}
          source={require('../pictures/car-transport.png')}
        />
        <TouchableOpacity
          onPress={() => NavigateVehicleScreen()}
          style={styles.touchable}>
          <Text style={styles.text}>Boşaltma Bekleyen Araç Listesi</Text>
        </TouchableOpacity>
        {/* <Text style={{color:'#1319d4',fontWeight:'bold',fontSize:25,top:'19%'}}>
          (Made By ARDA DUMANOĞLU)
        </Text> */}
        <TouchableOpacity
          onPress={() => ExitwithAlertForButton()}
          style={[styles.touchable, styles.exitButton]}>
          <Text style={styles.text}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  touchable: {
    backgroundColor: '#349995',
    borderColor: '#349995',
    margin: '7%',
    borderRadius: 25,
    borderWidth: 1,
    padding: 10,
    width: 350,

    maxWidth: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    top: '5%',
  },
  exitButton: {
    top: '35%',
    backgroundColor: '#446191',
  },
});

export default MainMenu;

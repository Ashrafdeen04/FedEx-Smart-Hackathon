import {Stack, NativeBaseProvider, Button, Box} from 'native-base';
import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Vehicle_Waiting_For_Unloading from './src/screen/VehicleWaitingForUnloading';
import MainMenu from './src/screen/MainMenu';
import AddPicture from './src/screen/AddPicture';
import AccountService from './services/AccountService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input} from 'native-base';
import DetailListScreen from './src/screen/DetailListScreen';
import NewRecordScreen from './src/screen/NewRecordScreen';
import ModifyScreen from './src/screen/ModifyScreen';

global.HideKeyboard = ({children}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};

const StackNavigate = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <StackNavigate.Navigator initialRouteName="Giriş Ekranı">
        <StackNavigate.Screen
          name="Login Screen"
          component={Login}
          options={{title: 'Giriş Ekranı'}}
        />
        <StackNavigate.Screen
          name="Main Menu Screen"
          component={MainMenu}
          options={{
            title: 'Ana Menü',
            headerShown: false,
          }}
        />
        <StackNavigate.Screen
          name="Vehicle Waiting For Unloading Screen"
          component={Vehicle_Waiting_For_Unloading}
          options={{
            title: 'Boşaltma Bekleyen Araç Listesi',
            headerStyle: {backgroundColor: '#9dc1c4'},
            headerTitleStyle: {fontWeight: 'bold'},
          }}
        />
        <StackNavigate.Screen
          name="DetailListScreen"
          component={DetailListScreen}
          options={{title: 'Detay Ekle/Çıkar'}}
        />
        <StackNavigate.Screen
          name="Pictures Screen"
          component={AddPicture}
          options={{title: 'Resimler / Resim Ekle'}}
        />
        <StackNavigate.Screen
          name="New Record Screen"
          component={NewRecordScreen}
          options={{title: 'Yeni Kayıt Ekranı'}}
        />
        <StackNavigate.Screen
          name="Modify Screen"
          component={ModifyScreen}
          options={{title: 'Düzenleme Ekranı'}}
        />
      </StackNavigate.Navigator>
    </NavigationContainer>
  );
};

const Login = ({navigation}) => {
  // const [Token, SetToken] = useState(null);
  const [LoginSuccess, setLoginSuccess] = useState(false);
  const [LoginPressedCaller, setLoginPressedCaller] = useState(false); // 2 3 kere yanlış girerse her seferinde ekranda uyarsan useeffect çağırsın diye

  const notifyMessage = msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };
  const getToken = () => {
    // BU TOKENLE AUTO LOGİN İÇİN ALCAK
    try {
      AsyncStorage.getItem('UserToken').then(value => {
        if (value != null) {
          navigation.navigate('Main Menu Screen');
        } else if (value == null) setLoginSuccess(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken(); // BURAYA TOKEN ÇAĞRILARAK AUTO LOGİN YAPILCAK. Birde Eğer Token null ise lOGİN SUCCESS FALSE OLSUN. Gerçi zaten false ama genede kontrol etmekte fayda var
    const backAction = () => {
      Alert.alert(
        'Uygulamadan çıkış yapılacaktır!',
        'Çıkış yapmak istediğinize emin misiniz?',
        [
          {
            text: 'Hayır',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'Evet', onPress: () => BackHandler.exitApp()},
        ],
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const InputBoxes = () => {
    const [userName, setuserName] = useState('');
    const [password, setpassword] = useState('');
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    useEffect(() => {
      if (LoginSuccess == true) {
        setLoginSuccess(false);
        notifyMessage('Giriş Başarılı!');
        navigation.navigate('Main Menu Screen');
        setuserName('');
        setpassword('');
      }
    }, [LoginPressedCaller]);

    const setTokenFunction = async Token => {
      try {
        if (Token != null) await AsyncStorage.setItem('UserToken', Token);
      } catch (error) {
        console.log('SetTokenFunction ERROR : ', error);
      }
    };
    const LoginPressed = () => {
      // API ile buradan kıyaslama yapılacak
      if (userName.length != 0 && password.length != 0) {
        AccountService.login(userName, password)
          .then(response => {
            console.log('Response data : ', response.data);
            if (response.data.Success == true) {
              setLoginSuccess(true); // Burası DiREKT OLARAK TRUE YAPMIYOR. Usestate anında gerçekleşmez render olduktan sonra useeffect kısmında olur Ve burası aynı zamanda useEFFECT TETİKLİYOR KONTROL İŞLEMLERİ ORADA OLACAK.
              setTokenFunction(response.data.Token);
            } else {
              setLoginSuccess(false);
              Alert.alert(
                'Kullanıcı adı veya şifre yanlış!',
                'Lütfen Tekrar Deneyiniz.',
              );
            }
          })
          .catch(error => {
            console.log(error);
          });
        setLoginPressedCaller(!LoginPressedCaller);
      } else {
        notifyMessage('Kullanıcı adı veya şifre boş olamaz!');
      }
      // her yanlış girildiğinde sürekli çağırması için Buradaki kıyaslama işlerini useeffect kısmında yaptık çünkü setloginsuccess render sonunda true dönüyor değer olarak
    };

    return (
      <Stack mt={'30%'} space={'15%'} width="100%" maxW="70%">
        <Input
          autoCapitalize="none"
          value={userName}
          onChangeText={text => setuserName(text)}
          size="lg"
          placeholder="Kullanıcı adı"
        />
        <Input
          autoCapitalize="none"
          onChangeText={text => setpassword(text)}
          value={password}
          size="lg"
          type={show ? 'text' : 'password'}
          width="100%"
          py="0"
          InputRightElement={
            <Button
              size="lg"
              rounded="none"
              w="30%"
              h="full"
              onPress={handleClick}>
              {show ? 'Gizle' : 'Göster'}
            </Button>
          }
          placeholder="Şifre"
        />
        <Box alignItems="center" marginTop={'3%'}>
          <Button style={styles.button} onPress={() => LoginPressed()}>
            Giriş Yap
          </Button>
        </Box>
      </Stack>
    );
  };

  return (
    <NativeBaseProvider>
      <HideKeyboard>
        <SafeAreaView style={styles.sectionContainer}>
          <KeyboardAvoidingView style={{flex: 1}}>
            <InputBoxes />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </HideKeyboard>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 25,
    width: '50%',
    height: 50,
    minHeight: '8%',
    maxHeight: '100%',
  },
});

export default StackNavigator;

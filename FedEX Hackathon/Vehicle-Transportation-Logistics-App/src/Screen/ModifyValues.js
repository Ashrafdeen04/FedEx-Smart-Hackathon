import React from 'react';
import {StoreData} from './DataStore';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import {Formik} from 'formik';
import {observer} from 'mobx-react';

const ModifyValues = observer(() => {
  return (
    <HideKeyboard>
      <View style={{flex: 1}}>
        <Formik
          initialValues={{
            Company: StoreData.ListItems[index_for_vehicle].Firma,
            LoginTime: StoreData.ListItems[
              index_for_vehicle
            ].GirisZamani.toString().substring(0, 10),
            Plate: StoreData.ListItems[index_for_vehicle].Plaka,
            Set3Value: StoreData.ListItems[index_for_vehicle].Set3Deger,
            WeighingNo:
              StoreData.ListItems[index_for_vehicle].TartimNo.toString(),
          }}
          onSubmit={values => {
            if (
              values.Company == StoreData.ListItems[index_for_vehicle].Firma &&
              values.LoginTime ==
                StoreData.ListItems[
                  index_for_vehicle
                ].GirisZamani.toString().substring(0, 10) &&
              values.Plate == StoreData.ListItems[index_for_vehicle].Plaka &&
              values.Set3Value ==
                StoreData.ListItems[index_for_vehicle].Set3Deger &&
              values.WeighingNo.toString() ==
                StoreData.ListItems[index_for_vehicle].TartimNo.toString()
            ) {
              notifyMessage('Hiçbir değişiklik yapmadınız!');
            } else {
              notifyMessage('Değerler başarıyla değiştirildi!');
              let Firma = values.Company;
              let GirisZamani = values.LoginTime;
              let Plaka = values.Plate;
              let Set3Deger = values.Set3Value;
              let TartimNo = values.WeighingNo.toString();

              let Array = {Firma, GirisZamani, Plaka, Set3Deger, TartimNo};
              if (index_for_vehicle != null) {
                StoreData.ListItems = StoreData.ListItems.map((item, index) => {
                  return index === index_for_vehicle ? Array : item;
                });
                setTimeout(() => {
                  global_navigation.navigate(
                    'Vehicle Waiting For Unloading Screen',
                  );
                }, 200);
              }

              //
            }
          }}>
          {({handleChange, handleSubmit, values}) => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'stretch',
                bottom: '1%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  global_navigation.navigate('DetailListScreen');
                }}>
                <View
                  style={{
                    padding: 8,
                    position: 'absolute',
                    borderRadius: 25,
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    left: '70%',
                    bottom: '45%',
                    backgroundColor: '#53e6be',
                    borderColor: '#53e6be',
                    elevation: 1,
                  }}>
                  <Text style={{fontSize: 20, color: 'black'}}>Detaylar</Text>
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  alignSelf: 'center',
                  marginTop: 10,
                  marginBottom: 20,
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                Değerleri Düzenle
              </Text>
              <TextInput
                color="black"
                autoCapitalize="none"
                style={styles.Input}
                placeholder="Firma gir"
                placeholderTextColor="#9791cc"
                onChangeText={handleChange('Company')}
                value={values.Company}
              />
              <TextInput
                color="black"
                autoCapitalize="none"
                style={styles.Input}
                placeholder="Giriş  Zamanı gir"
                placeholderTextColor="#9791cc"
                onChangeText={handleChange('LoginTime')}
                value={values.LoginTime}
              />
              <TextInput
                color="black"
                autoCapitalize="none"
                style={styles.Input}
                placeholder="Plaka gir"
                placeholderTextColor="#9791cc"
                onChangeText={handleChange('Plate')}
                value={values.Plate}
              />
              <TextInput
                color="black"
                autoCapitalize="none"
                style={styles.Input}
                placeholder="Set3Değer gir"
                placeholderTextColor="#9791cc"
                onChangeText={handleChange('Set3Value')}
                value={values.Set3Value}
              />
              <TextInput
                color="black"
                autoCapitalize="none"
                style={styles.Input}
                placeholder="TartimNo  gir"
                placeholderTextColor="#9791cc"
                onChangeText={handleChange('WeighingNo')}
                value={values.WeighingNo}
              />
              <Button
                block
                success
                style={{
                  borderRadius: 4,
                  elevation: 1,
                  marginHorizontal: 1,
                  marginTop: 10,
                }}
                title="Kaydet"
                color="maroon"
                onPress={handleSubmit} //ONsubmit Fonksiyonunu Çağırır
              />
              <KeyboardAvoidingView>
                <TouchableOpacity
                  onPress={() => {
                    StoreData.DeleteVehicle();
                  }}
                  style={{
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                    borderColor: 'maroon',
                    borderWidth: 1,
                    left: '44%',
                    marginTop: 20,
                    backgroundColor: 'maroon',
                  }}>
                  <Text style={{color: 'white'}}>SİL</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </View>
          )}
        </Formik>
      </View>
    </HideKeyboard>
  );
});
const styles = StyleSheet.create({
  Input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginVertical: 9,
  },
});
export default ModifyValues;

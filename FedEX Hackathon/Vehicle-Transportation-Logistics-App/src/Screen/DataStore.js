import React from 'react';
import {action, makeObservable, observable} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RestService from '../../services/RestService';
import {configure} from 'mobx';
import ModifyValues from './ModifyValues';
import {View, Text, Button, TextInput, Alert, StyleSheet} from 'react-native';
import {Formik} from 'formik';
class DataStore {
  ListItems = [];

  constructor() {
    AsyncStorage.getItem('UserToken').then(value => {
      if (value != null) {
        RestService.GetWaitingVehicles(value).then(response => {
          this.ListItems = response.data;
        });
      }
    });
    makeObservable(this, {
      ListItems: observable,
      DeleteVehicle: action,
      ModifyVehicle: action,
      AddVehicle: action,
    });
    configure({
      enforceActions: 'never',
    });
  }

  ModifyVehicle() {
    return <ModifyValues />;
  }
  AddVehicle() {
    return (
      <HideKeyboard>
        <View style={{flex: 1}}>
          <Formik
            initialValues={{
              Company: '',
              LoginTime: global_date.toISOString().substring(0, 10),
              Plate: '',
              Set3Value: '',
              WeighingNo: '',
            }}
            onSubmit={values => {
              if (
                values.Company == '' &&
                (values.LoginTime ==
                  global_date.toISOString().substring(0, 10) ||
                  values.LoginTime == '') &&
                values.Plate == '' &&
                values.Set3Value == '' &&
                values.WeighingNo == ''
              ) {
                notifyMessage('Boş liste eklenemez lütfen değerleri girin!');
              } else {
                let Firma = values.Company;
                let GirisZamani = values.LoginTime;
                let Plaka = values.Plate;
                let Set3Deger = values.Set3Value;
                let TartimNo = values.WeighingNo.toString();

                let Array = {Firma, GirisZamani, Plaka, Set3Deger, TartimNo};

                StoreData.ListItems = [...StoreData.ListItems, Array];
                ImageList.push([]);
                DetailList.push([]);
                notifyMessage('Yeni kayıt başarılı!');
                console.log('ImageList : ', ImageList);
                console.log('DetailList :', DetailList);
                setTimeout(() => {
                  global_navigation.navigate(
                    'Vehicle Waiting For Unloading Screen',
                  );
                }, 200);
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
                <Text
                  style={{
                    alignSelf: 'center',
                    marginTop: 20,
                    marginBottom: 50,
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  Yeni kayıt ekleme
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
                  placeholder="Giriş Zamanı gir"
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
                  placeholder="TartimNo gir"
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
              </View>
            )}
          </Formik>
        </View>
      </HideKeyboard>
    );
  }

  DeleteVehicle() {
    Alert.alert(
      'Seçtiğiniz araç bilgileriyle silinecektir.',
      'Silmek istediğinize emin misiniz ?',
      [
        {
          text: 'Hayır',
          onPress: () => {
            notifyMessage('Silme işlemi iptal edildi!');
          },
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => {
            if (index_for_vehicle == this.ListItems.length - 1) {
              console.log(
                'Son eleman listItem üzerinden silindi! İndex değeri : ',
                index_for_vehicle,
              );
              // Son elemanı farklı şekilde sil  yoksa hata veriyor.
              index_for_vehicle -= 1;
              this.ListItems = this.ListItems.filter(
                // filter için aşağıdaki değeri index ile eşit olmayanları alcam şeklinde düşün
                (item, index) => {
                  return index !== this.ListItems.length - 1;
                },
              );
              ImageList.splice(-1, 1);
              DetailList.splice(-1, 1);

              console.log(
                'Son elemanı ImageList ve DetailList üzerinden sildiniz!',
              );
              console.log('ListItem: ', this.ListItems.length);

              // Son elemanı silince  o index değeri yok oluyordu hata veriyordu bu şekilde çözdük.
            } else {
              // filter için aşağıdaki değeri index ile eşit olmayanları alcam şeklinde düşün
              this.ListItems = this.ListItems.filter((item, index) => {
                return index !== index_for_vehicle;
              });
              ImageList.splice(index_for_vehicle, 1);
              DetailList.splice(index_for_vehicle, 1);
              console.log(index_for_vehicle, ' indexli numarayı sildiniz.');
            }
            notifyMessage('Araç başarıyla silindi!');
            console.log('ImageList : ', ImageList);
            console.log('DetailList :', DetailList);
            setTimeout(() => {
              global_navigation.navigate(
                'Vehicle Waiting For Unloading Screen',
              );
            }, 200);
          },
        },
      ],
    );
  }
}
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

export const StoreData = new DataStore();

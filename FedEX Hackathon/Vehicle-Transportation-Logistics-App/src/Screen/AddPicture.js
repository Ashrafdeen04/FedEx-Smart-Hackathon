import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';

const AddPicture = () => {
  const [FlatListRenderer, setFlatListRenderer] = useState(false);

  useEffect(() => {
    console.log('ImageList : ', ImageList);
    console.log('IndexforPictures : ', index_for_vehicle); // Inner arrayda seçtiğimiz rastgele birine değer eklersek herbirine ekliyor fill yüzünden fill olmayanlara eklemiyor!
  }, []);
  const TakePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        if (image != null) {
          ImageList[index_for_vehicle].unshift(
            // unshift arrayin başına ekler
            // inner arraya iniyoruz orada işlem yapacağız
            // Buraya yazılan index for pictures ın bir önemi yok onu düzeltmeye çalış her arraya ekliyor değeri
            image.path,
          );
          console.log('ImageList : ', ImageList);
          notifyMessage('Fotoğraf Başarıyla eklendi!');
          setFlatListRenderer(!FlatListRenderer);
        }
      })
      .catch(err => {
        console.log('TakePhotoFromCamera err catch ' + err.toString());
      });
  };
  const ChoosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        if (image != null) {
          ImageList[index_for_vehicle].unshift(
            // unshift arrayin başına ekler
            // inner arraya iniyoruz orada işlem yapacağız
            image.path,
          );
          console.log('ImageList : ', ImageList);
          notifyMessage('Fotoğraf Başarıyla eklendi!');
          setFlatListRenderer(!FlatListRenderer);
        }
      })
      .catch(err => {
        console.log('ChoosePhotoFromLibrary err catch  ' + err.toString());
      });
  };

  const BottomAddPhotoMenu = () => {
    return (
      <View style={styles.panel}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.panelTitle}>Resim Yükle</Text>
        </View>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={TakePhotoFromCamera}>
          <Text style={styles.panelButtonTitle}>Fotoğraf Çek</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={ChoosePhotoFromLibrary}>
          <Text style={styles.panelButtonTitle}>Galeriden Seç</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ImageListBox = () => {
    // Fotoğrafları flatlist ile alt alta göstercez.
    return (
      <View style={{flex: 1}}>
        <FlatList
          extraData={FlatListRenderer}
          data={ImageList[index_for_vehicle]}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  bottom: '30%',
                  marginVertical: 10,
                  top: '2%',
                  right: '7%',
                }}>
                <Image style={{width: 300, height: 300}} source={{uri: item}} />
                <TouchableOpacity
                  onPress={() => {
                    Delete_Photo(index);
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    position: 'absolute',
                    top: '50%',
                    left: '93%',
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: 'maroon',
                    backgroundColor: 'maroon',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white'}}>SİL</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    );
  };
  const Delete_Photo = index => {
    Alert.alert(
      'Seçtiğiniz fotoğraf silinecektir.',
      'Silmek istediğinize emin misiniz ?',
      [
        {
          text: 'Hayır',
          onPress: () => {
            notifyMessage('Fotoğraf silme işlemi iptal edildi!');
          },
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => {
            ImageList[index_for_vehicle].splice(index, 1);
            notifyMessage('Fotoğraf Başarıyla silindi!');
            setFlatListRenderer(!FlatListRenderer);
            console.log('Imagelist : ', ImageList);
          },
        },
      ],
    );
  };

  return (
    <View style={{flex: 1}}>
      <ImageListBox />
      <BottomAddPhotoMenu></BottomAddPhotoMenu>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    marginBottom: 20,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});
export default AddPicture;

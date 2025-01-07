import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const DetailListScreen = () => {
  const [FlatListRenderer, setFlatListRenderer] = useState(false);

  useEffect(() => {
    console.log('DetailList :', DetailList);
  }, []);

  const Add_Detail = () => {
    const [DetailMessage, setDetailMessage] = useState('');

    return (
      <View
        style={{
          marginVertical: 20,
          margin: 5,
        }}>
        <TextInput
          color="black"
          autoCapitalize="none"
          style={styles.Input}
          placeholder="Detay gir"
          placeholderTextColor="#9791cc"
          onChangeText={text => {
            setDetailMessage(text);
          }}
          value={DetailMessage}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            width: 60,
            height: 50,
            borderRadius: 10,
            borderColor: 'green',
            borderWidth: 1,
            backgroundColor: 'green',
            left: '85%',
            top: '8%',
            bottom: '50%',
          }}
          onPress={() => {
            if (DetailMessage != '') {
              DetailList[index_for_vehicle].push(DetailMessage);
              setDetailMessage('');
              setFlatListRenderer(!FlatListRenderer);
            } else notifyMessage('Boş detay eklenemez!');
            console.log('DetailList : ', DetailList);
          }}>
          <Text style={{color: 'white'}}>Detay Ekle</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const DetailFlatList = () => {
    return (
      <View style={{flex: 1}}>
        <FlatList
          extraData={FlatListRenderer}
          data={DetailList[index_for_vehicle]}
          renderItem={({index}) => {
            return (
              <View style={{bottom: '10%'}}>
                <Text color="black" style={styles.Input}>
                  {DetailList[index_for_vehicle][index]}
                </Text>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    borderColor: 'maroon',
                    borderWidth: 1,
                    backgroundColor: 'maroon',
                    left: '88%',
                    top: '15%',
                  }}
                  onPress={() => {
                    Delete_Detail(index);
                  }}>
                  <Text style={{color: 'white'}}> SİL</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    );
  };

  const Delete_Detail = index => {
    Alert.alert(
      'Seçtiğiniz detay silinecektir.',
      'Silmek istediğinize emin misiniz ?',
      [
        {
          text: 'Hayır',
          onPress: () => {
            notifyMessage('Detay silme işlemi iptal edildi!');
          },
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => {
            DetailList[index_for_vehicle].splice(index, 1);
            notifyMessage('Detay Başarıyla silindi!');
            setFlatListRenderer(!FlatListRenderer);
            console.log('DetailList : ', DetailList);
          },
        },
      ],
    );
  };

  return (
    <View style={{flex: 1}}>
      <Add_Detail />
      <DetailFlatList />
    </View>
  );
};

const styles = StyleSheet.create({
  Input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginVertical: 5,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default DetailListScreen;

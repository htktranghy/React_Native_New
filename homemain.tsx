import React, { useRef, useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from '../uneti_online/header';
import ModalThongBao from '../uneti_online/Modal_ThongBao';
// import MyTabsHome from '../untils/footer/footer';
const Tab = createBottomTabNavigator();

const getHeight = Dimensions.get('window').height;
const getWidth = Dimensions.get('window').width;

function HomeMain({ navigation }: any) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleHeaderPress = () => {
    setShowOverlay(!showOverlay);
  };

  const handleModalPress = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="UNETI ONLINE" onPress={handleHeaderPress} />

      <ModalThongBao
        visible={showModal}
        onClose={handleCloseModal}
        message="Chưa hoàn thành!"
      />
      <View style={styles.viewBody}>
        <TouchableOpacity
          style={styles.viewButton}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('PhucKhao');
          }}>
          <View style={styles.viewText}>
            <Text style={styles.styleTieuDe}>PHÚC KHẢO</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewButton}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('KetQuaHocTap');
          }}>
          <View style={styles.viewText}>
            <Text style={styles.styleTieuDe}>KẾT QUẢ HỌC TẬP</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={styles.viewFooter}>
        <View
          style={styles.viewIcon}>
          <TouchableOpacity
            style={styles.touchableOpacityIcon}
            onPress={() => {
            }}>
            <Image
              resizeMode="stretch"
              source={require('../uneti_online/images/notification.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableOpacityIcon}
            onPress={() => {
              navigation.navigate('HomeMain');
            }}>
            <Image
              resizeMode="stretch"
              source={require('../uneti_online/images/home.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableOpacityIcon}
            onPress={() => {
            }}>
            <Image
              resizeMode="stretch"
              source={require('../uneti_online/images/person.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// function BottomTabs() {
//   return <MyTabsHome />;
// }
export default HomeMain;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },

  viewBody: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
    marginTop: -45,
  },
  viewButton: {
    backgroundColor: '#F5F5F5',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    height: '16%',
    width: '85%',
    marginTop: 25,
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 8,
  },

  viewText: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    marginRight: 25,
    marginLeft: 25,
  },
  styleTieuDe: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },

  viewFooter: {
    height: '8%',
    backgroundColor: '#f7f9ff',
    width: '100%',
  },
  viewIcon: {
    height: '100%',
    borderBlockColor: 'gray',
    backgroundColor: 'white',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 8,
  },
  touchableOpacityIcon: {
    width: '30%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 33,
    height: 33
  }
});

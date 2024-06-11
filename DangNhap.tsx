import React, { useState, useEffect } from 'react';

import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import { user_dangnhap } from '../../Uneti_Online/uneti_online/api/user_api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalThongBao from '../uneti_online/Modal_ThongBao';
export var token: any;
export var maSinhVien: any;

function DangNhap({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [isShowPass, setShowPass] = useState(true);
  const [loading, setLoading] = useState(false);

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const handleModalPress1 = () => {
    setShowModal1(true);
  };

  const handleCloseModal1 = () => {
    setShowModal1(false);
  };

  const handleModalPress2 = () => {
    setShowModal2(true);
  };

  const handleCloseModal2 = () => {
    setShowModal2(false);
  };

  const [checkboxColor, setCheckboxColor] = useState('#245d7c');
  const [checkboxUncheckedColor, setCheckboxUncheckedColor] = useState('gray');

  const LuuTaiKhoanVaMatKhau = async () => {
    try {
      await AsyncStorage.setItem(
        'LuuTaiKhoan',
        JSON.stringify({ username, password }),
      );
    } catch (error) {
      console.error('Lỗi khi lưu tài khoản và mật khẩu:', error);
    }
  };

  const loadSavedData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('LuuTaiKhoan');
      if (savedData) {
        const { username: savedUsername, password: savedPassword } =
          JSON.parse(savedData);
        setUsername(savedUsername);
        setPassword(savedPassword);
      }
    } catch (error) {
      console.error('Lỗi khi tải tài khoản và mật khẩu:', error);
    }
  };

  useEffect(() => {
    loadSavedData();
  }, []);

  function xuLiDangNhap() {
    user_dangnhap({
      TC_SV_MaSinhVien: username.toLocaleLowerCase(),
      TC_SV_MaSinhVien_Pass: password,
    })
      .then(result => {
        if (result.status == 200) {
          token = result.data.token;
          maSinhVien = username;

          if (isChecked && username !== '' && password !== '') {
            LuuTaiKhoanVaMatKhau();
          }

          navigation.navigate('HomeMain');
        } else if (username === '' || password === '') {
          handleModalPress2();
        } else {
          handleModalPress1();
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const xuLiVuiLongCho = () => {
    setLoading(true);

    setTimeout(() => {
      xuLiDangNhap();
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewImage}>
        <Image
          source={require('../../Uneti_Online/uneti_online/images/logo_uneti.jpg')}
          style={styles.image}
        />
      </View>

      <ModalThongBao
        visible={showModal2}
        onClose={handleCloseModal2}
        message="Vui lòng nhập đầy đủ thông tin tài khoản và mật khẩu!"
      />

      <ModalThongBao
        visible={showModal1}
        onClose={handleCloseModal1}
        message="Đăng nhập nhất bại! Vui lòng kiểm tra lại thông tin tài khoản và mật khẩu!"
      />

      <View style={styles.viewBody}>
        <View style={styles.viewTextInput}>
          <Text style={styles.text}>Tên đăng nhập</Text>
          <TextInput
            autoCapitalize="none"
            placeholderTextColor={'gray'}
            style={styles.textInput}
            placeholder="Tên đăng nhập"
            value={username}
            onChangeText={text => setUsername(text)}
          />
        </View>

        <View style={{ marginTop: 15, width: '100%' }}>
          <Text style={styles.text}>Mật khẩu</Text>
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <TextInput
              placeholderTextColor={'gray'}
              style={styles.textInput}
              placeholder="******"
              secureTextEntry={isShowPass ? true : false}
              value={password}
              onChangeText={text => setPassword(text)}
            />

            <TouchableOpacity
              onPress={() => {
                setShowPass(!isShowPass);
              }}>
              <View style={styles.showPass}>
                {isShowPass ? (
                  <Image
                    style={styles.iconeye}
                    source={require('../../Uneti_Online/uneti_online/images/showpass.png')}
                    resizeMode="stretch"
                  />
                ) : (
                  <Image
                    style={styles.iconeye}
                    source={require('../../Uneti_Online/uneti_online/images/hidepass.png')}
                    resizeMode="stretch"
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.viewCheckBox}>
          <CheckBox
            value={isChecked}
            onValueChange={setChecked}
            tintColors={{ true: checkboxColor, false: checkboxUncheckedColor }}
          />

          <Text
            style={styles.textCheckBox}>
            Nhớ mật khẩu
          </Text>
        </View>

        <View style={styles.viewModalCotainer}>
          {loading && (
            <View style={styles.viewModel}>
              <View style={styles.loaderContainer}>
                <ActivityIndicator
                  color="gray"
                  size="small"
                  style={{ borderRadius: 10, overflow: 'hidden' }}
                />
                <Text style={{ color: 'gray', fontSize: 16, marginLeft: 15 }}>
                  Vui lòng đợi...
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.viewButtonDangNhap}>
          <TouchableOpacity
            onPress={xuLiVuiLongCho}
            style={styles.touchableOpacity}>
            <Text style={{ color: '#fff', fontSize: 19 }}>Đăng Nhập</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.viewFooter}>
        <View style={styles.viewTextFooter}>
          <Text style={styles.textFooter}>TRƯỜNG ĐẠI HỌC</Text>
          <Text style={styles.textFooter}>KINH TẾ - KỸ THUẬT CÔNG NGHIỆP</Text>
          <Text style={styles.text}>
            Tel: (024)38621505 - (0228)3848706
          </Text>
        </View>

        <View style={styles.viewIcon}>
          <Image
            source={require('../../Uneti_Online/uneti_online/images/internet.png')}
            style={[styles.imageCSS]}
            resizeMode="stretch"
          />

          <Image
            source={require('../../Uneti_Online/uneti_online/images/facebook.png')}
            style={styles.imageCSS}
            resizeMode="stretch"
          />

          <Image
            source={require('../../Uneti_Online/uneti_online/images/youtube.png')}
            style={[styles.imageCSS]}
            resizeMode="stretch"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#ffffff',
  },
  viewImage: {
    height: '30%',
    width: '100%',
    marginTop: '10%',
    justifyContent: 'center',
  },
  viewBody: {
    height: '45%',
    marginHorizontal: 40,
  },
  viewFooter: {
    position: 'absolute',
    width: '100%',
    height: '20%',
    bottom: 0,
    alignItems: 'center',
  },
  image: {
    width: '40%',
    alignSelf: 'center',
    height: '80%',
  },

  viewTextInput: {
    marginTop: 50,
  },
  text: {
    color: 'black',
    fontSize: 18,
  },
  textInput: {
    width: '100%',
    fontSize: 17,
    marginTop: 5,
    borderColor: 'lightgray',
    borderWidth: 1,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 6,
    color: 'black',
  },
  viewCheckBox: {
    marginTop: 5,
    flexDirection: 'row',
    width: '100%',
  },
  textCheckBox: {
    marginTop: 5,
    fontSize: 17
  },
  viewButtonDangNhap: {
    position: 'absolute',
    bottom: 0,
    marginBottom: '10%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableOpacity: {
    backgroundColor: '#245d7c',
    width: 130,
    height: 45,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  viewTextFooter: {
    marginTop: 15,
    alignItems: 'center',
  },

  textFooter: {
    color: 'black',
    fontSize: 18,
    fontWeight: '400',
    marginTop: 5,
  },
  viewIcon: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
    width: '27%',
    height: '15%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageCSS: {
    height: 25,
    width: 25,
  },
  showPass: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: '90%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconeye: {
    height: 25,
    width: 25,
  },

  viewModel: {
    position: 'absolute',
    height: 50,
    width: 160,
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  viewModalCotainer: {
    alignItems: 'center',
    justifyContent: 'center', backgroundColor: '#abcdef'
  },
  loaderContainer: {
    flexDirection: 'row',
  },
});

export default DangNhap;

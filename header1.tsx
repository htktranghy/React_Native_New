import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';

function Header1(props: any) {
  const { title, onPress } = props;
  return (
    <View style={styles.ContainerHeader}>
      <ImageBackground source={require('../uneti_online/images/header.png')}>
        <View style={styles.viewHeader}>
          <TouchableOpacity onPress={onPress}>
            <Image
              source={require('../uneti_online/images/back.png')}
              style={styles.iconMenu}
            />
          </TouchableOpacity>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Text style={styles.textTieuDe}>{title}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  ContainerHeader: {
    height: '13%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewHeader: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
  },
  iconMenu: {
    height: 30,
    width: 24,
    tintColor: '#fff',
    marginLeft: 60,
  },
  textTieuDe: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 60,
  },
});

export default Header1;

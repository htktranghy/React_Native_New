import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ImageBackground,
} from 'react-native';

function Header(props: any) {
  const { title, onPress } = props;
  return (
    <View style={styles.ContainerHeader}>
      <ImageBackground
        source={require('../uneti_online/images/backgroundHeader.png')}>
        <View style={styles.viewHeader}>
          <TouchableOpacity onPress={onPress}>
            <Image
              source={require('../uneti_online/images/menu.png')}
              style={styles.iconMenu}
            />
          </TouchableOpacity>
          <Text style={styles.textTieuDe}>{title}</Text>
          <Image
            source={require('../uneti_online/images/logo_uneti.png')}
            style={styles.imageLogo}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  ContainerHeader: {
    height: '27%',
    width: '100%',
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
    width: 25,
    tintColor: '#fff',
    marginLeft: 20,
  },
  textTieuDe: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  imageLogo: {
    height: 74,
    width: 65,
    marginRight: 20,
  },
});

export default Header;

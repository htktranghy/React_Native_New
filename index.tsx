import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DangNhap from './DangNhap.tsx';
import HomeMain from './homemain.tsx';
import Header1 from './header1.tsx';
import PhucKhao from './phuckhao.tsx';
import KetQuaHocTap from './ketquahoctap.tsx';
const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={DangNhap} />
        <Stack.Screen name="HomeMain" component={HomeMain} />
        <Stack.Screen name="PhucKhao" component={PhucKhao} />
        <Stack.Screen name="KetQuaHocTap" component={KetQuaHocTap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;

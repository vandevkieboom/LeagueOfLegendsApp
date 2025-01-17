import React from 'react';
import Drawer from 'expo-router/drawer';
import { Audio } from 'expo-av';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import HeaderIcons from '@/components/HeaderIcons';
import { useHeaderContext } from '@/context/HeaderContext';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require('@/assets/audio/ryze.mp3'));
    await sound.playAsync();
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'relative', borderTopRightRadius: 0, overflow: 'hidden' }}>
        <Image source={require('@/assets/images/ryze3.webp')} style={styles.drawerImage} />
        <LinearGradient colors={['transparent', 'rgba(16, 16, 16, 1)']} style={styles.imageOverlay} />
        <Pressable onPress={playSound} style={styles.audioIcon}>
          <Ionicons name="volume-medium" size={20} color="white" />
        </Pressable>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

const RootLayout = () => {
  const { lives, setSearchBarVisible, setSortModalVisible, setFilterModalVisible } = useHeaderContext();

  return (
    <>
      <Drawer
        screenOptions={({ navigation }) => ({
          headerShown: true,
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
          headerTitleStyle: { color: '#fff', fontSize: 18, marginLeft: 10 },
          drawerActiveTintColor: 'rgba(4, 4, 4, 1)',
          drawerItemStyle: { marginVertical: 7, marginHorizontal: 7 },
          drawerStyle: {
            backgroundColor: 'rgba(15, 15, 15, 1)',
            width: 280,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
          drawerLabelStyle: { color: '#fff' },
          drawerType: 'slide',
          headerLeft: () => (
            <View style={{ alignItems: 'center' }}>
              <Pressable onPress={() => navigation.openDrawer()}>
                <MaterialIcons name="menu" size={24} color="#fff" style={{ marginLeft: 15 }} />
              </Pressable>
            </View>
          ),
        })}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: 'Champions',
            headerShown: true,
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
            drawerIcon: () => <MaterialCommunityIcons name="sword-cross" size={20} color="white" />,
            headerRight: () => (
              <HeaderIcons
                icons={[
                  { name: 'search', onPress: () => setSearchBarVisible((prev) => !prev) },
                  { name: 'filter-list', onPress: () => setFilterModalVisible(true) },
                  { name: 'sort', onPress: () => setSortModalVisible(true) },
                ]}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="minigame"
          options={{
            title: 'Minigame',
            headerShown: true,
            drawerIcon: () => <MaterialIcons name="quiz" size={20} color="white" />,
            headerRight: () => <HeaderIcons lives={lives} />,
          }}
        />
        <Drawer.Screen
          name="leaderboard"
          options={{
            title: 'Leaderboard',
            headerShown: true,
            drawerIcon: () => <MaterialIcons name="leaderboard" size={20} color="white" />,
          }}
        />
      </Drawer>
    </>
  );
};

const styles = StyleSheet.create({
  drawerImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 140,
  },
  audioIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default RootLayout;

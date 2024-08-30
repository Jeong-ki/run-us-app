import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, Text, View} from 'react-native';
import type {HomeScreenProps} from '@/navigation/types';
import NaverMapView, {Marker, Path} from 'react-native-nmap';
import getDistanceFromLatLonInKm from '@/utils/map';

const HomeScreen = ({}: HomeScreenProps) => {
  const start = {latitude: 37.5665, longitude: 126.978}; // 서울의 좌표
  const end = {latitude: 35.1796, longitude: 129.0756}; // 부산의 좌표

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: 500}}>
        <NaverMapView
          style={{width: '100%', height: '100%'}}
          zoomControl={false}
          center={{
            zoom: 10,
            tilt: 50,
            bearing: 0,
            latitude: (start.latitude + end.latitude) / 2,
            longitude: (start.longitude + end.longitude) / 2,
          }}>
          <Marker
            coordinate={{latitude: start.latitude, longitude: start.longitude}}
            pinColor="blue"
          />
          <Path
            coordinates={[
              {latitude: start.latitude, longitude: start.longitude},
              {latitude: end.latitude, longitude: end.longitude},
            ]}
          />
          <Marker
            coordinate={{latitude: end.latitude, longitude: end.longitude}}
          />
        </NaverMapView>
      </View>
      <View>
        <Text>
          {getDistanceFromLatLonInKm(
            start.latitude,
            start.longitude,
            end.latitude,
            end.longitude,
          ).toFixed(1)}
          km
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

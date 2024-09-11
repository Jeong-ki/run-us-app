import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, Text, View} from 'react-native';
import NaverMapView, {Marker, Path} from 'react-native-nmap';
import getDistanceFromLatLonInKm from '@/utils/map';
import type {HomeScreenProps} from '@/navigation/types';
import Geolocation from '@react-native-community/geolocation';

const HomeScreen = ({}: HomeScreenProps) => {
  const start = {latitude: 37.5665, longitude: 126.978}; // 서울의 좌표
  const end = {latitude: 35.1796, longitude: 129.0756}; // 부산의 좌표

  const [myPosition, setMyPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  console.log(myPosition);

  useEffect(() => {
    // getCurrentPosition, watchPosition
    Geolocation.watchPosition(
      info => {
        setMyPosition({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      console.error,
      {
        enableHighAccuracy: true, // 정확하게 가져오기
        timeout: 20000, // 20초 안에 못가져올 시 에러 발생
        distanceFilter: 1, // n 미터 이상 이동했을 때 콜백 실행
      },
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: 700}}>
        <NaverMapView
          style={{width: '100%', height: '100%'}}
          zoomControl={true}
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
          {myPosition && (
            <Marker
              coordinate={{
                latitude: myPosition.latitude,
                longitude: myPosition.longitude,
              }}
              pinColor="red" // 내 위치는 빨간색 핀으로 표시
            />
          )}
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
        <Text>latitude: {myPosition?.latitude}</Text>
        <Text>longitude: {myPosition?.longitude}</Text>
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

import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, Text, View} from 'react-native';
import NaverMapView, {Marker, Polyline} from 'react-native-nmap';
import type {HomeScreenProps} from '@/navigation/types';
import Geolocation from '@react-native-community/geolocation';
import {ICoordinate} from '@/@types/common';
import {calculateDistance} from '@/utils/map';

const HomeScreen = ({}: HomeScreenProps) => {
  const [myPosition, setMyPosition] = useState<ICoordinate | null>(null);
  const [pathCoordinates, setPathCoordinates] = useState<Array<ICoordinate>>(
    [],
  );
  const [totalDistance, setTotalDistance] = useState<number>(0);

  useEffect(() => {
    // 위치 추적 시작
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const newPosition = {latitude, longitude};

        setMyPosition(newPosition);
        // setPathCoordinates(prevCoords => [...prevCoords, newPosition]);

        setPathCoordinates(prevCoords => {
          if (prevCoords.length > 0) {
            const lastPosition = prevCoords[prevCoords.length - 1];
            const distance = calculateDistance(lastPosition, newPosition);
            setTotalDistance(prevDistance => prevDistance + distance);
          }
          return [...prevCoords, newPosition];
        });
      },
      console.error,
      {
        enableHighAccuracy: true, // 정확하게 가져오기
        timeout: 20000, // 20초 안에 못가져올 시 에러 발생
        distanceFilter: 1, // n 미터 이상 이동했을 때 콜백 실행
      },
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: 600}}>
        <NaverMapView
          style={{width: '100%', height: '100%'}}
          zoomControl={true}
          center={{
            zoom: 16,
            tilt: 0,
            bearing: 0,
            latitude: myPosition?.latitude || 37.564362,
            longitude: myPosition?.longitude || 126.977011,
          }}>
          {myPosition && (
            <Marker
              coordinate={myPosition}
              pinColor="red" // 내 위치는 빨간색 핀으로 표시
            />
          )}
          {pathCoordinates.length > 1 && (
            <Polyline
              coordinates={pathCoordinates}
              strokeWidth={5}
              strokeColor="#00FF00"
              onClick={() => console.warn('Ployline clicked!')}
            />
          )}
        </NaverMapView>
      </View>
      <View>
        <Text>latitude: {myPosition?.latitude}</Text>
        <Text>longitude: {myPosition?.longitude}</Text>
        <Text>Total Distance: {totalDistance.toFixed(2)} meters</Text>
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

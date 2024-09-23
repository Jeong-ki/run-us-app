// 위도 경도 -> KM 변환 함수
// function getDistanceFromLatLonInKm(
//   lat1: number,
//   lon1: number,
//   lat2: number,
//   lon2: number,
// ) {
//   const R = 6371; // Radius of the earth in km
//   const dLat = deg2rad(lat2 - lat1); // deg2rad below
//   const dLon = deg2rad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(deg2rad(lat1)) *
//       Math.cos(deg2rad(lat2)) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const d = R * c; // Distance in km
//   return d;
// }

// function deg2rad(deg: number) {
//   return deg * (Math.PI / 180);
// }

// export default getDistanceFromLatLonInKm;

import {ICoordinate} from '@/@types/common';

// 두 좌표 사이의 거리를 계산하는 함수 (Haversine 공식)
export const calculateDistance = (coord1: ICoordinate, coord2: ICoordinate) => {
  const R = 6371e3; // 지구의 반지름 (미터 단위)
  const lat1 = (coord1.latitude * Math.PI) / 180;
  const lat2 = (coord2.latitude * Math.PI) / 180;
  const deltaLat = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const deltaLon = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // 미터 단위의 거리
  return distance;
};

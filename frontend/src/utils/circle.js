export const isPointInCircle = (
  centerLat,
  centerLng,
  radius,
  pointLat,
  pointLng
) => {
  // 地点間の距離を計算
  const distance = getDistance(centerLat, centerLng, pointLat, pointLng);

  // 地点が円の中に含まれるか判定
  if (distance <= radius / 1000) {
    return true;
  } else {
    return false;
  }
};

// 2地点間の距離を計算する関数

const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // 地球の半径（km）

  const lat1Rad = toRad(lat1);
  const lng1Rad = toRad(lng1);
  const lat2Rad = toRad(lat2);
  var lng2Rad = toRad(lng2);

  const deltaLat = lat2Rad - lat1Rad;
  const deltaLng = lng2Rad - lng1Rad;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
};

// 度数からラジアンに変換する関数
export const toRad = (deg) => {
  return (deg * Math.PI) / 180;
};

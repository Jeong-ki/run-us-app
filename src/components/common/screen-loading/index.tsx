import React from 'react';
import {COMMON_STYLES} from '@/assets/styles/common-styles';
import {ActivityIndicator, View} from 'react-native';

const ScreenLoading = () => {
  return (
    <View style={COMMON_STYLES.flexCenter}>
      <ActivityIndicator
        testID="screen-loader"
        size="large"
        color="darkslateblue"
      />
    </View>
  );
};

export default ScreenLoading;

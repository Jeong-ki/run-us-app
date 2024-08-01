import {Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {Button} from '@/components/elements';
import {RouteNames} from '@/navigation/route-names';
import type {HomeScreenProps} from '@/navigation/types';

const TestScreen = ({navigation}: HomeScreenProps) => {
  const handleMoveDetails: () => void = useCallback((): void => {
    navigation.navigate(RouteNames.user);
  }, [navigation]);

  return (
    <>
      <View
        style={{flex: 1, alignItems: 'flex-end', backgroundColor: 'yellow'}}>
        <Text>Home</Text>
        <Button onClick={handleMoveDetails}>Go Details</Button>
      </View>
      <View style={{flex: 2, backgroundColor: 'skyblue'}}>
        <Text>Good2</Text>
      </View>
    </>
  );
};

export default TestScreen;

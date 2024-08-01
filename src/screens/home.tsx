import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
// import {MainCalendar} from '@/components/calendar';
import type {HomeScreenProps} from '@/navigation/types';
// import {Modal} from '@/components/modal';
// import {useModalStore} from '@/stores/useModalStore';

const HomeScreen = ({}: HomeScreenProps) => {
  // const {isOpen} = useModalStore();

  return (
    <SafeAreaView style={styles.container}>
      {/* <MainCalendar /> */}
      {/* {isOpen && <Modal />} */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

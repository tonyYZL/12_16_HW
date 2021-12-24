import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Button, View, ScrollView, RefreshControl, SafeAreaView, } from 'react-native';
import firebase from 'firebase';
import TimeController from './Time';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const firebaseConfig = {
  apiKey: 'AIzaSyC97hQa-ALJykLIWpF_FmT4Wm7jUOEP2tw',
  authDomain: 'project-2494569955422475777.firebaseapp.com',
  projectId: 'project-2494569955422475777',
  storageBucket: 'project-2494569955422475777.appspot.com',
  messagingSenderId: '447514760557',
  appId: '1:447514760557:web:341fa64743578b45e97664',
  measurementId: 'G-2E8WWSQQGM',
};

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  const [times, setTimes] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    TimeController.getAllTimes().then((res) => {
      setTimes(res);
      setRefreshing(false);
    });
  };
  const onRefreshOne = () => {
    setRefreshing(true);
    TimeController.getLastestTime().then((res) => {
      setTimes(res);
      setRefreshing(false);
    });
  };
  const onRefreshDelete = () => {
    setRefreshing(true);
    TimeController.deleteEarliestTime().then((res) => {
      setTimes(res);
      setRefreshing(false);
    });
  };
  const onRefreshAdd = () => {
    setRefreshing(true);
    TimeController.addCurrentTime().then((res) => {
      setTimes(res);
      setRefreshing(false);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
          style={styles.scrollView}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
        )}
      >
        <Text>{times}</Text>
        <Text>{'\n'}</Text>
        <Text>{'\n'}</Text>

        <Button
          onPress={onRefreshOne}
          title="get lastest time"
          color="#FFBF00"
        />
        <Text>{'\n'}</Text>
        
        <Button
          onPress={onRefresh}
          title="get all time"
          color="#007FFF"
        />
        <Text>{'\n'}</Text>

        <Button
          onPress={onRefreshAdd}
          title="add current time"
          color="#00FF00"
        />
        <Text>{'\n'}</Text>

        <Button
        onPress={onRefreshDelete}
        title="delete earliest time"
        color="#FF0000"
        />

      </ScrollView>
    </SafeAreaView>
  );
}
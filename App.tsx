import React, {useState} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';

import {
  Canvas,
  Group,
  RoundedRect,
  runTiming,
  Skia,
  useComputedValue,
  useValue,
  vec,
  Text as SkText,
} from '@shopify/react-native-skia';
import {processTransform3d, toMatrix3} from 'react-native-redash';

const colors = ['#deb7ff', '#c785ec', '#a86add', '#8549a7', '#634087'];

const NUM_OF_CONFETTI = 50;
const CONFETTI_WIDTH = 10;
const CONFETTI_HEIGHT = 30;

const {height, width} = Dimensions.get('window');

interface Offset {
  offsetId: string;
  startingXOffset: number;
  startingYOffset: number;
  colorCode: number;
}

const App = () => {
  const [confettiPieces, setConfettiPieces] = useState<Offset[]>([]);

  return (
    <View style={styles.container}>
      <Canvas style={styles.container}></Canvas>
      <Text style={styles.title}>Congratulations!</Text>
      <Pressable onPress={() => {}} style={styles.button}>
        <Text style={styles.buttonText}>START</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    position: 'absolute',
    top: '45%',
    textAlign: 'center',
    width: '100%',
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
  },
  button: {
    height: 60,
    backgroundColor: 'purple',
    position: 'absolute',
    left: 30,
    right: 30,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default App;

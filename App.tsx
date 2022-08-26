import React, {useState} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';

import uuid from 'react-native-uuid';

import {
  Canvas,
  Group,
  RoundedRect,
  runTiming,
  Skia,
  useComputedValue,
  useValue,
  vec,
} from '@shopify/react-native-skia';
import {processTransform3d, toMatrix3} from 'react-native-redash';

const NUM_OF_CONFETTI = 30;

const {height, width} = Dimensions.get('window');

const relativeSin = (yPosition: number) =>
  Math.sin((yPosition - 300) * (Math.PI / 360));

interface Offset {
  offsetId: string;
  startingXOffset: number;
  startingYOffset: number;
}

const ConfettiPiece = ({startingXOffset, startingYOffset}: Offset) => {
  const WIDTH = 10;
  const HEIGHT = 30;

  const yPosition = useValue(startingYOffset);

  runTiming(yPosition, height + 200, {
    duration: 3000,
  });

  return (
    <RoundedRect
      r={8}
      x={startingXOffset}
      y={yPosition}
      height={WIDTH}
      width={HEIGHT}
    />
  );
};

const App = () => {
  const [confettiPieces, setConfettiPieces] = useState<Offset[]>([]);

  const startAnimation = () => {
    const pieces: Offset[] = [];

    for (let i = 0; i < NUM_OF_CONFETTI; i++) {
      const startingXOffset = Math.round(Math.random() * width);
      const startingYOffset = -Math.round(Math.random() * height);
      const id = uuid.v4() + '';
      pieces.push({offsetId: id, startingXOffset, startingYOffset});
    }

    setConfettiPieces(pieces);
  };

  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        {confettiPieces.map((offset: Offset) => {
          return <ConfettiPiece key={offset.offsetId} {...offset} />;
        })}
      </Canvas>
      <Pressable onPress={startAnimation} style={styles.button}>
        <Text style={styles.buttonText}>ANIMATE!</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    height: 100,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default App;

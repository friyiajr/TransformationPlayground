import React, {useCallback, useMemo, useState} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';

import uuid from 'react-native-uuid';

import {
  Canvas,
  Drawing,
  mix,
  runTiming,
  Skia,
  SkiaValue,
  SkPaint,
  useValue,
  vec,
} from '@shopify/react-native-skia';
import {processTransform3d, toMatrix3} from 'react-native-redash';
import {DrawingContext} from '@shopify/react-native-skia/lib/typescript/src/renderer/DrawingContext';

const NUM_OF_CONFETTI = 200;

const {height, width} = Dimensions.get('window');

const relativeSin = (yPosition: number) =>
  Math.sin((yPosition - 300) * (Math.PI / 360));

interface Offset {
  offsetId: string;
  startingXOffset: number;
  startingYOffset: number;
  animationValue: SkiaValue;
  paint: SkPaint;
}

const ConfettiPiece = ({
  animationValue,
  startingXOffset,
  startingYOffset,
  paint,
}: Offset) => {
  const WIDTH = 10;
  const HEIGHT = 30;
  const seed = Math.random() * 4;

  const onDraw = useCallback(
    ({canvas}: DrawingContext) => {
      // Y position
      const yPosition = mix(
        animationValue.current,
        startingYOffset,
        height + 200,
      );
      // Origin:
      const centerY = yPosition + HEIGHT / 2;
      const centerX = startingXOffset + WIDTH / 2;
      const origin = vec(centerX, centerY);
      // Matrix:
      const rotateZ = relativeSin(yPosition) * seed;
      const rotateY = relativeSin(yPosition) * seed;
      const rotateX = relativeSin(yPosition) * seed;
      const mat3 = toMatrix3(
        processTransform3d([
          {rotateY: rotateY},
          {rotateX: rotateX},
          {rotateZ: rotateZ},
        ]),
      );

      canvas.save();
      canvas.translate(origin.x, origin.y);
      canvas.concat(Skia.Matrix(mat3));
      canvas.translate(-origin.x, -origin.y);
      canvas.drawRRect(
        Skia.RRectXY(
          Skia.XYWHRect(startingXOffset, yPosition, WIDTH, HEIGHT),
          8,
          8,
        ),
        paint,
      );
      canvas.restore();
    },
    [animationValue, paint, seed, startingXOffset, startingYOffset],
  );

  return <Drawing drawing={onDraw} />;
};

const App = () => {
  const [confettiPieces, setConfettiPieces] = useState<Offset[]>([]);
  const animationValue = useValue(0);
  const paint = useMemo(() => Skia.Paint(), []);

  const startAnimation = () => {
    const pieces: Offset[] = [];

    for (let i = 0; i < NUM_OF_CONFETTI; i++) {
      const startingXOffset = Math.round(Math.random() * width);
      const startingYOffset = -Math.round(Math.random() * height);
      const id = uuid.v4() + '';
      pieces.push({
        offsetId: id,
        startingXOffset,
        startingYOffset,
        animationValue,
        paint,
      });
    }

    setConfettiPieces(pieces);

    animationValue.current = 0;
    runTiming(animationValue, 1, {duration: 3000});
  };

  return (
    <View style={styles.container}>
      <Canvas style={styles.container} debug mode="continuous">
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

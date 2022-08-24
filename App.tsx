import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {
  Skia,
  Canvas,
  Group,
  Rect,
  RoundedRect,
} from '@shopify/react-native-skia';
import {processTransform3d, toMatrix3} from 'react-native-redash';

const App = () => {
  const mat3 = toMatrix3(
    processTransform3d([{rotateX: 0.3, rotateY: 0.3, rotateZ: 0.2}]),
  );

  const matrix = Skia.Matrix(mat3);

  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        <Group matrix={matrix}>
          <RoundedRect r={8} x={200} y={100} height={10} width={30} />
        </Group>
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

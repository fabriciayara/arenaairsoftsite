import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../lib/theme';

export default function Logo({ size = 80 }: { size?: number }) {
  const iconSize = size * 0.55;
  const ringThickness = iconSize * 0.14;
  const barLength = iconSize * 0.3;
  const barThickness = iconSize * 0.12;
  const dotSize = iconSize * 0.16;

  return (
    <View
      style={[
        styles.badge,
        { width: size, height: size, borderRadius: size * 0.25 },
      ]}
    >
      <View style={{ width: iconSize, height: iconSize }}>
        <View
          style={[
            styles.ring,
            {
              width: iconSize,
              height: iconSize,
              borderRadius: iconSize / 2,
              borderWidth: ringThickness,
            },
          ]}
        />
        <View
          style={[
            styles.dot,
            {
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              top: iconSize / 2 - dotSize / 2,
              left: iconSize / 2 - dotSize / 2,
            },
          ]}
        />
        <View
          style={[
            styles.bar,
            {
              width: barThickness,
              height: barLength,
              top: -barLength * 0.08,
              left: iconSize / 2 - barThickness / 2,
            },
          ]}
        />
        <View
          style={[
            styles.bar,
            {
              width: barThickness,
              height: barLength,
              top: iconSize - barLength * 0.92,
              left: iconSize / 2 - barThickness / 2,
            },
          ]}
        />
        <View
          style={[
            styles.bar,
            {
              width: barLength,
              height: barThickness,
              left: -barLength * 0.08,
              top: iconSize / 2 - barThickness / 2,
            },
          ]}
        />
        <View
          style={[
            styles.bar,
            {
              width: barLength,
              height: barThickness,
              left: iconSize - barLength * 0.92,
              top: iconSize / 2 - barThickness / 2,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderColor: '#fff',
  },
  dot: {
    position: 'absolute',
    backgroundColor: '#fff',
  },
  bar: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
});

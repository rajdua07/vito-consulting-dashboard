import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { typography } from '../theme/colors';

interface AvatarProps {
  name: string;
  color: string;
  size?: number;
}

export function Avatar({ name, color, size = 40 }: AvatarProps) {
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color + '20',
        },
      ]}
    >
      <Text style={[styles.initials, { color, fontSize: size * 0.36 }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontWeight: '600',
  },
});

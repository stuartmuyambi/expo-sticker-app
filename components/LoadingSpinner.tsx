import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated';
import { useTheme } from '../contexts/ThemeContext';

interface LoadingSpinnerProps {
  size?: number;
  style?: ViewStyle;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  style
}) => {
  const { colors } = useTheme();
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={[{ width: size, height: size }, style]}>
      <Animated.View style={[animatedStyle, { width: size, height: size }]}>
        <LinearGradient
          colors={[colors.primary, colors.secondary, colors.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            padding: 2,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: colors.background,
              borderRadius: (size - 4) / 2,
            }}
          />
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

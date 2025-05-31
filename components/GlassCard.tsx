import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { BorderRadius, Shadows, Spacing } from '../constants/Theme';
import { useTheme } from '../contexts/ThemeContext';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
  onPress?: () => void;
  gradient?: boolean;
  gradientColors?: string[];
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  intensity = 20,
  tint = 'dark',
  onPress,
  gradient = false,
  gradientColors,
}) => {
  const { colors, colorScheme } = useTheme();
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    if (onPress) {
      scale.value = withSpring(0.98);
    }
  };

  const handlePressOut = () => {
    if (onPress) {
      scale.value = withSpring(1);
    }
  };

  const cardStyle = {
    borderRadius: BorderRadius['2xl'],
    overflow: 'hidden' as const,
    ...Shadows.lg,
    backgroundColor: colorScheme === 'dark' 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: colorScheme === 'dark'
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(255, 255, 255, 0.3)',
  };

  const content = (
    <BlurView
      intensity={intensity}
      tint={colorScheme === 'dark' ? 'dark' : 'light'}
      style={[{ flex: 1, padding: Spacing.lg }, style]}
    >
      {children}
    </BlurView>
  );

  if (gradient) {
    return (
      <AnimatedPressable
        style={[animatedStyle, cardStyle]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={!onPress}
      >
        <LinearGradient
          colors={gradientColors || [
            colorScheme === 'dark' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.1)',
            colorScheme === 'dark' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.1)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        >
          {content}
        </LinearGradient>
      </AnimatedPressable>
    );
  }

  if (onPress) {
    return (
      <AnimatedPressable
        style={[animatedStyle, cardStyle]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
      >
        {content}
      </AnimatedPressable>
    );
  }

  return (
    <Animated.View style={[cardStyle]}>
      {content}
    </Animated.View>
  );
};

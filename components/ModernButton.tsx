import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, Text, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { BorderRadius, Shadows, Spacing, Typography } from '../constants/Theme';
import { useTheme } from '../contexts/ThemeContext';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ModernButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  gradientColors?: string[];
}

export const ModernButton: React.FC<ModernButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  loading = false,
  style,
  gradientColors,
}) => {
  const { colors } = useTheme();
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const getButtonStyle = () => {
    const baseStyle = {
      borderRadius: BorderRadius.xl,
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      ...Shadows.md,
    };

    const sizeStyles = {
      sm: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, height: 40 },
      md: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, height: 48 },
      lg: { paddingHorizontal: Spacing.xl, paddingVertical: Spacing.lg, height: 56 },
    };

    const variantStyles = {
      primary: {
        backgroundColor: colors.primary,
      },
      secondary: {
        backgroundColor: colors.secondary,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: colors.primary,
      },
      ghost: {
        backgroundColor: 'transparent',
      },
      gradient: {
        backgroundColor: 'transparent',
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      opacity: disabled ? 0.5 : 1,
    };
  };

  const getTextStyle = () => {
    const baseStyle = {
      fontWeight: Typography.fontWeights.semibold,
    };

    const sizeStyles = {
      sm: { fontSize: Typography.fontSizes.sm },
      md: { fontSize: Typography.fontSizes.base },
      lg: { fontSize: Typography.fontSizes.lg },
    };

    const variantStyles = {
      primary: { color: colors.white },
      secondary: { color: colors.white },
      outline: { color: colors.primary },
      ghost: { color: colors.primary },
      gradient: { color: colors.white },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const buttonContent = (
    <>
      {icon && <View style={{ marginRight: Spacing.sm }}>{icon}</View>}
      <Text style={getTextStyle()}>{loading ? 'Loading...' : title}</Text>
    </>
  );

  if (variant === 'gradient') {
    return (
      <AnimatedPressable
        style={[animatedStyle, style]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={disabled || loading}
      >
        <LinearGradient
          colors={gradientColors || ['#6366F1', '#8B5CF6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={getButtonStyle()}
        >
          {buttonContent}
        </LinearGradient>
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      style={[animatedStyle, getButtonStyle(), style]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {buttonContent}
    </AnimatedPressable>
  );
};

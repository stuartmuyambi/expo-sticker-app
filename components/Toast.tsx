import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { BorderRadius, Spacing, Typography } from '../constants/Theme';
import { useTheme } from '../contexts/ThemeContext';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  visible: boolean;
  onHide?: () => void;
}

// Toast Manager for global toast handling
class ToastManager {
  private static instance: ToastManager;
  private showCallback?: (message: string, options?: { type?: 'success' | 'error' | 'info' }) => void;

  static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  setShowCallback(callback: (message: string, options?: { type?: 'success' | 'error' | 'info' }) => void) {
    this.showCallback = callback;
  }

  show(message: string, options?: { type?: 'success' | 'error' | 'info' }) {
    if (this.showCallback) {
      this.showCallback(message, options);
    }
  }
}

const ToastComponent: React.FC<ToastProps> = ({
  message,
  type = 'info',
  visible,
  onHide,
}) => {
  const { colors } = useTheme();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  const hideToast = useCallback(() => {
    opacity.value = withTiming(0, { duration: 300 });
    translateY.value = withTiming(50, { duration: 300 });
    setTimeout(() => onHide?.(), 300);
  }, [opacity, translateY, onHide]);

  React.useEffect(() => {
    if (visible) {
      opacity.value = withSpring(1);
      translateY.value = withSpring(0);
      
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [visible, opacity, translateY, hideToast]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const getToastColors = (): [string, string] => {
    switch (type) {
      case 'success':
        return ['#4ade80', '#22c55e'];
      case 'error':
        return ['#f87171', '#ef4444'];
      default:
        return [colors.primary, colors.accent];
    }
  };

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <LinearGradient
        colors={getToastColors()}
        style={styles.toast}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.message}>{message}</Text>
      </LinearGradient>
    </Animated.View>
  );
};

// Create a compound component with static methods
export const Toast = Object.assign(ToastComponent, {
  show: (message: string, options?: { type?: 'success' | 'error' | 'info' }) => {
    ToastManager.getInstance().show(message, options);
  }
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: Spacing.md,
    right: Spacing.md,
    zIndex: 9999,
  },
  toast: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  message: {
    fontSize: Typography.fontSizes.base,
    fontWeight: Typography.fontWeights.medium,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

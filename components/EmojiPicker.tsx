import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BlurView } from 'expo-blur';
import { PropsWithChildren } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { BorderRadius, Shadows, Spacing, Typography } from '../constants/Theme';
import { useTheme } from '../contexts/ThemeContext';

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export default function EmojiPicker({ isVisible, children, onClose }: Props) {
  const { colors, colorScheme } = useTheme();
  
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.overlay}>
        <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
          <BlurView
            intensity={20}
            tint={colorScheme === 'dark' ? 'dark' : 'light'}
            style={styles.blurContainer}
          >
            <View style={[styles.titleContainer, { backgroundColor: colors.surfaceSecondary }]}>
              <Text style={[styles.title, { color: colors.text }]}>Choose a sticker</Text>
              <Pressable 
                onPress={onClose}
                style={[styles.closeButton, { backgroundColor: `${colors.textLight}20` }]}
              >
                <MaterialIcons name="close" color={colors.text} size={22} />
              </Pressable>
            </View>
            {children}
          </BlurView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '35%',
    width: '100%',
    borderTopRightRadius: BorderRadius['3xl'],
    borderTopLeftRadius: BorderRadius['3xl'],
    overflow: 'hidden',
    ...Shadows.xl,
  },
  blurContainer: {
    flex: 1,
  },
  titleContainer: {
    height: 60,
    borderTopRightRadius: BorderRadius['3xl'],
    borderTopLeftRadius: BorderRadius['3xl'],
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.semibold,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

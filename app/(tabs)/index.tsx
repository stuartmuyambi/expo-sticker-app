import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { useRef, useState } from 'react';
import { Alert, ImageSourcePropType, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { captureRef } from 'react-native-view-shot';

import EmojiList from '@/components/EmojiList';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiSticker from '@/components/EmojiSticker';
import { GlassCard } from '@/components/GlassCard';
import ImageViewer from '@/components/ImageViewer';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ModernButton } from '@/components/ModernButton';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Spacing, Typography } from '../../constants/Theme';
import { useTheme } from '../../contexts/ThemeContext';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const imageRef = useRef<View>(null);
  
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      Alert.alert('No image selected', 'You did not select any image.');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
    setSelectedImage(undefined);
    setPickedEmoji(undefined);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };
  const onSaveImageAsync = async () => {
    if (!imageRef.current) return;
    
    setIsLoading(true);
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });
      
      await MediaLibrary.saveToLibraryAsync(localUri);
      Alert.alert('Success!', 'Your sticker creation has been saved to your photo gallery.');
    } catch (error) {
      console.error('Error saving image:', error);
      Alert.alert('Error', 'Failed to save image to gallery.');
    } finally {
      setIsLoading(false);
    }
  };

  const onShareImageAsync = async () => {
    if (!imageRef.current) return;
    
    setIsLoading(true);
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });      await Sharing.shareAsync(localUri);
      Alert.alert('Success', 'Image shared successfully!');
    } catch (error) {      console.error('Error sharing image:', error);
      Alert.alert('Error', 'Failed to share image.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GestureHandlerRootView style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={[colors.background, colors.surface]}
        style={styles.gradientBackground}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              Sticker Studio
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Create amazing sticker art
            </Text>
          </Animated.View>

          {/* Image Editor Area */}
          <Animated.View entering={FadeInDown.delay(200)} style={styles.imageContainer}>
            <GlassCard style={styles.imageCard} gradient>
              <View ref={imageRef} style={styles.imageWrapper} collapsable={false}>
                <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
                {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
              </View>
            </GlassCard>
          </Animated.View>

          {/* Control Buttons */}
          {showAppOptions ? (
            <Animated.View entering={FadeInUp.delay(300)} style={styles.optionsContainer}>
              <View style={styles.optionsGrid}>
                <ModernButton
                  title="Reset"
                  onPress={onReset}
                  variant="outline"
                  size="md"
                  icon={<Ionicons name="refresh" size={20} color={colors.primary} />}
                  style={styles.optionButton}
                />
                <ModernButton
                  title="Add Sticker"
                  onPress={onAddSticker}
                  variant="gradient"
                  size="md"
                  icon={<Ionicons name="happy" size={20} color={colors.white} />}
                  style={styles.optionButton}
                />
              </View>
              <View style={styles.optionsGrid}>
                <ModernButton
                  title="Save"
                  onPress={onSaveImageAsync}
                  variant="primary"
                  size="md"
                  icon={<Ionicons name="download" size={20} color={colors.white} />}
                  style={styles.optionButton}
                  loading={isLoading}
                />
                <ModernButton
                  title="Share"
                  onPress={onShareImageAsync}
                  variant="secondary"
                  size="md"
                  icon={<Ionicons name="share" size={20} color={colors.white} />}
                  style={styles.optionButton}
                  loading={isLoading}
                />
              </View>
            </Animated.View>
          ) : (
            <Animated.View entering={FadeInUp.delay(300)} style={styles.startContainer}>
              <GlassCard style={styles.startCard}>
                <Text style={[styles.startTitle, { color: colors.text }]}>
                  Ready to create?
                </Text>
                <Text style={[styles.startText, { color: colors.textSecondary }]}>
                  Choose a photo from your gallery or use the default image to start creating your sticker masterpiece!
                </Text>
                
                <View style={styles.startButtons}>
                  <ModernButton 
                    title="Choose Photo" 
                    onPress={pickImageAsync}
                    variant="gradient"
                    size="lg"
                    icon={<Ionicons name="images" size={24} color={colors.white} />}
                    style={styles.startButton}
                  />
                  <ModernButton 
                    title="Use Default" 
                    onPress={() => setShowAppOptions(true)}
                    variant="outline"
                    size="lg"
                    icon={<Ionicons name="create" size={24} color={colors.primary} />}
                    style={styles.startButton}
                  />
                </View>
              </GlassCard>
            </Animated.View>
          )}

          {/* Loading Overlay */}
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <GlassCard style={styles.loadingCard}>
                <LoadingSpinner size={40} />
                <Text style={[styles.loadingText, { color: colors.text }]}>
                  Processing...
                </Text>
              </GlassCard>
            </View>
          )}
        </ScrollView>

        {/* Emoji Picker Modal */}
        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>
      </LinearGradient>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSizes['4xl'],
    fontWeight: Typography.fontWeights.bold,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.fontSizes.lg,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  imageCard: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  imageWrapper: {
    alignItems: 'center',
  },
  optionsContainer: {
    gap: Spacing.md,
  },
  optionsGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  optionButton: {
    flex: 1,
  },  startContainer: {
    justifyContent: 'center',
    minHeight: 300,
  },
  startCard: {
    alignItems: 'center',
    textAlign: 'center',
  },
  startTitle: {
    fontSize: Typography.fontSizes['2xl'],
    fontWeight: Typography.fontWeights.bold,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  startText: {
    fontSize: Typography.fontSizes.base,
    textAlign: 'center',
    lineHeight: Typography.lineHeights.relaxed * Typography.fontSizes.base,
    marginBottom: Spacing.xl,
  },
  startButtons: {
    width: '100%',
    gap: Spacing.md,
  },
  startButton: {
    width: '100%',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingCard: {
    alignItems: 'center',
    padding: Spacing.xl,
  },
  loadingText: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.medium,
    marginTop: Spacing.md,
  },
});

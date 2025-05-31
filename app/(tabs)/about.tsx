import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, ScrollView, StatusBar, StyleSheet, Switch, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GlassCard } from '../../components/GlassCard';
import { ModernButton } from '../../components/ModernButton';
import { BorderRadius, Spacing, Typography } from '../../constants/Theme';
import { useTheme } from '../../contexts/ThemeContext';

export default function AboutScreen() {
  const insets = useSafeAreaInsets();
  const { colors, toggleTheme, colorScheme } = useTheme();
  
  const settingsOptions = [
    {
      title: 'Dark Mode',
      description: 'Toggle between light and dark themes',
      icon: 'moon',
      type: 'switch',
      value: colorScheme === 'dark',
      onToggle: toggleTheme,
    },
    {
      title: 'Notifications',
      description: 'Receive updates about new features',
      icon: 'notifications',
      type: 'switch',
      value: true,
      onToggle: () => {},
    },
    {
      title: 'Auto-save',
      description: 'Automatically save your creations',
      icon: 'save',
      type: 'switch',
      value: true,
      onToggle: () => {},
    },
  ];

  const aboutItems = [
    { label: 'Version', value: '2.0.0' },
    { label: 'Developer', value: 'Stuart Muyambi' },
    { label: 'License', value: 'MIT' },
    { label: 'Platform', value: Platform.OS === 'ios' ? 'iOS' : 'Android' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={[colors.background, colors.surface]}
        style={styles.gradientBackground}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : insets.top,
              paddingBottom: insets.bottom + 100,
              paddingLeft: insets.left + Spacing.lg,
              paddingRight: insets.right + Spacing.lg,
            }
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              Settings
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Customize your StickerSmash experience
            </Text>
          </Animated.View>

          {/* App Info Card */}
          <Animated.View entering={FadeInDown.delay(200)}>
            <GlassCard style={styles.card} gradient>
              <View style={styles.appInfoHeader}>
                <View style={styles.appIconContainer}>
                  <LinearGradient
                    colors={[colors.primary, colors.secondary]}
                    style={styles.appIcon}
                  >
                    <Ionicons name="happy" size={40} color={colors.white} />
                  </LinearGradient>
                </View>
                <View style={styles.appInfoText}>
                  <Text style={[styles.appName, { color: colors.text }]}>
                    Sticker Studio
                  </Text>
                  <Text style={[styles.appDescription, { color: colors.textSecondary }]}>
                    Create amazing sticker art from your photos
                  </Text>
                </View>
              </View>
            </GlassCard>
          </Animated.View>

          {/* Settings */}
          <Animated.View entering={FadeInDown.delay(300)}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Preferences
            </Text>
            <GlassCard style={styles.card}>
              {settingsOptions.map((option, index) => (
                <View key={index}>
                  <View style={styles.settingItem}>
                    <View style={styles.settingItemLeft}>
                      <View style={[styles.settingIcon, { backgroundColor: `${colors.primary}20` }]}>
                        <Ionicons name={option.icon as any} size={20} color={colors.primary} />
                      </View>
                      <View style={styles.settingText}>
                        <Text style={[styles.settingTitle, { color: colors.text }]}>
                          {option.title}
                        </Text>
                        <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                          {option.description}
                        </Text>
                      </View>
                    </View>
                    <Switch
                      value={option.value}
                      onValueChange={option.onToggle}
                      trackColor={{ false: colors.border, true: `${colors.primary}80` }}
                      thumbColor={option.value ? colors.primary : colors.textLight}
                    />
                  </View>
                  {index < settingsOptions.length - 1 && (
                    <View style={[styles.separator, { backgroundColor: colors.border }]} />
                  )}
                </View>
              ))}
            </GlassCard>
          </Animated.View>

          {/* About Information */}
          <Animated.View entering={FadeInDown.delay(400)}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              About
            </Text>
            <GlassCard style={styles.card}>
              {aboutItems.map((item, index) => (
                <View key={index}>
                  <View style={styles.aboutItem}>
                    <Text style={[styles.aboutLabel, { color: colors.textSecondary }]}>
                      {item.label}
                    </Text>
                    <Text style={[styles.aboutValue, { color: colors.text }]}>
                      {item.value}
                    </Text>
                  </View>
                  {index < aboutItems.length - 1 && (
                    <View style={[styles.separator, { backgroundColor: colors.border }]} />
                  )}
                </View>
              ))}
            </GlassCard>
          </Animated.View>

          {/* How to Use */}
          <Animated.View entering={FadeInDown.delay(500)}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              How to Use
            </Text>
            <GlassCard style={styles.card}>
              <View style={styles.howToStep}>
                <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                  <Text style={[styles.stepNumberText, { color: colors.white }]}>1</Text>
                </View>
                <Text style={[styles.stepText, { color: colors.text }]}>
                  Choose a photo from your gallery or use the default image
                </Text>
              </View>
              <View style={styles.howToStep}>
                <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                  <Text style={[styles.stepNumberText, { color: colors.white }]}>2</Text>
                </View>
                <Text style={[styles.stepText, { color: colors.text }]}>
                  Add fun stickers and emojis to your image
                </Text>
              </View>
              <View style={styles.howToStep}>
                <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                  <Text style={[styles.stepNumberText, { color: colors.white }]}>3</Text>
                </View>
                <Text style={[styles.stepText, { color: colors.text }]}>
                  Save your creation or share it with friends!
                </Text>
              </View>
            </GlassCard>
          </Animated.View>

          {/* Action Buttons */}
          <Animated.View entering={FadeInDown.delay(600)} style={styles.actionButtons}>
            <ModernButton
              title="Rate App"
              onPress={() => {}}
              variant="outline"
              size="lg"
              icon={<Ionicons name="star" size={20} color={colors.primary} />}
              style={styles.actionButton}
            />
            <ModernButton
              title="Share App"
              onPress={() => {}}
              variant="gradient"
              size="lg"
              icon={<Ionicons name="share" size={20} color={colors.white} />}
              style={styles.actionButton}
            />
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </View>
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
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSizes['3xl'],
    fontWeight: Typography.fontWeights.bold,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.fontSizes.base,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: Typography.fontSizes.xl,
    fontWeight: Typography.fontWeights.bold,
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },
  card: {
    marginBottom: Spacing.lg,
  },
  appInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appIconContainer: {
    marginRight: Spacing.md,
  },
  appIcon: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appInfoText: {
    flex: 1,
  },
  appName: {
    fontSize: Typography.fontSizes.xl,
    fontWeight: Typography.fontWeights.bold,
    marginBottom: Spacing.xs,
  },
  appDescription: {
    fontSize: Typography.fontSizes.sm,
    lineHeight: Typography.lineHeights.normal * Typography.fontSizes.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: Typography.fontSizes.base,
    fontWeight: Typography.fontWeights.medium,
    marginBottom: Spacing.xs / 2,
  },
  settingDescription: {
    fontSize: Typography.fontSizes.sm,
  },
  aboutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  aboutLabel: {
    fontSize: Typography.fontSizes.base,
  },
  aboutValue: {
    fontSize: Typography.fontSizes.base,
    fontWeight: Typography.fontWeights.medium,
  },
  howToStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  stepNumberText: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.bold,
  },
  stepText: {
    flex: 1,
    fontSize: Typography.fontSizes.base,
    lineHeight: Typography.lineHeights.normal * Typography.fontSizes.base,
  },
  separator: {
    height: 1,
    marginVertical: 0,
  },
  actionButtons: {
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  actionButton: {
    width: '100%',
  },
});

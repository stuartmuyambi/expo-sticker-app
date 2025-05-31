import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import * as MediaLibrary from 'expo-media-library';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatGrid } from 'react-native-super-grid';
import { GlassCard } from '../../components/GlassCard';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ModernButton } from '../../components/ModernButton';
import { BorderRadius, Spacing, Typography } from '../../constants/Theme';
import { useTheme } from '../../contexts/ThemeContext';

const { width } = Dimensions.get('window');

export default function GalleryScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);

  const getPermissionAndLoadPhotos = useCallback(async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        setHasPermission(true);
        loadPhotos();
      } else {
        setHasPermission(false);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error getting media library permission:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPermissionAndLoadPhotos();
  }, [getPermissionAndLoadPhotos]);

  const loadPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync({
        mediaType: 'photo',
        first: 50,
        sortBy: ['creationTime'],
      });
      setPhotos(assets);
    } catch (error) {
      console.error('Error loading photos:', error);
      Alert.alert('Error', 'Failed to load photos');
    } finally {
      setLoading(false);
    }
  };

  const requestPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      setHasPermission(true);
      setLoading(true);
      loadPhotos();
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <LinearGradient
          colors={[colors.background, colors.surface]}
          style={styles.gradientBackground}
        >
          <View style={styles.loadingContainer}>
            <LoadingSpinner size={60} />
            <Text style={[styles.loadingText, { color: colors.text }]}>
              Loading your gallery...
            </Text>
          </View>
        </LinearGradient>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <LinearGradient
          colors={[colors.background, colors.surface]}
          style={styles.gradientBackground}
        >
          <View style={styles.permissionContainer}>
            <GlassCard style={styles.permissionCard}>
              <Text style={[styles.permissionTitle, { color: colors.text }]}>
                Gallery Access Required
              </Text>
              <Text style={[styles.permissionText, { color: colors.textSecondary }]}>
                We need access to your photo gallery to display your saved sticker creations.
              </Text>
              <ModernButton
                title="Grant Permission"
                onPress={requestPermission}
                variant="gradient"
                size="lg"
                style={{ marginTop: Spacing.lg }}
              />
            </GlassCard>
          </View>
        </LinearGradient>
      </View>
    );
  }

  const renderPhotoItem = ({ item }: { item: MediaLibrary.Asset }) => (
    <GlassCard 
      style={styles.photoCard}
      onPress={() => {
        // TODO: Open photo in full screen view
        console.log('Open photo:', item.uri);
      }}
    >
      <Image
        source={{ uri: item.uri }}
        style={styles.photoImage}
        contentFit="cover"
      />
    </GlassCard>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={[colors.background, colors.surface]}
        style={styles.gradientBackground}
      >
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <Text style={[styles.title, { color: colors.text }]}>
            Your Gallery
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {photos.length} photos
          </Text>
        </View>

        {photos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <GlassCard style={styles.emptyCard}>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>
                No Photos Found
              </Text>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                Start creating some sticker masterpieces!
              </Text>
            </GlassCard>
          </View>
        ) : (
          <FlatGrid
            itemDimension={(width - 48) / 2 - 8}
            data={photos}
            style={styles.grid}
            spacing={16}
            renderItem={renderPhotoItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: insets.bottom + 100,
            }}
          />
        )}
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
  header: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.fontSizes['3xl'],
    fontWeight: Typography.fontWeights.bold,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.fontSizes.base,
  },
  grid: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  photoCard: {
    padding: 0,
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: 150,
    borderRadius: BorderRadius.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: Typography.fontSizes.lg,
    marginTop: Spacing.lg,
    fontWeight: Typography.fontWeights.medium,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  permissionCard: {
    alignItems: 'center',
    textAlign: 'center',
  },
  permissionTitle: {
    fontSize: Typography.fontSizes['2xl'],
    fontWeight: Typography.fontWeights.bold,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: Typography.fontSizes.base,
    textAlign: 'center',
    lineHeight: Typography.lineHeights.relaxed * Typography.fontSizes.base,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  emptyCard: {
    alignItems: 'center',
    textAlign: 'center',
  },
  emptyTitle: {
    fontSize: Typography.fontSizes['2xl'],
    fontWeight: Typography.fontWeights.bold,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: Typography.fontSizes.base,
    textAlign: 'center',
    lineHeight: Typography.lineHeights.relaxed * Typography.fontSizes.base,
  },
});

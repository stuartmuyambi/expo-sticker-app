import { Platform, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AboutScreen() {
  const insets = useSafeAreaInsets();
  
  return (
    <View 
      style={[
        styles.container,
        {
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left + 16,
          paddingRight: insets.right + 16,
        }
      ]}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>StickerSmash</Text>
        <Text style={styles.text}>
          A fun app to create custom stickers from your photos.
        </Text>
        <Text style={styles.subtitle}>How to use:</Text>
        <Text style={styles.text}>
          1. Choose a photo from your gallery{'\n'}
          2. Add stickers, emojis, and text{'\n'}
          3. Save or share your creation!
        </Text>
        <Text style={styles.subtitle}>Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    color: '#ffd33d',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 8,
  },
});

import { Image } from 'expo-image';
import { useState } from 'react';
import { FlatList, ImageSourcePropType, Platform, Pressable, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { BorderRadius, Spacing } from '../constants/Theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  onSelect: (image: ImageSourcePropType) => void;
  onCloseModal: () => void;
};

export default function EmojiList({ onSelect, onCloseModal }: Props) {
  const [emoji] = useState<ImageSourcePropType[]>([
    require("../assets/images/emoji1.png"),
    require("../assets/images/emoji2.png"),
    require("../assets/images/emoji3.png"),
    require("../assets/images/emoji4.png"),
    require("../assets/images/emoji5.png"),
    require("../assets/images/emoji6.png"),
  ]);

  const EmojiItem = ({ item, index }: { item: ImageSourcePropType; index: number }) => {
    const scale = useSharedValue(1);
    
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });

    const handlePressIn = () => {
      scale.value = withSpring(0.9);
    };

    const handlePressOut = () => {
      scale.value = withSpring(1);
    };

    return (
      <AnimatedPressable
        style={[animatedStyle, styles.emojiContainer]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => {
          onSelect(item);
          onCloseModal();
        }}
      >
        <Image source={item} key={index} style={styles.image} />
      </AnimatedPressable>
    );
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <EmojiItem item={item} index={index} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
  },
  emojiContainer: {
    marginRight: Spacing.md,
    borderRadius: BorderRadius.xl,
    padding: Spacing.sm,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.lg,
  },
});

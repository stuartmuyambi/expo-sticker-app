import { Image } from 'expo-image';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import { BorderRadius, Shadows } from '../constants/Theme';

type Props = {
  imgSource: ImageSourcePropType;
  selectedImage?: string;
};

export default function ImageViewer({ imgSource, selectedImage }: Props) {
  const imageSource = selectedImage ? { uri: selectedImage } : imgSource;

  return (
    <Image 
      source={imageSource} 
      style={styles.image}
      contentFit="cover" 
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: BorderRadius['2xl'],
    ...Shadows.lg,
  },
});

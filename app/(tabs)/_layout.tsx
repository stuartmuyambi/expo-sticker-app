import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';

export default function TabLayout() {
    const insets = useSafeAreaInsets();
    const { colors, colorScheme } = useTheme();
    
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textLight,
                headerStyle: {
                    backgroundColor: colors.surface,
                },
                headerShadowVisible: false,
                headerTintColor: colors.text,
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: colorScheme === 'dark' 
                        ? 'rgba(30, 41, 59, 0.8)' 
                        : 'rgba(248, 249, 250, 0.8)',
                    borderTopWidth: 0,
                    height: 60 + insets.bottom,
                    paddingBottom: insets.bottom,
                    paddingTop: 8,
                    marginHorizontal: 16,
                    marginBottom: insets.bottom + 16,
                    borderRadius: 20,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.1,
                    shadowRadius: 20,
                    elevation: 5,
                },
                tabBarBackground: () => (
                    <BlurView
                        intensity={20}
                        tint={colorScheme === 'dark' ? 'dark' : 'light'}
                        style={{
                            ...StyleSheet.absoluteFillObject,
                            borderRadius: 20,
                        }}
                    />
                ),
                tabBarItemStyle: {
                    padding: 5,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Create',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons 
                            name={focused ? 'create' : 'create-outline'} 
                            color={color} 
                            size={24} 
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="gallery"
                options={{
                    title: 'Gallery',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons 
                            name={focused ? 'images' : 'images-outline'} 
                            color={color} 
                            size={24} 
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="about"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons 
                            name={focused ? 'settings' : 'settings-outline'} 
                            color={color} 
                            size={24} 
                        />
                    ),
                }}
            />
        </Tabs>
    );
}

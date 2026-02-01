import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cn } from '@/lib/utils';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export function TopNavigation({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
      <SafeAreaView edges={['top']} className="bg-background">
      <View className="flex-row justify-center gap-8 px-6 py-2" style={{ borderBottomWidth: 0 }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title || route.name;
          const isActive = state.index === index;

          // ignore (tabs)/index route
          // its only purpose is to redirect to recipe tab
          if (route.name === 'index') return null;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isActive && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              className="py-2"
            >
              <Text
                className={cn(
                  'text-base font-medium transition-colors',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {label}
              </Text>
              {isActive && (
                <View className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-foreground rounded-full" />
              )}
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
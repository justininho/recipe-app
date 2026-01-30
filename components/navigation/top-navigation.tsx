import { View, Text, Pressable } from 'react-native';
import {useRouter, useSegments, Href} from 'expo-router';
import { cn } from '@/lib/utils';

type NavItem = {
  label: string;
  path: Href;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Recipes', path: '/(tabs)/(recipes)' },
  { label: 'Meal Plan', path: '/(tabs)/(meal-plan)' },
  { label: 'Grocery', path: '/(tabs)/(grocery)' },
];

export function TopNavigation() {
  const router = useRouter();
  // const pathname = usePathname();
  const segments = useSegments();

  // Get the active segment (will be like ['(tabs)', 'recipes'] or ['(tabs)', 'meal-plan'])
  const activeSegment = segments[1] || 'recipes'; // Default to recipes

  const isActive = (path: Href) => {
    const segment = path.toString().split('/')[2]; // Get the segment from the path
    return activeSegment === segment
  };

  return (
    <View className="flex-row justify-center gap-8 px-6 py-4 bg-background border-b border-border">
      {NAV_ITEMS.map((item) => (
        <Pressable
          key={item.path.toString()}
          onPress={() => router.push(item.path)}
          className="py-2"
        >
          <Text
            className={cn(
              'text-base font-medium transition-colors',
              isActive(item.path)
                ? 'text-foreground'
                : 'text-muted-foreground'
            )}
          >
            {item.label}
          </Text>
          {isActive(item.path) && (
            <View className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-foreground rounded-full" />
          )}
        </Pressable>
      ))}
    </View>
  );
}
// app/(tabs)/grocery.tsx
import { View, Text } from 'react-native';

export default function GroceryPage() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-2xl font-bold text-foreground">Grocery List</Text>
      <Text className="text-muted-foreground mt-2">Coming soon...</Text>
    </View>
  );
}
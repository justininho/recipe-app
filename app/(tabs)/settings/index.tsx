import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Switch } from '@/components/ui/switch';
import { useColorScheme } from "nativewind";

export default function SettingsPage() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View key={colorScheme} className="flex-1 p-4">

      <View className="mb-6">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-semibold">Dark Mode</Text>
          <Switch
            checked={colorScheme === 'dark'}
            onCheckedChange={toggleColorScheme}
          />
        </View>
      </View>
    </View>
  );
}
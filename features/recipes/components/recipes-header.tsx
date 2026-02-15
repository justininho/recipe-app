import {View} from "react-native";
import {Text} from "@/components/ui/text";
import {useSafeAreaInsets} from "react-native-safe-area-context";

type RecipesHeaderProps = {
  title?: string;
  count?: number;
}

export default function RecipesHeader({
  title = "My Recipes",
  count,
}: RecipesHeaderProps) {

  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row items-end justify-between"
      style={{
        paddingTop: 8 + insets.top,
        paddingBottom: 8,
      }}>

      <View>
        <Text className="text-xl font-bold">{title}</Text>
        {count && (
          <Text className="text-muted-foreground mt-1">
            {count} {count === 1 ? 'recipe' : 'recipes'}
          </Text>
        )}
      </View>
    </View>
  );
};
import {View} from "react-native";
import {Text} from "@/components/ui/text";
import {useSafeAreaInsets} from "react-native-safe-area-context";

type RecipesHeaderProps = {
  title?: string;
  count?: number;
  inline?: boolean;
}

export default function RecipesHeader({
                                        title = "My Recipes",
                                        count,
                                        inline = false,
                                      }: RecipesHeaderProps) {
  
  const insets = useSafeAreaInsets();
  
  return (
    <View
        className={`flex-row justify-between ${inline ? 'items-baseline' : 'items-end'}`}
        style={{
        paddingTop: 8 + insets.top,
        paddingBottom: 8,
      }}>
      
      {inline ? (
        <View className="flex-row items-center gap-2">
          <Text className="text-xl font-bold">{title}</Text>
          {count && (
            <Text className="text-muted-foreground">
              - {count} {count === 1 ? 'recipe' : 'recipes'}
            </Text>
          )}
        </View>
      ) : (
        <View>
          <Text className="text-xl font-bold">{title}</Text>
          {count && (
            <Text className="text-muted-foreground mt-1">
              {count} {count === 1 ? 'recipe' : 'recipes'}
            </Text>
          )}
        </View>
      )}
    
    </View>
  );
};
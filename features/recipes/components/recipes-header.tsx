import { View, Pressable } from "react-native";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Option, TriggerRef } from "@rn-primitives/select";
import { ViewBy } from "@/features/recipes/types/recipe.types";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

type RecipesHeaderProps = {
  title?: string;
  count?: number;
  showSelect?: boolean;
  showBackButton?: boolean;
  viewBy?: ViewBy;
  onViewByChange?: (option: Option) => void;
}

export default function RecipesHeader({
                                        title = "My Recipes",
                                        count,
                                        showSelect = false,
                                        showBackButton = false,
                                        viewBy,
                                        onViewByChange
                                      }: RecipesHeaderProps) {

  const router = useRouter();
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 16,
    right: 16,
  };

  const selectRef = useRef<TriggerRef>(null);

  function onTouchStart() {
    selectRef.current?.open();
  }

  const viewOptions: { label: string, value: ViewBy }[] = [
    {label: 'All Recipes', value: 'all'},
    {label: 'Favorites', value: 'favorites'},
    {label: 'By Tags', value: 'tags'},
    {label: 'By Groups', value: 'groups'},
  ];

  return (
    <View
      className="px-6 pt-6 pb-4 flex-row items-end justify-between"
      style={{
        paddingTop: 24,
      }}>
      <View className="flex-row items-center gap-2">
        {showBackButton && (
          <Pressable
            onPress={() => router.back()}
            className="mr-2 active:opacity-70"
          >
            <ChevronLeft size={24} className="text-foreground" />
          </Pressable>
        )}
        <View>
          <Text className="text-xl font-bold">{title}</Text>
          <Text className="text-muted-foreground mt-1">
            {count} {count === 1 ? 'recipe' : 'recipes'}
          </Text>
        </View>
      </View>

      {/* View By Select */}
      {showSelect &&
          <Select className="ml-auto self-end"
                  value={viewOptions.filter(option => option.value === viewBy)[0]}
                  defaultValue={viewOptions[0]}
                  onValueChange={onViewByChange}>
              <SelectTrigger className='w-[180px]'
                             ref={selectRef}
                             onTouchStart={onTouchStart}>
                  <SelectValue placeholder='Select a group'/>
              </SelectTrigger>
              <SelectContent insets={contentInsets} className='w-[180px]'>
                  <SelectGroup>
                      <SelectLabel>View</SelectLabel>
                    {viewOptions.map((option) => (
                      <SelectItem key={option.value} label={option.label} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
              </SelectContent>
          </Select>
      }
    </View>
  );
};
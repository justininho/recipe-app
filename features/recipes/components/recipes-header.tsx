// features/recipes/components/recipes-header.tsx
import {View} from "react-native";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {Text} from "@/components/ui/text";
import {useRef} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Option, TriggerRef} from "@rn-primitives/select";
import {ViewBy} from "@/features/recipes/types/recipe.types";

type RecipesHeaderProps = {
  title?: string;
  count?: number;
  showSelect?: boolean;
  viewBy?: ViewBy
  onViewByChange?: (option: Option) => void;
}

export default function RecipesHeader({
                                        title = "My Recipes",
                                        count,
                                        showSelect = false,
                                        viewBy,
                                        onViewByChange
                                      }: RecipesHeaderProps) {

  // accounts for notch and safe viewing area
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  // used by select
  const selectRef = useRef<TriggerRef>(null);

  // Workaround for rn-primitives/select not opening on mobile
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
    <View className="px-6 pt-5 pb-4 flex-row items-end">
      <View className="">
        <Text className="text-xl font-bold">{title}</Text>
        <Text className="text-muted-foreground mt-1">
          {count} {count === 1 ? 'recipe' : 'recipes'}
        </Text>
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
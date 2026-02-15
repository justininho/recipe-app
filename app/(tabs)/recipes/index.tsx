import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {View} from 'react-native';
import React, {useRef, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {MOCK_FAVORITES, MOCK_GROUPS, MOCK_RECIPES} from "@/features/recipes/mocks/recipe.mocks";
import {
  Option,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {TriggerRef} from "@rn-primitives/select";
import {AllRecipesView} from "@/features/recipes/components/recipe-views/all-recipes-view";
import {FavoriteRecipesView} from "@/features/recipes/components/recipe-views/favorite-recipes-view";
import {RecipesByGroupsView} from "@/features/recipes/components/recipe-views/by-groups-view";
import {RecipesByTagsView} from "@/features/recipes/components/recipe-views/by-tags-view";
import {ViewBy} from "@/features/recipes/types/recipe.types";
import {Stack} from "expo-router";
import RecipesHeader from "@/features/recipes/components/recipes-header";

export default function RecipesScreen() {
  const [recipes] = useState(MOCK_RECIPES);
  const [favorites] = useState(MOCK_FAVORITES);
  const [groups] = useState(MOCK_GROUPS);

  //
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
  const [view, setView] = useState<ViewBy>('all');
  const title = viewOptions.filter(option => option.value === view)[0].label;
  
  const onViewByChange = (option?: Option) => {
    if (option?.value) setView(option.value as ViewBy);
  }

  return (

    <SafeAreaView className="flex-1 bg-background">
      <Stack.Screen
        options={{
          headerShown: true,
          title: title,
          headerTitle: () => (
            <View className="px-2" style={{paddingLeft: contentInsets.left}}>
              <RecipesHeader
                title="My Recipes"
                count={recipes.length}
              />
            </View>
          ),
          headerRight: () => (
            <View className="px-2" style={{paddingRight: contentInsets.right}}>
              <Select
                value={viewOptions.filter(option => option.value === view)[0]}
                defaultValue={viewOptions[0]}
                onValueChange={onViewByChange}
              >
                <SelectTrigger className='w-[180px]' ref={selectRef} onTouchStart={onTouchStart}>
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
            </View>

          )
        }}
      />

      <StatusBar style="auto"/>

      {view === 'all' && <AllRecipesView recipes={recipes}/>}
      {view === 'favorites' && <FavoriteRecipesView recipes={recipes} favorites={favorites}/>}
      {view === 'groups' && <RecipesByGroupsView recipes={recipes} groups={groups}/>}
      {view === 'tags' && <RecipesByTagsView recipes={recipes}/>}

    </SafeAreaView>
  );
}
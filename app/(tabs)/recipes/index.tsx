import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRef, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {Text} from '@/components/ui/text';
import {Plus, SortAsc, FilterXIcon} from 'lucide-react-native';
import {MOCK_FAVORITES, MOCK_GROUPS, MOCK_RECIPES} from "@/features/recipes/mocks/recipe.mocks";
import {RecipeList} from "@/features/recipes/components/recipe-list";
import {Stack, useRouter} from "expo-router";
import {ContextAction, ContextFAB} from "@/components/ui/context-fab";
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {TriggerRef} from "@rn-primitives/select";
import {AllRecipesView} from "@/features/recipes/components/recipe-views/all-recipes-view";
import {FavoriteRecipesView} from "@/features/recipes/components/recipe-views/favorite-recipes-view";
import {RecipesByGroupsView} from "@/features/recipes/components/recipe-views/by-groups-view";
import {RecipesByTagsView} from "@/features/recipes/components/recipe-views/by-tags-view";
import RecipesHeader from "@/features/recipes/components/recipes-header";
import {ViewBy} from "@/features/recipes/types/recipe.types";



export default function RecipesScreen() {
  const [recipes] = useState(MOCK_RECIPES);
  const [favorites] = useState(MOCK_FAVORITES);
  const [groups] = useState(MOCK_GROUPS);

  const router = useRouter();



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

  const onViewByChange = (option?: Option) => {
    if(option?.value) setView(option.value as ViewBy);
  }

  // TODO: add vs edit
  // const handleOpenForm = () => {
  //   router.push('/form');
  // }

  // const contextActions: ContextAction[] = [
  //   {
  //     icon: Plus,
  //     label: 'add',
  //     onPress: () => handleOpenForm(),
  //   },
  //   {
  //     icon: FilterXIcon,
  //     label: 'Filter',
  //     onPress: () => console.log('Filter recipes'),
  //   },
  //   {
  //     icon: SortAsc,
  //     label: 'Sort',
  //     onPress: () => console.log('Sort recipes'),
  //   },
  // ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="auto"/>

      {/*todo: fix count*/}
      <RecipesHeader
        title="My Recipes"
        count={recipes.length}
        showSelect={true}
        viewBy={view}
        onViewByChange={onViewByChange}
      />

      { view === 'all' && <AllRecipesView recipes={recipes} /> }
      { view === 'favorites' && <FavoriteRecipesView recipes={recipes} favorites={favorites} /> }
      { view === 'groups' && <RecipesByGroupsView recipes={recipes} groups={groups} /> }
      { view === 'tags' && <RecipesByTagsView recipes={recipes} /> }

      {/*<ContextFAB actions={contextActions} />*/}
    </SafeAreaView>
  );
}
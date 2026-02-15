import {Card, CardContent} from "@/components/ui/card";
import {Recipe} from "@/features/recipes/types/recipe.types";
import {Pressable, View} from "react-native";
import {Image} from 'expo-image';
import {Text} from "@/components/ui/text";
import {Badge} from "@/components/ui/badge";
import {wrap} from "node:module";
import {Href, Link} from "expo-router";

type RecipeCardProps = {
  recipe: Recipe;
  href?: Href;
  onPress?: (recipe: Recipe) => void;
}

export default function RecipeCard({
 recipe,
 href,
 onPress,
}: RecipeCardProps) {

  const card = (
    <Card className="overflow-hidden p-0 gap-0">
      {/* todo: add aspect ratio? */}
      <Image
        source={{uri: recipe.imageUrl}}
        style={{width: '100%', height: 190, borderRadius: 4}}
        contentFit="cover"
      />
      <CardContent className="p-3 text-wrap">
        <Text>{recipe.name}</Text>
        {/* todo: add acordion? */}
        {/* todo: add tooltip? */}
        <View className="flex-row gap-1" style={{'flexWrap': 'wrap'}}>
          {recipe.tags.map((tag => (
            <Badge key={tag}>
              <Text className="text-xs">{tag}</Text>
            </Badge>
          )))}</View>
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} asChild push>
        <Pressable onPress={() => onPress?.(recipe)}>
          {card}
        </Pressable>
      </Link>
    )
  }

  return (
    <Pressable onPress={() => onPress?.(recipe)}>
      {card}
    </Pressable>
  );
}
import {Href} from "expo-router";
import ImageCard from "@/features/recipes/components/image-card";
import {View} from "react-native";
import {Text} from "@/components/ui/text";

export type RecipeGroupCardProps = {
  group: string;
  count: number;
  images: string[];
}

export default function RecipeGroupCard({group, count, images}: RecipeGroupCardProps) {
  const href: Href = `/recipes/groups/${group}`;

  return (
    <ImageCard
      images={images}
      href={href}
      cardContent={
        <View>
          <Text className="font-semibold text-lg">{group}</Text>
          <Text className="text-sm text-muted-foreground">{count} {count === 1 ? 'recipe' : 'recipes'}</Text>
        </View>
      }
    ></ImageCard>
  );
}
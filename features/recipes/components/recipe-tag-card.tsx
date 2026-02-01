import {Link} from 'expo-router';
import {Pressable} from 'react-native';
import {Card, CardContent} from '@/components/ui/card';
import {Image} from "expo-image";
import {useColorScheme} from '@/hooks/use-color-scheme';
import {ThemedView} from "@/components/themed-view";
import {ThemedText} from "@/components/themed-text";

type RecipeTagCardProps = {
  tag: string;
  count: number;
  images: string[];
};

export function RecipeTagCard({tag, count, images}: RecipeTagCardProps) {
  const colorScheme = useColorScheme();
  const borderColor = colorScheme === "dark" ? "black" : "white";

  return (
    <Link href={`/recipes/tags/${tag}`} asChild>
      <Pressable className="active:scale-95 rounded-sm">
        <Card className="overflow-hidden p-0 gap-0">

          <ThemedView className="flex-row w-full">
            {/* column 1*/}
            <ThemedView style={{flex: 2}}>
              <Image
                source={{uri: images.length >= 1 ? images[0] : ""}}
                style={{height: 150, borderRadius: 0, borderRightWidth: 2, borderColor: borderColor}}
                contentFit="cover"
              />
            </ThemedView>
            {/* column 2*/}
            <ThemedView className="flex-1">
              <ThemedView className="flex-col">
                <ThemedView className="">
                  <Image
                    source={{uri: images.length >= 2 ? images[1] : ""}}
                    style={{height: 90, borderRadius: 0, borderBottomWidth: 2}}
                    contentFit="cover"
                  />
                </ThemedView>
                <ThemedView className="">
                  <Image
                    source={{uri: images.length >= 3 ? images[2] : ""}}
                    style={{height: 60, borderRadius: 0}}
                    contentFit="cover"
                  />
                </ThemedView>
              </ThemedView>
            </ThemedView>
          </ThemedView>
          <CardContent className="p-3 text-wrap">
            <ThemedText className="text-base font-medium">{tag}</ThemedText>
            <ThemedText className="text-sm text-muted-foreground">
              {count} {count === 1 ? 'recipe' : 'recipes'}
            </ThemedText>
          </CardContent>
        </Card>
      </Pressable>
    </Link>
  );
}
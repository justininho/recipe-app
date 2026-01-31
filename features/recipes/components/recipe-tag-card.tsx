import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';

type RecipeTagCardProps = {
  tag: string;
  count: number;
};

export function RecipeTagCard({ tag, count }: RecipeTagCardProps) {
  return (
    <Link href={`/recipes/tags/${tag}`} asChild>
      <Pressable className="active:scale-95">
        <Card>
          <CardContent className="flex-row items-center justify-between p-4">
            <Text className="text-base font-medium">{tag}</Text>
            <Text className="text-sm text-muted-foreground">
              {count} {count === 1 ? 'recipe' : 'recipes'}
            </Text>
          </CardContent>
        </Card>
      </Pressable>
    </Link>
  );
}
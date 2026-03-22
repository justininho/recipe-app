import React, { FC } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { BookOpen, ChefHat } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { Ingredient } from '@/features/recipes/types/recipe.types';

type IngredientItemProps = {
  ingredient: Ingredient;
  onPress?: (ingredient: Ingredient) => void;
  onDelete?: (ingredient: Ingredient) => void;
};

export const IngredientItem: FC<IngredientItemProps> = ({
  ingredient,
  onPress,
  onDelete,
}) => {
  function handleLongPress() {
    if (!onDelete) return;
    Alert.alert(
      'Delete Ingredient',
      `Are you sure you want to delete "${ingredient.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDelete(ingredient) },
      ]
    );
  }

  const hasAmount = ingredient.amount != null && ingredient.amount > 0;
  const amountLabel = hasAmount
    ? `${ingredient.amount}${ingredient.unit ? ` ${ingredient.unit}` : ''}`
    : ingredient.unit || null;

  return (
    <TouchableOpacity
      onPress={() => onPress?.(ingredient)}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
      className="flex-row items-center gap-3 p-3 mb-2 rounded-xl border border-border bg-card"
    >
      {/* Ingredient name + prep note */}
      <View className="flex-1 gap-0.5">
        <Text className="text-sm font-medium text-foreground" numberOfLines={1}>
          {ingredient.name}
        </Text>

        <View className="flex-row items-center gap-3 flex-wrap">
          {ingredient.prepNote ? (
            <View className="flex-row items-center gap-1">
              <ChefHat size={12} className="text-muted-foreground" />
              <Text className="text-xs text-muted-foreground capitalize">
                {ingredient.prepNote}
              </Text>
            </View>
          ) : null}

          {ingredient.note ? (
            <View className="flex-row items-center gap-1">
              <BookOpen size={12} className="text-muted-foreground" />
              <Text className="text-xs text-muted-foreground" numberOfLines={1}>
                {ingredient.note}
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      {/* Amount + unit */}
      {amountLabel ? (
        <Text className="text-sm text-muted-foreground flex-shrink-0">{amountLabel}</Text>
      ) : null}
    </TouchableOpacity>
  );
};



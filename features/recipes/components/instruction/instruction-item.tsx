import React, {FC, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ChefHat, ChevronsUpDown, Clock, Trash2} from 'lucide-react-native';
import {Text} from '@/components/ui/text';
import {Instruction} from '@/features/recipes/types/recipe.types';
import { Alert } from 'react-native';

type InstructionItemProps = {
  instruction: Instruction;
  index: number;
  onPress: (instruction: Instruction) => void;
  drag: () => void;
  isActive: boolean;
};

export const InstructionItem: FC<InstructionItemProps> = ({
                                                            instruction,
                                                            index,
                                                            onPress,
                                                            drag,
                                                            isActive,
                                                          }) => {
  
  const hasTimer = instruction.minutes || instruction.seconds;
  
  const activeStyle = isActive ? {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  } : {};
  
  const containerStyle = `border-border ${isActive ? 'bg-primary/10' : 'bg-card'}`;
  const stepNumberStyle = isActive ? 'text-muted-foreground' : '';
  const dragHandleOpacity = isActive ? 1 : 0.4;
  const dragHandleIconColor = isActive ? 'hsl(var(--primary))' : 'gray';
  const textStyle = isActive ? 'text-muted-foreground' : '';
  
  const [showDelete, setShowDelete] = useState(false);

// On the outer TouchableOpacity:
  
  return (
    <TouchableOpacity
      onLongPress={() => {
        Alert.alert(
          'Delete Step',
          'Are you sure you want to delete this step?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => console.log(instruction)},
          ]
        );
      }}
      style={activeStyle}
      onPress={() => onPress(instruction)}
      activeOpacity={0.7}
      className={`flex-row gap-3 items-center p-3 mb-2 rounded-xl border ${containerStyle}`}
    >
      <View className="w-7 h-7 rounded-full items-center justify-center shrink-0">
        <Text className={`text-xs font-bold ${stepNumberStyle}`}>
          {index + 1}
        </Text>
      </View>
      
      <View className="flex-1 gap-1">
        <Text className={`text-sm text-foreground leading-5 ${textStyle}`} numberOfLines={2}>
          {instruction.description}
        </Text>
        {(hasTimer || instruction.type) && (
          <View className="flex-row gap-3 mt-1">
            {hasTimer && (
              <View className="flex-row items-center gap-1">
                <Clock size={12} className="text-muted-foreground"/>
                <Text className="text-xs text-muted-foreground">
                  {instruction.minutes ? `${instruction.minutes}m` : ''}
                  {instruction.seconds ? ` ${instruction.seconds}s` : ''}
                </Text>
              </View>
            )}
            {instruction.type && (
              <View className="flex-row items-center gap-1">
                <ChefHat size={12} className="text-muted-foreground"/>
                <Text className="text-xs text-muted-foreground capitalize">{instruction.type}</Text>
              </View>
            )}
          </View>
        )}
      </View>
      
      {showDelete && (
        <TouchableOpacity onPress={() => console.log(instruction)} hitSlop={8}>
          <Trash2 size={16} color="#ef4444" />
        </TouchableOpacity>
      )}
      
      <TouchableOpacity
        onPressIn={drag}
        delayLongPress={100}
        hitSlop={8}
        style={{opacity: dragHandleOpacity}}
        className="py-2 px-1 rounded-md"
      >
        <ChevronsUpDown size={20} color={dragHandleIconColor}/>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
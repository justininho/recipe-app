// components/navigation/context-fab.tsx
import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { LucideIcon, MoreVertical } from 'lucide-react-native';
import { cn } from '@/lib/utils';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay
} from 'react-native-reanimated';

export type ContextAction = {
  icon: LucideIcon;
  label: string;
  onPress: () => void;
  variant?: 'default' | 'destructive';
};

type ContextFABProps = {
  actions: ContextAction[];
};

export function ContextFAB({ actions }: ContextFABProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (actions.length === 0) return null;

  return (
    <View className="absolute bottom-6 right-6 items-end">
      {/* Action Buttons */}
      {isExpanded && (
        <View className="mb-3 gap-3 items-end">
          {actions.map((action, index) => (
            <ActionButton
              key={index}
              action={action}
              index={index}
              onPress={() => {
                action.onPress();
                setIsExpanded(false);
              }}
            />
          ))}
        </View>
      )}

      {/* Main FAB */}
      <Pressable
        onPress={() => setIsExpanded(!isExpanded)}
        className="bg-primary rounded-full p-4 shadow-lg active:scale-95 transition-transform"
      >
        <MoreVertical size={24} color="white" />
      </Pressable>
    </View>
  );
}

function ActionButton({
                        action,
                        index,
                        onPress
                      }: {
  action: ContextAction;
  index: number;
  onPress: () => void;
}) {
  const Icon = action.icon;
  const isDestructive = action.variant === 'destructive';

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withDelay(
        index * 50,
        withTiming(1, { duration: 150 })
      ),
      transform: [
        {
          scale: withDelay(
            index * 50,
            withSpring(1, {
              damping: 15,
              stiffness: 150,
            })
          )
        },
        {
          translateY: withDelay(
            index * 50,
            withSpring(0, {
              damping: 15,
              stiffness: 150,
            })
          )
        }
      ],
    };
  }, []);

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={animatedStyle}
        className={cn(
          "rounded-full p-3 shadow-md active:scale-95 transition-transform",
          isDestructive ? "bg-destructive" : "bg-primary"
        )}
      >
        <Icon size={20} color="white" />
      </Animated.View>
    </Pressable>
  );
}
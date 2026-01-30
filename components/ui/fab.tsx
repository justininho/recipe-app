// components/ui/fab.tsx
import React from 'react';
import { Pressable } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { cn } from '@/lib/utils';

interface FABProps {
  icon: LucideIcon;
  onPress: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  className?: string;
}

export function FAB({ icon: Icon, onPress, position = 'bottom-right', className }: FABProps) {
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
  };

  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'absolute bg-primary rounded-full p-4 shadow-lg',
        positionClasses[position],
        className
      )}
    >
      <Icon size={24} color="white" />
    </Pressable>
  );
}
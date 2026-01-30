import React from 'react';
import { View, Pressable } from 'react-native';
import {useRouter, usePathname, Href} from 'expo-router';
import {Home, Plus, LucideIcon} from 'lucide-react-native';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

export type NavButton = {
  icon: LucideIcon;
  route: Href;
  label: string;
  matchPath: string;
}

export function FloatingNav() {
  const router = useRouter();
  const pathname = usePathname();

  const navButtons: NavButton[] = [
    { icon: Home, route: '/(tabs)/(recipes)', label: 'Recipes', matchPath: '/' },
    // { icon: Plus, route: '/(tabs)/(recipes)/form', label: 'Add', matchPath: '/form' },
    // { icon: Calendar, route: '/meal-plan', label: 'Meals', matchPath: '/meal-plan' },
    // { icon: ShoppingCart, route: '/grocery', label: 'Grocery', matchPath: '/grocery' },
  ];

  const navBarClasses = "absolute bottom-6 left-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg px-4 py-4 flex-row gap-2 items-center";
  const buttonBaseClasses = "px-2 py-2 rounded-lg flex items-center justify-center";
  const iconActiveColor = "black";
  const iconInactiveColor = "gray";

  return (
    <View className={navBarClasses}>
      {navButtons.map((button) => {
        const Icon = button.icon;
        const routePath = button.route.toString();
        const isActive = pathname === button.matchPath;

        return (
          <NavButton
            key={routePath}
            icon={Icon}
            isActive={isActive}
            onPress={() => router.push(button.route)}
            buttonBaseClasses={buttonBaseClasses}
            iconActiveColor={iconActiveColor}
            iconInactiveColor={iconInactiveColor}
          />
        );
      })}
    </View>
  );
}

function NavButton({
                     icon: Icon,
                     isActive,
                     onPress,
                     buttonBaseClasses,
                     iconActiveColor,
                     iconInactiveColor
                   }: {
  icon: LucideIcon;
  isActive: boolean;
  onPress: () => void;
  buttonBaseClasses: string;
  iconActiveColor: string;
  iconInactiveColor: string;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming('transparent', // primary color
        { duration: 200 }
      ),
      transform: [
        {
          scale: withSpring(isActive ? 1 : 0.95, {
            damping: 15,
            stiffness: 150,
          })
        }
      ],
    };
  });

  return (
    <Pressable onPress={onPress} className="active:scale-95">
      <Animated.View style={animatedStyle} className={buttonBaseClasses}>
        <Icon
          size={32}
          color={isActive ? iconActiveColor : iconInactiveColor}
        />
      </Animated.View>
    </Pressable>
  );
}
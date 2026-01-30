import {Stack} from 'expo-router';
import React from 'react';
import {View} from 'react-native';
import {TransitionPresets} from "@react-navigation/bottom-tabs";
import {TopNavigation} from "@/components/navigation/top-navigation";

export default function Layout() {
  return (
    <View className="flex-1">
      <TopNavigation/>
      <Stack
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.ShiftTransition,
        }}>
        <Stack.Screen name="recipes"/>
        <Stack.Screen name="meal-plan"/>
        <Stack.Screen name="grocery"/>
      </Stack>
      {/*<FloatingNav />*/}
    </View>
  );
}
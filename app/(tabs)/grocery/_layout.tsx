import {Stack} from "expo-router";
import React from "react";

export default function GroceryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Groceries',
        }}
      />
    </Stack>
  )
}
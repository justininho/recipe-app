import {Pressable, View} from "react-native";
import {Image} from "expo-image";
import {Card, CardContent} from "@/components/ui/card";
import { Link } from "expo-router";
import {useColorScheme} from "nativewind";
import {Href} from "expo-router/build/types";
import React from "react";

export type ImageCardProps = {
  images: string[];
  href?: Href;
  cardContent?: React.ReactNode;
}

export default function ImageCard({images, href, cardContent}: ImageCardProps) {
  const {colorScheme} = useColorScheme();
  const borderColor = colorScheme === "dark" ? "black" : "white";

  const card = (
    <Card className="overflow-hidden p-0 gap-0">
      <View className="flex-row w-full">
        {/* column 1*/}
        <View style={{flex: 2}}>
          <Image
            source={{uri: images.length >= 1 ? images[0] : ""}}
            style={{height: 150, borderRadius: 0, borderRightWidth: 2, borderColor, backgroundColor: 'lightgray'}}
            contentFit="cover"
          />
        </View>
        {/* column 2*/}
        <View className="flex-1">
          <View className="flex-col">
            <View className="">
              <Image
                source={{uri: images.length >= 3 ? images[2] : ""}}
                style={{
                  height: 60,
                  borderRadius: 0,
                  borderBottomWidth: 2,
                  borderColor,
                  backgroundColor: 'lightgray'
                }}
                contentFit="cover"
              />
            </View>
            <View className="">
              <Image
                source={{uri: images.length >= 2 ? images[1] : ""}}
                style={{height: 90, borderRadius: 0, backgroundColor: 'lightgray'}}
                contentFit="cover"
              />
            </View>
          </View>
        </View>
      </View>
      <CardContent className="p-3 text-wrap">
        {cardContent}
      </CardContent>
    </Card>
  )

  if(href) {
    return (
      <Link href={href} asChild push>
        <Pressable className="active:scale-95 rounded-sm">
          {card}
        </Pressable>
      </Link>
    )
  }

  return card;
}
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  SharedValue
} from 'react-native-reanimated';
import {FC, useEffect} from 'react';
import {View} from "react-native";

export type TextWaveProps = {
  text: string;
}

type AnimatedCharacterProps = {
  char: string;
  index: number;
  textLength: number;
  animationProgress: SharedValue<number>;
  isAnimating: SharedValue<boolean>;
}
export const TextWave: FC<TextWaveProps> = ({ text }) => {
  const animationProgress = useSharedValue(0);
  const isAnimating = useSharedValue(true);

  useEffect(() => {
    animationProgress.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.linear }),
      // todo: take in loop count input
      -1, // infinite
      false,
      (finished) => {
        if (finished) {
          isAnimating.value = false;
          animationProgress.value = 0;
        }
      }
    );
  });

  const characters = text.split('');

  return (
    <View style={{ flexDirection: 'row' }}>
      {characters.map((char, index) => (
        <AnimatedCharacter
          key={index}
          char={char}
          index={index}
          textLength={text.length}
          animationProgress={animationProgress}
          isAnimating={isAnimating}
        />
      ))}
    </View>
  );
}

const AnimatedCharacter: FC<AnimatedCharacterProps> =({ char, index, textLength, animationProgress, isAnimating }) => {
  const animatedStyle = useAnimatedStyle(() => {
    if (!isAnimating.value) {
      return {
        transform: [{ translateY: 0 }],
        opacity: 1
      };
    }

    const time = animationProgress.value;
    const speed = Math.PI * 4;
    const x = index;
    // One smooth wave across entire text
    const frequency = (Math.PI * 2) / (textLength * 2);
    const amplitude = 16; // height of wave
    const yOffset = amplitude * Math.sin(frequency * x + time * speed);

    // Shimmer follows wave: brightest at peak, dimmest at trough
    // Normalize yOffset from [-amplitude, amplitude] to [0, 1]
    const normalizedPosition = (yOffset + amplitude) / (amplitude * 2); // 0 to 1

    // Map to opacity range
    const minOpacity = 0.5;
    const maxOpacity = 0.95;
    const opacity = minOpacity + (maxOpacity - minOpacity) * normalizedPosition;
    // todo: take in color inputs
    const color = `rgba(0, 0, 0, ${0.3 + 0.7 * opacity})`;


    return {
      transform: [{ translateY: yOffset }],
      opacity,
      color,
    };
  });

  return (
    // todo take in font size input
    <Animated.Text style={[{ fontSize: 40 }, animatedStyle]}>
      {char}
    </Animated.Text>
  );
}
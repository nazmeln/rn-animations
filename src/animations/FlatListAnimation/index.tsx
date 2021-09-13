import MaskedView from '@react-native-community/masked-view';
import React, {useRef} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Rect} from 'react-native-svg';

import styles from './styles';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const {height, width} = Dimensions.get('screen');

const ITEM_WIDTH = width * 0.72;
const ITEM_HEIGHT = ITEM_WIDTH * 1.2;
const SPACING = 10;
const BACKDROP_HEIGHT = height * 0.6;
const SPACER_ITEM_WIDTH = (width - ITEM_WIDTH) / 2;

const BackDrop = ({photos, scrollX}) => {
  return (
    <View
      style={{
        position: 'absolute',
        width,
        height: BACKDROP_HEIGHT,
        backgroundColor: 'red',
      }}>
      <FlatList
        data={photos}
        keyExtractor={item => item.imagePath}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 2) * ITEM_WIDTH,
            (index - 1) * ITEM_WIDTH,
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width, 0],
          });

          if (!item.imagePath) {
            return null;
          }

          return (
            <MaskedView
              maskElement={
                <AnimatedSvg
                  width={width}
                  height={height}
                  viewBox={`0 0 ${width} ${height}`}
                  style={{transform: [{translateX}]}}>
                  <Rect
                    x="0"
                    y="0"
                    width={width}
                    height={height}
                    fill="white"
                  />
                </AnimatedSvg>
              }
              style={{
                position: 'absolute',
              }}>
              <Image
                source={item.imagePath}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                }}
                resizeMode="cover"
              />
            </MaskedView>
          );
        }}
      />
      <LinearGradient
        colors={['transparent', 'white']}
        style={{position: 'absolute', width, height: BACKDROP_HEIGHT}}
      />
    </View>
  );
};

export const FlatListAnimation = () => {
  const photos = [
    {key: 'left-spacer'},
    {
      imagePath: require('../../../assets/images/city.jpg'),
      description: 'Big City',
      color: 'orange',
    },
    {
      imagePath: require('../../../assets/images/love.jpg'),
      description: 'Love',
      color: 'white',
    },
    {
      imagePath: require('../../../assets/images/friends.jpg'),
      description: 'Friendship',
      color: 'blue',
    },
    {
      imagePath: require('../../../assets/images/gift.jpg'),
      description: 'Christmas',
      color: 'red',
    },
    {key: 'right-spacer'},
  ];

  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <BackDrop photos={photos} scrollX={scrollX} />
      <Animated.FlatList
        data={photos}
        keyExtractor={item => item.imagePath}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        snapToInterval={ITEM_WIDTH}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 2) * ITEM_WIDTH, // prev item
            (index - 1) * ITEM_WIDTH, // current item
            index * ITEM_WIDTH, // next item
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
          });

          if (!item.imagePath) {
            return (
              <View
                style={{
                  width: SPACER_ITEM_WIDTH,
                }}
              />
            );
          }

          return (
            <View style={{width: ITEM_WIDTH}}>
              <Animated.View
                style={{
                  padding: SPACING * 2,
                  marginHorizontal: SPACING,
                  alignItems: 'center',
                  // backgroundColor: 'green',
                  transform: [{translateY}],
                }}>
                <Image
                  source={item.imagePath}
                  style={{
                    height: ITEM_HEIGHT,
                    width: 250,
                    borderRadius: 14,
                  }}
                  resizeMode="cover"
                />
                <Text style={styles.imageDescription}>{item.description}</Text>
              </Animated.View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

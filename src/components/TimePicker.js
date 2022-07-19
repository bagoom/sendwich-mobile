import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
} from 'react-native';
import {debounce} from 'lodash';
import {
  getCenterPosition,
  getCenterPositionFromIndex,
  getIndexFromOffset,
  fillEmpty,
  asPickerFormat,
} from '../lib/time';
import {
  MERIDIEM_ITEMS,
  MINUTE_ITEMS,
  HOUR_ITEMS,
  BUTTON_HEIGHT,
  GAP,
} from '../lib/time-value';

const isPM = date => date.getHours() >= 12;

const TimePicker = ({value, onChange, width, buttonHeight, visibleCount}) => {
  if (visibleCount % 2 === 0) throw new Error('visibleCount must be odd');
  const dateString = value.toTimeString();
  const ITEMS = [
    {
      key: 'meridiem',
      items: MERIDIEM_ITEMS,
    },
    {
      key: 'hour',
      items: HOUR_ITEMS,
    },
    {
      key: 'minute',
      items: MINUTE_ITEMS,
    },
  ];

  const refs = React.useRef(
    Array.from({length: 3}).map(() => React.createRef()),
  );
  const animatedValues = React.useRef(
    Array.from({length: 3}).map(() => new Animated.Value(0)),
  );

  const getScrollProps = (index, key, items) => {
    const onScrollStop = debounce(
      offsetY => {
        const date = new Date(value.getTime());
        const itemIdx = getIndexFromOffset(offsetY);

        if (key === 'meridiem') {
          const currValueIsPM = isPM(date);
          const nextValueIsPM = MERIDIEM_ITEMS[itemIdx] === '오후';
          if (currValueIsPM && !nextValueIsPM) {
            date.setHours(date.getHours() - 12);
          }
          if (!currValueIsPM && nextValueIsPM) {
            date.setHours(date.getHours() + 12);
          }
        }
        if (key === 'hour') {
          const hour = Number(HOUR_ITEMS[itemIdx]);

          if (isPM(date)) {
            const isNoon = hour === 12;
            if (isNoon) {
              date.setHours(12);
            } else {
              date.setHours(hour + 12);
            }
          } else {
            const isMidnight = hour === 12;
            if (isMidnight) {
              date.setHours(0);
            } else {
              date.setHours(hour);
            }
          }
        }

        if (key === 'minute') {
          date.setMinutes(MINUTE_ITEMS[itemIdx]);
        }

        onChange(date);
      },
      0,
      {leading: false, trailing: true},
    );

    return {
      key,
      index,
      items,
      showsVerticalScrollIndicator: false,
      contentContainerStyle: styles.scrollView,
      ref: refs.current[index],
      onScrollBeginDrag: () => {
        onScrollStop.cancel();
      },
      onScrollEndDrag: e => {
        onScrollStop.cancel();
        onScrollStop(e.nativeEvent.contentOffset.y);
      },
      onMomentumScrollBegin: () => {
        onScrollStop.cancel();
      },
      onMomentumScrollEnd: e => {
        onScrollStop.cancel();
        onScrollStop(e.nativeEvent.contentOffset.y);
      },
      getOnPress: item => () => {
        const targetIdx = items.indexOf(item);
        if (targetIdx === -1) return;

        const CENTER_POSITION = getCenterPositionFromIndex(targetIdx);
        onScrollStop(CENTER_POSITION);
        onScrollStop.flush();
      },
      animatedValue: animatedValues.current[index],
      // scrollEventThrottle: 16,
    };
  };

  const scrollProps = React.useMemo(() => {
    return ITEMS.map(({key, items}, index) =>
      getScrollProps(index, key, items),
    );
  }, [dateString]);

  React.useEffect(() => {
    const meridiem = isPM(value) ? '오후' : '오전';
    const hour = String(
      isPM(value) ? value.getHours() - 12 : value.getHours(),
    ).padStart(2, '0');
    const minute = String(value.getMinutes()).padStart(2, '0');

    const matchIndex = [
      MERIDIEM_ITEMS.indexOf(meridiem),
      HOUR_ITEMS.indexOf(hour),
      MINUTE_ITEMS.indexOf(minute),
    ];

    scrollProps.forEach((props, index) => {
      props.ref.current.scrollTo({
        y: getCenterPositionFromIndex(matchIndex[index]),
      });
    });
  }, [dateString]);

  return (
    <View
      style={[styles.container, {width, height: visibleCount * buttonHeight}]}>
      {scrollProps.map((props, scrollViewIndex) => {
        const renderItems = fillEmpty(visibleCount, props.items);

        return (
          <ScrollView
            {...props}
            snapToInterval={BUTTON_HEIGHT}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: props.animatedValue}}}],
              {useNativeDriver: false},
            )}>
            {renderItems.map((item, index) => {
              const position = getCenterPositionFromIndex(
                props.items.indexOf(item),
              );

              const opacity = props.animatedValue.interpolate({
                inputRange: [
                  position - BUTTON_HEIGHT,
                  position,
                  position + BUTTON_HEIGHT,
                ],
                outputRange: [0.2, 1, 0.2],
                extrapolate: 'clamp',
              });

              return (
                <Button
                  key={index}
                  style={{opacity}}
                  label={item}
                  onPress={props.getOnPress(item)}
                />
              );
            })}
          </ScrollView>
        );
      })}
      <OverlayView />
    </View>
  );
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = ({style, label, onPress}) => {
  return (
    <AnimatedPressable style={style} onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </View>
    </AnimatedPressable>
  );
};

const OverlayView = () => {
  return (
    <View
      pointerEvents={'none'}
      style={[StyleSheet.absoluteFill, styles.overlay]}>
      <View style={styles.overlayVisibleView}>
        <View style={styles.overlayVisibleViewInner} />
        <GapView />
        <View style={styles.overlayVisibleViewInner} />
        <GapView>
          <Text style={{position: 'absolute', textAlign: 'center'}}>{':'}</Text>
        </GapView>
        <View style={styles.overlayVisibleViewInner} />
      </View>
    </View>
  );
};

const GapView = ({children}) => {
  return <View style={styles.gap}>{children}</View>;
};

const styles = StyleSheet.create({
  gap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: GAP,
  },
  container: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  scrollView: {
    left: 0,
    right: 0,
    position: 'absolute',
  },
  button: {
    height: BUTTON_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  buttonLabel: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 18,
    letterSpacing: -0.5,
    color: '#000',
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayVisibleView: {
    paddingHorizontal: 9,
    width: '100%',
    height: BUTTON_HEIGHT,
    flexDirection: 'row',
  },
  overlayVisibleViewInner: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f3f3f3',
  },
});

export default TimePicker;

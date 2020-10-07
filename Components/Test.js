// Components/Test.js

import React from 'react'
import { StyleSheet, View , Animated, Easing, PanResponder, Dimensions} from 'react-native'

class Test extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      topPosition: new Animated.Value(0),
      leftPosition: new Animated.Value(0),
      rightPosition: new Animated.Value(0),
      bottomPosition: new Animated.Value(0),
      topPositionPanResponder:0,
      leftPositionPanResponder:0,
      height: new Animated.Value(40),
      width: new Animated.Value(40)
    }


  var {height, width} = Dimensions.get('window');
    this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
            let touches = evt.nativeEvent.touches;
            if (touches.length == 1) {
                this.setState({
                  topPositionPanResponder: touches[0].pageY - height/2,
                  leftPositionPanResponder: touches[0].pageX - width/2
                })
            }
        }
    })
  }
componentDidMount(){
  Animated.sequence([
        Animated.spring(
          this.state.topPosition,
          {
            toValue: 100,
            tension: 8,
            friction: 3
          }
        ),
        Animated.timing(
          this.state.topPosition,
          {
            toValue: 0,
            duration: 3000,
            easing: Easing.elastic(20)
          }
        )
      ]).start()
  Animated.decay(
    this.state.rightPosition,
    {
      velocity: 2,
      deceleration: 0.99

    }
  ).start(),

  Animated.parallel([
       Animated.timing(
         this.state.height,
         {
           toValue: 80,

         }
       ),
       Animated.timing(
         this.state.width,
         {
           toValue: 80,

         }
       )
     ]).start()
}
  render() {
    return (
      <View style={styles.main_container}>
      <Animated.View style={[styles.animation_view, { top: this.state.topPosition }]}>
       </Animated.View>
      <Animated.View style={[styles.animation_view2, { left: this.state.leftPosition }]}>
       </Animated.View>
      <Animated.View style={[styles.animation_view3, { height : this.state.height, width: this.state.width  }]}>
       </Animated.View>
       <View
          {...this.panResponder.panHandlers}
          style={[styles.animation_view4, { top: this.state.topPositionPanResponder, left: this.state.leftPositionPanResponder }]}>
        </View>
      </View>
    )
  }
}





const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  animation_view: {
    backgroundColor: 'red',
    width: 100,
    height: 100
  },
  animation_view2: {
    backgroundColor: 'blue',
    width: 100,
    height: 100
  },
  animation_view3: {
    backgroundColor: 'green',
    width: null,
    height: null
  },
  animation_view4: {
    backgroundColor: 'yellow',
    width: 100,
    height: 100
  }
})

export default Test

import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import {getImageFromApi} from '../API/TMDBApi'
import FadeIn from '../Animations/FadeIn'



class FilmItem extends React.Component {

// constructor(props){
//   super(props)
//   this.state={
//     positionLeft: new Animated.Value(Dimensions.get('window').width)
//   }
// }

  _displayFavoriteImage() {
    if (this.props.isFilmFavorite) {
      // Si la props isFilmFavorite vaut true, on affiche le 🖤
      return (
        <Image
          style={styles.favorite_image}
          source={require('../Images/ic_favorite.png')}
        />
      )
    }
  }

  // componentDidMount(){
  //   Animated.spring(
  //     this.state.positionLeft,
  //     {
  //       toValue:0,
  //       tension:4,
  //       friction: 4
  //     }
  //   ).start()
  // }

  render(){
    const { film, displayDetailForFilm } = this.props
    return(
      // <Animated.View style={{left: this.state.positionLeft}}>
      <FadeIn>
      <TouchableOpacity style={styles.main_container}
                        onPress={() => displayDetailForFilm(film.id)}>
        <Image style = {styles.image}
                source ={{uri: getImageFromApi(film.poster_path)}}/>
        <View style={styles.content}>
      <View style={styles.header}>
      {this._displayFavoriteImage()}
        <Text style={styles.title_text}> {film.title}</Text>
        <Text style={styles.vote}>{film.vote_average}</Text>
        </View>
        <View style={styles.decription}>
          <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
        </View>
        <View style={styles.date}>
          <Text style={styles.date_text}>{film.release_date}</Text>
        </View>
        </View>
        </TouchableOpacity>
        </FadeIn>
        // </Animated.View>
    )
  }
}
const styles = StyleSheet.create({
  main_container:{
    height :190,
    flexDirection : 'row',
  },
  content :{
    flex : 1,
    margin: 5,
  },
  image :{
    width :120,
    height :180,
    margin :5,
  },
  header : {
    flex:3,
    flexDirection : 'row'
  },
  description :{
    flex :7,
  },
  date : {
    flex :1,
  },
  title_text : {
    fontWeight: 'bold',
   fontSize: 20,
   flex: 1,
   flexWrap: 'wrap',
   paddingRight: 5
 },
  vote : {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_text: {
  textAlign: 'right',
  margin : 5,
  fontSize: 14
},
favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5
  }
})

export default FilmItem

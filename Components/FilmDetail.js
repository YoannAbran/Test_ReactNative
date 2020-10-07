import React from 'react'
import {StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Share, Platform,Button} from 'react-native'
import { getFilmDetailFromApi, getImageFromApi} from '../API/TMDBApi'
import {connect} from 'react-redux'
import EnlargeShrink from '../Animations/EnlargeShrink'

class FilmDetail extends React.Component {

  static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state
      // On accède à la fonction shareFilm et au film via les paramètres qu'on a ajouté à la navigation
      if (params.film != undefined && Platform.OS === 'ios') {
        return {
            // On a besoin d'afficher une image, il faut donc passe par une Touchable une fois de plus
            headerRight: ()=> <TouchableOpacity
                            style={styles.share_touchable_headerrightbutton}
                            onPress={() => params.shareFilm()}>
                            <Image
                              style={styles.share_image}
                              source={require('../Images/ic_share.png')} />
                          </TouchableOpacity>
        }
      }
  }

  constructor(props) {
    super(props)
      this._shareFilm = this._shareFilm.bind(this),
      this._toggleFavorite = this._toggleFavorite.bind(this),
      this.state = {
        film : undefined,
        isLoading : false
      }

  }

  _displayLoading(){
    if(this.state.isLoading){
      return(
        <View style = {styles.loading_container}>
          <ActivityIndicator size='large'/>
          </View>
      )
    }
  }

_displayFavoriteImage(){
  var sourceImage = require('../Images/ic_favorite_border.png')
  var shouldEnlarge = false
  if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1){
    sourceImage = require('../Images/ic_favorite.png')
    shouldEnlarge = true
  }
  return (
    <EnlargeShrink
        shouldEnlarge={shouldEnlarge}>
        <Image
          style={styles.favorite_image}
          source={sourceImage}
        />
      </EnlargeShrink>
    )
  }

  _updateNavigationParams(){
    this.props.navigation.setParams({
      shareFilm: this._shareFilm,
      film: this.state.film
    })
  }

  componentDidMount() {
    const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
    if (favoriteFilmIndex !== -1) { // Film déjà dans nos favoris, on a déjà son détail
      // Pas besoin d'appeler l'API ici, on ajoute le détail stocké dans notre state global au state de notre component
      this.setState({
        film: this.props.favoritesFilm[favoriteFilmIndex]
      }, ()=>{this._updateNavigationParams() })
      return
    }
    // Le film n'est pas dans nos favoris, on n'a pas son détail
    // On appelle l'API pour récupérer son détail
    this.setState({ isLoading: true })
   getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
     this.setState({
       film: data,
       isLoading: false
     }, () => { this._updateNavigationParams() })
   })
 }



  _toggleFavorite() {
    const action = { type : "TOGGLE_FAVORITE", value :this.state.film}
    this.props.dispatch(action)
  }

  _displayFilm() {
    const {film} = this.state
    if (film != undefined){
      return(
        <ScrollView style={styles.scrollview_container}>
        <Image style = {styles.image}
                source ={{uri: getImageFromApi( film.backdrop_path)}}/>
          <Text style = {styles.title}>{film.title}</Text>
          <TouchableOpacity
          style = {styles.favorite_container}
          onPress ={()=> this._toggleFavorite()}>
          {this._displayFavoriteImage()}
          </TouchableOpacity>
          <Text style = {styles.overview}>{film.overview}</Text>
          <Text style = {styles.info}>Sorti le {film.release_date}</Text>
          <Text style = {styles.info}>Note : {film.vote_average}</Text>
          <Text style = {styles.info}>Budget : {film.budget}</Text>
          <Text style = {styles.info}>Genres : {film.genres.map(function(genre){return genre.name}).join("/")}</Text>
          <Text style = {styles.info}>Companie(s) : {film.production_companies.map(function(company){return company.name}).join("/")}</Text>
          </ScrollView>
      )
    }
  }

  _shareFilm(){
    const {film} = this.state
    Share.share({title : film.title, message: film.overview})
  }

  _displayFloatingActionButton(){
      const {film} = this.state
      if(film != undefined && Platform.OS === 'android'){
        return(
          <TouchableOpacity
            style={styles.share_touchable_floatingactionbutton}
            onPress={()=> this._shareFilm()}>
            <Image
              style={styles.share_image}
              source={require('../Images/ic_share.png')}/>
          </TouchableOpacity>
        )
      }
  }

  render(){

    return(
      <View style = {styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
        {this._displayFloatingActionButton()}
      </View>

    )
  }
}

const styles = StyleSheet.create({
  main_container:{
    flex:1,
  },
  loading_container:{
    position:'absolute',
    left :0,
    right : 0,
    top : 0,
    bottom : 0,
    alignItems :'center',
    justifyContent : 'center'
  },
  scrollview_container :{
    flex: 1
  },
  favorite_container :{
    alignItems :"center"
  },
  favorite_image:{
    flex: 1,
    width :null,
    height:null
  },
  image:{
    height:250,
    width: 'auto'
  },
  title:{

    textAlign: 'center',
    fontSize : 25,
    fontWeight:'bold',
    paddingTop : 15,
    paddingBottom: 15
  },
  overview:{
    padding : 10,
  },
  info :{
    padding : 5,
    fontWeight : 'bold',
  },
  share_touchable_floatingactionbutton: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center'
  },
  share_image: {
    width: 30,
    height: 30
  },
  share_touchable_headerrightbutton: {
    marginRight: 8
  }
})

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmDetail)

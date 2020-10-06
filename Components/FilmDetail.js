import React from 'react'
import {StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Button} from 'react-native'
import { getFilmDetailFromApi, getImageFromApi} from '../API/TMDBApi'
import {connect} from 'react-redux'

class FilmDetail extends React.Component {

  constructor(props) {
    super(props)
      this.state = {
        film : undefined,
        isLoading : true
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

  componentDidMount(){
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
      this.setState({
        film:data,
        isLoading:false
      })
    })
  }
  componentDidUpdate(){
    console.log("componentDidUpdate")
    console.log(this.props.favoritesFilm)
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
          <Button title="Favoris" onPress ={()=> this._toggleFavorite()}/>
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

  render(){
    console.log(this.props)
    return(
      <View style = {styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
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

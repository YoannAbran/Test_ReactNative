import 'react-native-gesture-handler';
import {createAppContainer } from 'react-navigation'
import { createStackNavigator} from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'
import { StyleSheet, Image } from 'react-native'
import React from 'react'
import Test from '../Components/Test'

const SearchStackNavigatior = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions:{
      title:'Rechercher'
    }
  },

  FilmDetail: {
    screen: FilmDetail
  }
})
const FavoritesStackNavigatior = createStackNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions:{
      title:'Favoris'
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
})

const MovieTabNavigator = createBottomTabNavigator({
  Search : {
    screen : SearchStackNavigatior,
    navigationOptions: {
      tabBarIcon:()=>{
        return <Image
        source={require('../Images/ic_search.png')}
        style={styles.icon}/>
      }
    }
  },
  Favorites : {
    screen: FavoritesStackNavigatior,
    navigationOptions: {
      tabBarIcon:()=>{
        return <Image
        source={require('../Images/ic_favorite.png')}
        style={styles.icon}/>
      }
    }
  },
  Test: {
    screen : Test
  }
},
  {
    tabBarOptions: {
      activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
      inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
      showLabel: false, // On masque les titres
      showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
    }
  }
)

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})


export default createAppContainer(MovieTabNavigator)

// Components/HelloWorld.ios.js

import React from 'react'
import { Text ,StyleSheet, SafeAreaView} from 'react-native'

class HelloWorld extends React.Component {

  render() {
    return (
      <SafeAreaView style={styles.main_container}>// permet de créer un 'cadre' pour que la view ne sois pas sous certain élément comme l'indicateur home sur iphonex (sur android le SafeAreaView est ignoré) 
      <Text>Hello iOS</Text>
    )
    </SafeAreaView>
  }
}

export default HelloWorld

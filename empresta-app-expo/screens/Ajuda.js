/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native'

import Colors from '../Colors'
import Header from '../components/Header'
import React from 'react'

const Ajuda = (props) => {
  React.useEffect(() => {
    props.navigation.goBack()
    Linking.openURL(`whatsapp://send?text=Olá&phone=${Constants.manifest.extra.WHATSAPP_NUMBER}`)
  }, [])

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header onPress={() => props.navigation.openDrawer()} label='Ajuda' />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Ajuda

const styles = StyleSheet.create({
  safeAreaView: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    alignItems: 'center',
  },
})
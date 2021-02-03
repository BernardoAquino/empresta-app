/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as Utils from '../Utils'

import {
  Avatar,
  Headline,
  Paragraph,
} from 'react-native-paper'
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

import Colors from '../Colors'
import Header from '../components/Header'
import React from 'react'

const Perfil = (props) => {
  const {
    DataNascimento: dataNascimento,
    CPF: cpf,
    Nome: nome,
    Email: email,
  } = props.usuario
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header onPress={() => props.navigation.openDrawer()} label='Perfil' />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={{ backgroundColor: Colors.gray, width: '100%', height: 140 }} />
        <Avatar.Icon icon='account' size={120} style={{ bottom: 60, position: 'relative', zIndex: 99, marginBottom: -50 }} />
        <Headline style={{ fontWeight: '700', color: Colors.blue, fontSize: 32, paddingVertical: 16 }}>{nome}</Headline>
        <DisplayLabel label='CPF' value={cpf} />
        <DisplayLabel label='Data de Nascimento' value={Utils.formataData(dataNascimento)} />
        <DisplayLabel label='Email' value={email} fontSize={16} />
      </ScrollView>
    </SafeAreaView>
  )
}

const DisplayLabel = ({ label, value, fontSize = 26 }) => {
  return (
    <View style={{ width: '100%', alignItems: 'center', paddingVertical: 20 }} >
      <Paragraph style={{ color: Colors.dark, fontSize: 20 }}>{label}</Paragraph>
      <Headline style={{ fontWeight: '700', color: Colors.blue, fontSize }}>{value}</Headline>
    </View>
  )
}

export default Perfil

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
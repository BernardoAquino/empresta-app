/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
  Button,
  Text,
} from 'react-native-paper'
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { Masked, Unmasked } from '../components/CustomText'

import Colors from '../Colors'
import Empresta from '../assets/empresta.png'
import React from 'react'
import StatusBar from '../components/StatusBar'

const RecuperarSenha = ({ navigation }) => {
  const [email, setEmail] = React.useState('email@email.com')
  const [loading, setLoading] = React.useState(false)

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
        <Image source={Empresta} style={styles.logo} resizeMode='contain' />
        <InputBox label='Email' placeholder='email@email.com' value={email} onChangeText={setEmail} keyboardType='numeric' masked />
        <Button
          mode='contained'
          labelStyle={{ color: Colors.white }}
          style={styles.button}
          loading={loading}
          onPress={() => { }}>RECUPERAR</Button>
        <Button onPress={() => navigation.goBack()} style={styles.button}>VOLTAR</Button>
      </ScrollView>
    </SafeAreaView>
  )
}

const InputBox = ({ label, placeholder, value, onChangeText, secureTextEntry = false, masked = false, keyboardType }) => {
  return (
    <View style={{ width: '100%', alignItems: 'center', marginVertical: 20 }}>
      <Text style={{ color: Colors.blue, fontWeight: '700' }}>{label}</Text>
      {masked ?
        <Masked
          type='cpf'
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          style={styles.textInput}
          secureTextEntry={secureTextEntry}
        />
        :
        <Unmasked
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          style={styles.textInput}
          secureTextEntry={secureTextEntry}
        />
      }
    </View >
  )
}

export default RecuperarSenha

const styles = StyleSheet.create({
  safeAreaView: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: '100%',
  },
  textInput: {
    backgroundColor: Colors.gray,
    borderRadius: 40,
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 26,
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    alignItems: 'center',
  },
  button: {
    marginVertical: 6,
    padding: 10,
    width: '80%',
  },
})
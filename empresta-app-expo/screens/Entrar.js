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
import Empresta from '../assets/empresta2.png'
import React from 'react'
import StatusBar from '../components/StatusBar'

const Entrar = ({ login, getPropostas, navigation }) => {
  const [cpf, setCpf] = React.useState('076.892.240-23')
  const [senha, setSenha] = React.useState('123')
  const [loading, setLoading] = React.useState(false)

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
        <Image source={Empresta} style={styles.logo} resizeMode='contain' />
        <InputBox label='CPF' placeholder='000.000.000-00' value={cpf} onChangeText={setCpf} keyboardType='numeric' masked />
        <InputBox label='SENHA' placeholder='********' value={senha} onChangeText={setSenha} secureTextEntry />
        <Button
          mode='contained'
          labelStyle={{ color: Colors.white }}
          style={styles.button}
          loading={loading}
          onPress={() => {
            return new Promise((async (resolve, reject) => {
              setLoading(true)
              const res = await login({
                cpf,
                senha,
              })
                .catch(() => reject(false))
              await getPropostas(res)
                .catch(() => reject(false))
              setLoading(false)
              resolve(true)
            }))
              .catch(console.log)
              .finally(() => setLoading(false))
          }}>ENTRAR</Button>
        <Button style={styles.button}
          onPress={() => { }}>CADASTRAR</Button>
        <Button style={styles.button}
          onPress={() => navigation.navigate('RecuperarSenha')}>ESQUECI MINHA SENHA</Button>
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

export default Entrar

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
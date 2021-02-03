/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
  Button,
  Paragraph,
} from 'react-native-paper'
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

import Banner from '../assets/banner-emprestimo.jpg'
import Colors from '../Colors'
import Empresta from '../assets/empresta2.png'
import React from 'react'
import StatusBar from '../components/StatusBar'

const Informacoes = (props) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <StatusBar backgroundColor={Colors.gray} barStyle='dark-content' />
        <ImageBackground source={Banner} style={styles.banner}>
          <Image source={Empresta} style={styles.logo} resizeMode='contain' />
        </ImageBackground>
        <View style={{ backgroundColor: Colors.gray, width: '100%', paddingVertical: 20, paddingHorizontal: 20 }}>
          <Paragraph style={styles.paragraph}>
            Seja bem vindo(a) {props.usuario.Nome}, ao aplicativo da Empresta.
          </Paragraph>
          <Paragraph style={styles.paragraph}>
            Aqui você pode consultar seus dados de seus empréstimos de maneira rápida, prática e segura.
          </Paragraph>
        </View>
        <View style={{ width: '100%', paddingVertical: 15, paddingHorizontal: 20, backgroundColor: Colors.white }}>
          <Paragraph style={styles.paragraph2}>
            Buscamos as opções de crédito com as menores taxas de juros, para você sair do sufoco sem se enrolar em dívidas.
          </Paragraph>
          <Paragraph style={styles.paragraph2}>
            Na Empresta você conta com uma variedade de bancos para escolher o melhor, e com segurança.
          </Paragraph>
        </View>
        <View style={{ width: '100%', backgroundColor: Colors.white, alignItems: 'center' }}>
          <Button
            mode='contained'
            labelStyle={{ color: Colors.white }}
            style={styles.button}
            onPress={() => props.navigation.jumpTo('Emprestimos')}>IR PARA MEUS EMPRÉSTIMOS</Button>
        </View>
        <View style={{ backgroundColor: Colors.blue, width: '100%', paddingVertical: 20, paddingHorizontal: 20, flexDirection: 'row-reverse' }}>
          <Button
            uppercase={false}
            color={Colors.gray}
            onPress={() => props.navigation.jumpTo('Ajuda')}>Precisa de ajuda?</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Informacoes

const styles = StyleSheet.create({
  safeAreaView: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.blue,
    alignItems: 'center',
  },
  banner: {
    height: 180,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  logo: {
    height: '100%',
    width: 180,
  },
  textInput: {
    backgroundColor: Colors.gray,
    borderRadius: 40,
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    alignItems: 'center',
  },
  button: {
    marginBottom: 20,
    padding: 10,
    width: '80%',
  },
  paragraph: {
    paddingVertical: 10,
    fontSize: 18,
  },
  paragraph2: {
    paddingVertical: 10,
    fontSize: 18,
    textAlign: 'left',
    color: Colors.dark,
  },
})
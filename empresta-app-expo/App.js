import 'react-native-gesture-handler'

import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import {
  Platform,
  Alert as _Alert,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import Api from './Api'
import Colors from './Colors'
import Constants from 'expo-constants'
import Drawer from './navigation/Drawer'
import Entrar from './screens/Entrar'
import { NavigationContainer } from '@react-navigation/native'
import RecuperarSenha from './screens/RecuperarSenha'
import { createStackNavigator } from '@react-navigation/stack'

const { log } = console

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    accent: Colors.secondary,
  },
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

const { Navigator: Stack, Screen } = createStackNavigator()

const Alert = (msg, title, options) => _Alert.alert(title || 'Atenção', msg, options || [{ text: 'Ok' }])

const App = () => {
  const [logado, setLogado] = React.useState(false)

  const [usuario, setUsuario] = React.useState({})
  const [propostas, setPropostas] = React.useState([])

  const [token, setToken] = React.useState('')

  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  const login = async data => {
    data.expo_push_token = expoPushToken
    data.device_id = Constants.deviceId
    return new Promise(async (resolve, reject) => {
      return await Api.post('/login', data)
        .then(({ data }) => {
          log('login', data)
          setLogado(true)
          setUsuario(data.usuario)
          setToken(data.token)
          resolve({
            matricula: data.usuario.Matricula,
            token: data.token,
          })
        })
        .catch(e => {
          if (e.response.status === 401) {
            Alert('Login incorreto')
          }
          log(e)
          setLogado(false)
          reject({})
        })
    }
    )
  }

  const getPropostas = async ({ matricula, token }) => {
    return new Promise(async (resolve, reject) => {
      return await Api.get(`/proposta/${matricula}`, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(({ data }) => {
          log('login', data)
          setPropostas(data.propostas)
          resolve(true)
        })
        .catch(e => {
          if (e.response.status === 401) {
            Alert('Token inválido')
          }
          log(e)
          setPropostas([])
          reject(false)
        })
    }
    )
  }

  const logout = () => {
    setLogado(false)
    return new Promise(async (resolve, reject) => {
      return await Api.post('/logout', { headers: { 'Authorization': `Bearer ${token}` } })
        .then(({ data }) => {
          log('logout', data)
          setLogado(false)
          setUsuario({})
          setToken('')
          resolve(true)
        })
        .catch(e => {
          log(e)
          setLogado(false)
          reject(false)
        })
    }
    )
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // Listener do app em primeiro plano
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification)
    })

    // Listener de interação com a notificação
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response)
    })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener)
      Notifications.removeNotificationSubscription(responseListener)
    }
  }, [])

  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Crédito liberado!',
      body: 'Acabamos de liberar crédito para você, venha conferir.',
      data: { data: '' },
    }

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
  }

  const notificar = async () => {
    return await sendPushNotification(expoPushToken)
  }

  async function registerForPushNotificationsAsync() {
    let token
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!')
        return
      }
      token = (await Notifications.getExpoPushTokenAsync()).data
      console.log(token)
    } else {
      alert('Must use physical device for Push Notifications')
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }

    return token;
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack screenOptions={{ headerShown: false }}>
          {
            !logado
              ?
              <>
                <Screen name='Entrar' children={props => <Entrar {...props} login={login} getPropostas={getPropostas} />} />
                <Screen name='RecuperarSenha' children={props => <RecuperarSenha {...props} />} />
              </>
              : <Screen name='Drawer' children={() => <Drawer logout={logout} usuario={usuario} notificar={notificar} propostas={propostas} />} />
          }
        </Stack>
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App
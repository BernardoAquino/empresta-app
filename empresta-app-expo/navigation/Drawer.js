import * as Icons from '@expo/vector-icons'

import Ajuda from '../screens/Ajuda'
import Colors from '../Colors'
import Emprestimos from '../screens/Emprestimos'
import Informacoes from '../screens/Informacoes'
import Perfil from '../screens/Perfil'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

const { Navigator, Screen } = createDrawerNavigator()

const Drawer = ({ logout, usuario, notificar, propostas }) => {
  return (
    <Navigator screenOptions={{ gestureEnabled: true }}
      drawerPosition='right'
      drawerStyle={{ backgroundColor: Colors.gray }}
      drawerContentOptions={{
        activeBackgroundColor: Colors.orangeA,
        activeTintColor: Colors.primary,
      }} >
      <Screen name='Informacoes'
        children={props => <Informacoes {...props} usuario={usuario} />}
        options={{ drawerLabel: 'Informações', drawerIcon: ({ color }) => <Icons.Ionicons name="ios-information-circle-outline" size={24} color={color} /> }} />
      <Screen name='Emprestimos'
        children={props => <Emprestimos {...props} notificar={notificar} usuario={usuario} propostas={propostas} />}
        options={{ drawerLabel: 'Meus Empréstimos', drawerIcon: ({ color }) => <Icons.FontAwesome5 name="money-check-alt" size={24} color={color} /> }} />
      <Screen name='Perfil'
        children={props => <Perfil {...props} usuario={usuario} />}
        options={{ drawerLabel: 'Perfil', drawerIcon: ({ color }) => <Icons.AntDesign name="user" size={24} color={color} /> }} />
      <Screen name='Ajuda'
        children={props => <Ajuda {...props} />}
        options={{ drawerLabel: 'Ajuda', drawerIcon: ({ color }) => <Icons.Entypo name="help" size={24} color={color} /> }} />
      <Screen name='Sair'
        children={() => null}
        listeners={{ focus: logout }}
        options={{ drawerLabel: 'Sair', drawerIcon: ({ color }) => <Icons.AntDesign name="poweroff" size={24} color={color} /> }} />
    </Navigator>
  )
}

export default Drawer
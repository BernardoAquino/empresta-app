import { Appbar, DefaultTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper'
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import Colors from '../Colors'
import Constants from 'expo-constants'
import StatusBar from './StatusBar'

const Header = ({ onPress, label }) => {
  return (
    <>
      <StatusBar backgroundColor={Colors.blackA} barStyle='light-content' translucent />
      <Appbar.Header style={{ width: '100%' }}>
        <Appbar.Content title={label} color={Colors.gray} />
        <Appbar.Action
          icon='menu'
          size={34}
          color={Colors.blue}
          onPress={onPress} />
      </Appbar.Header>
    </>
  )
}

export default Header
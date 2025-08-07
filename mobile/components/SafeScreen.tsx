import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {COLORS}  from '../constants/colors.js'

const SafeScreen = ({children}:any) => {
    const insert = useSafeAreaInsets()
  return (
    <View style={{paddingTop:insert.top, flex: 1, backgroundColor: COLORS.background}}>
      {children}
    </View>
  )
}

export default SafeScreen
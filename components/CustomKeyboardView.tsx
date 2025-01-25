import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React from 'react'

interface CustomKeyBoardViewProps {
  children: any
  inChat?: boolean
}
const CustomKeyBoardView = ({children, inChat}: CustomKeyBoardViewProps) => {
  let kavConfig = {};
  let scrollViewConfig = {};

  if(inChat) {
    kavConfig = {keyboardVerticalOffset: 90};
    scrollViewConfig = {contentContainerStyle: {flex: 1}};
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex: 1}}
      {...kavConfig}
    >
      <ScrollView
        style={{flex: 1}}
        bounces={false}
        showsVerticalScrollIndicator={false}
        {...scrollViewConfig}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default CustomKeyBoardView
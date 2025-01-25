import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { DocumentData } from 'firebase/firestore'
import MessageItem from './MessageItem'

interface MessagesListProps {
  messages: DocumentData[],
  currentUser: string,
  scrollViewRef: any
}
const MessagesList = ({messages, currentUser, scrollViewRef}: MessagesListProps) => {
  return (
    <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingTop: 10}}>
      {
        messages.map((message, index) => {
          return (<MessageItem message={message} key={index} currentUser={currentUser} />);
        })
      }
    </ScrollView>
  )
}

export default MessagesList
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';
import { addDoc, collection, doc, DocumentData, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';

import ChatRoomHeader from '@/components/ChatRoomHeader';
import MessagesList from '@/components/MessagesList';
import CustomKeyBoardView from '@/components/CustomKeyboardView';
import { useAuth } from '@/context/authContext';
import { getRoomId } from '@/utils/common';
import { db } from '@/config/firebase';

const chatRoom = () => {

  const item: any = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const [messages, setMessages] = React.useState<DocumentData[]>([]);
  const textRef = React.useRef('');
  const inputRef = React.useRef<TextInput>(null);
  const scrollViewRef = React.useRef<{ scrollToEnd: (options?: { animated: boolean }) => void } | null>(null);

  useEffect(() => {
    createRoomIfNotExists();


    let roomid = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, 'rooms', roomid);
    const messageRef = collection(docRef, 'messages');
    const q = query(messageRef, orderBy('createdAt', 'asc'));

    let unSub = onSnapshot(q, (querySnapshot) => {
      let allMessages = querySnapshot.docs.map(doc => doc.data());

      setMessages([...allMessages]);
    });

    const keyBoardDidShowListener = Keyboard.addListener(
      'keyboardDidShow', updateScrollView
    )

    return () => {
      unSub();
      keyBoardDidShowListener.remove();
    }

  }, []);

  useEffect(() => {
    updateScrollView();
  }, [messages])
  

  const updateScrollView = () => {

    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({animated: true})
    }, 100)
  }

  const createRoomIfNotExists = async () => {
    
    let roomId = getRoomId(user?.userId, item?.userId);

    await setDoc(doc(db, 'rooms', roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date())
    });
  }

  const handleSendMessage = async () => {

    let message = textRef.current.trim();
    if(!message) return;

    try {
      
      let roomid = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, 'rooms', roomid);
      const messageRef = collection(docRef, 'messages');

      const newDoc = await addDoc(messageRef, {
        text: message,
        userId: user?.userId,
        senderName: user?.userName,
        createdAt: Timestamp.fromDate(new Date())
      });

      textRef.current = '';
      if(inputRef) inputRef.current?.clear();

    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  }

  return (
    <CustomKeyBoardView inChat>
      <View className='flex-1 bg-red-100'>
        <StatusBar style='dark' />
        <ChatRoomHeader user={item} router={router} />
        <View className='flex-1 justify-between bg-red-100 overflow-visible'>
          <View className='flex-1'>
            {/* Chat Messages */}
            <MessagesList messages={messages} currentUser={user?.userId} scrollViewRef={scrollViewRef} />
          </View>
          <View style={{marginBottom: hp(1)}} className='pt-2'>
            {/* Chat Input */}
            <View className='flex-row justify-between mx-3 bg-white border border-red-200 p-2 rounded-full pl-5'>
              <TextInput
                ref={inputRef}
                placeholder='Type a message'
                placeholderTextColor={'#737373'}
                className='flex-1 mr-2'
                style={{fontSize: hp(2)}}
                onChangeText={(text) => textRef.current = text}
              />
              <TouchableOpacity onPress={handleSendMessage} className='bg-neutral-200 p-3.5 mr-[1px] rounded-full justify-center items-center'>
                <Feather name='send' size={hp(2.7)} color={'black'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyBoardView>
  )
}

export default chatRoom
import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { doc, collection, query, orderBy, onSnapshot, DocumentData } from 'firebase/firestore';
import { router } from 'expo-router';

import { blurhash, getRoomId } from '@/utils/common';
import { db } from '@/config/firebase';
import { formatTimestampToTime } from '../utils/common';

interface ChatItemProps {
  user: any,
  noBorder: any,
  currentUser: any
}
const ChatItem = ({user, noBorder, currentUser}: ChatItemProps) => {

  const [lastMessage, setLastMessage] = useState<DocumentData|null>();

  useEffect(() => {

    let roomid = getRoomId(currentUser?.userId, user?.userId);
    const docRef = doc(db, 'rooms', roomid);
    const messageRef = collection(docRef, 'messages');
    const q = query(messageRef, orderBy('createdAt', 'desc'));

    let unSub = onSnapshot(q, (querySnapshot) => {
      let allMessages = querySnapshot.docs.map(doc => doc.data());

      setLastMessage(allMessages[0] ? allMessages[0] : null);
    });

    return unSub;

  }, []);

  const openChat = () => {
    router.push({pathname: '/chatRoom', params: user});
  }
  
  const renderTime = () => {
    if(lastMessage) {
      return formatTimestampToTime(lastMessage?.createdAt);
    }
  }

  const renderLastMessage = () => {
    if(typeof lastMessage == null) return 'Loading...';

    if(lastMessage) {
      if(currentUser?.userId == lastMessage?.userId) return '✓ '+lastMessage?.text;
      return lastMessage?.text;
    }else {
      return 'Saludos... 🖖';
    }
  }

  return (
    <TouchableOpacity onPress={openChat} className={`flex-row justify-between items-center mx-4 gap-3 mb-4 pb-2 ${noBorder ? '' : 'border-b border-b-neutral-200'}`}>
      <Image 
        source={{uri: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png'}}
        style={{height: hp(8), aspectRatio: 1}}
        className='rounded-full'
        transition={500}
        placeholder={blurhash}
      />

      <View className='flex-1 gap-1'>
        <View className='flex-row justify-between'>
          <Text style={{fontSize: hp(1.8)}} className='font-semibold text-neutral-800'>{user?.userName}</Text>
          <Text style={{fontSize: hp(1.6)}} className='font-medium text-neutral-500'>{renderTime()}</Text>
        </View>
        <Text style={{fontSize: hp(1.6)}} className='font-medium text-neutral-500' >{renderLastMessage()}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ChatItem
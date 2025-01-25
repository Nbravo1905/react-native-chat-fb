import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Entypo, Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image';
import { blurhash } from '@/utils/common';

interface ChatRoomHeaderProps {
  user: any,
  router: any
}
const ChatRoomHeader = ({user, router}: ChatRoomHeaderProps) => {
  return (
    <Stack.Screen
      options={{
        title: '',
        headerShadowVisible: false,
        headerLeft: () => (
          <View className='flex-row items-center gap-4'>
            <TouchableOpacity onPress={() => router.back()}>
              <Entypo 
                name='chevron-left'
                size={hp(4.5)}
                color={'black'}
              />
            </TouchableOpacity>
            <View className='flex-row items-center gap-3'>
              <Image 
                source={{uri: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png'}}
                style={{height: hp(4.5), aspectRatio: 1}}
                className='rounded-full'
                transition={500}
                placeholder={blurhash}
              />
              <Text style={{fontSize: hp(2.5)}} className='text-neutral-700 font-medium'>
                {user?.userName}
              </Text>
            </View>
          </View>
        ),
        headerRight: () => (
          <View className='flex-row items-center gap-8'>
            <Ionicons name='call' color={'black'} size={hp(2.8)} />
            <Ionicons name='videocam' color={'black'} size={hp(2.8)} />
          </View>
        )
      }}
    />
  )
}

export default ChatRoomHeader
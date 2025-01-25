import { View, Text, Platform } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { AntDesign, Feather } from '@expo/vector-icons';


import { blurhash } from '@/utils/common';
import CustomMenuItems from './CustomMenuItems';
import { useAuth } from '@/context/authContext';


const ios = Platform.OS === 'ios';

const HomeHeader = () => {

  const { top } = useSafeAreaInsets();
  const { logout } = useAuth()

  const handleProfile = () => {
    console.log('Profile')
  }

  const handleSignOut = async () => {
    await logout();
  }

  return (
    <View style={{paddingTop: ios? top : top + 10}} className='flex-row justify-between items-center bg-stone-900 px-5 pb-6 rounded-b-3xl shadow'>
      <StatusBar style='light' />
      <View>
        <Text style={{fontSize: hp(3)}} className='font-medium text-white'>Chats</Text>
      </View>
      <View>
        <Menu>
          <MenuTrigger>
            <Image
              style={{height: hp(4.3), aspectRatio: 1, borderRadius: 100}}
              source="https://picsum.photos/seed/696/3000/2000"
              placeholder={{ blurhash }}
              transition={500}
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                borderRadius: 10,
                borderCurve: 'continuous',
                marginTop: 45,
                backgroundColor: 'white',
                width: wp(40),
              }
            }}
          >
            <CustomMenuItems
              text='Profile'
              action={handleProfile}
              value={null}
              icon={<Feather name='user' size={hp(2.5)} color='#737373' />}
            />
            <View className='p-[1px] w-full bg-neutral-200' />
            <CustomMenuItems
              text='Sign out'
              action={handleSignOut}
              value={null}
              icon={<AntDesign name='logout' size={hp(2.5)} color='#737373' />}
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  )
}

export default HomeHeader
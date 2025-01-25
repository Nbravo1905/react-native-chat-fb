import { View, Text } from 'react-native'
import React, { ReactElement } from 'react'
import { MenuOption } from 'react-native-popup-menu'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

interface CustomMenuItemsProps {
  text: string,
  action: () => void,
  value: string|null,
  icon: ReactElement
}

const CustomMenuItems = ({ text, action, value, icon }: CustomMenuItemsProps) => {
  return (
    <MenuOption onSelect={() => action()}>
      <View className='px-4 py-2 flex-row justify-between items-center'>
        <Text style={{fontSize: hp(1.7)}} className='font-semibold text-neutral-600'>
          {text}
        </Text>
        {icon}
      </View>
    </MenuOption>
  )
}

export default CustomMenuItems
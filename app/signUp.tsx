import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Feather, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import Loading from '@/components/Loading';
import CustomKeyBoardView from '@/components/CustomKeyboardView';
import { useAuth } from '@/context/authContext';

const SignUp = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const userNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleRegister = async () => {
    if(!userNameRef.current || !emailRef.current || !passwordRef.current) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    setLoading(true);

    let response = await register({email: emailRef.current, password: passwordRef.current, userName: userNameRef.current});

    setLoading(true);

    console.log(response);
    if(!response.success) {
      Alert.alert("Error", response.msg);
      setLoading(false);
      return;
    }
    
  }

  return (
    <CustomKeyBoardView className='bg-slate-50'>
      <StatusBar style='dark' />
      <View style={{paddingTop: hp(8), paddingHorizontal: wp(5)}} className='flex-1 gap-12'>
        <View className='items-center'>
          <Image style={{height: hp(23)}} resizeMode='contain' source={require('@/assets/images/sign-in.jpg')} />
        </View>

        <View className='gap-10'>
          <Text style={{fontSize: hp(4)}} className='font-bold tracking-wider text-center text-neutral-800'>Sign Up</Text>

          <View className='gap-4'>
            <View style={{height: hp(7)}} className='flex-row gap-4 px-4 bg-neutral-200 items-center rounded-xl'>
              <Feather name='user' size={hp(2.7)} color={'gray'} />
              <TextInput 
                style={{fontSize: hp(2)}}
                className='flex-1 font-semibold text-neutral-700'
                placeholder='Username'
                placeholderTextColor={'gray'}
                onChangeText={(text) => userNameRef.current = text}
              />
            </View>
            <View style={{height: hp(7)}} className='flex-row gap-4 px-4 bg-neutral-200 items-center rounded-xl'>
              <Octicons name='mail' size={hp(2.7)} color={'gray'} />
              <TextInput 
                style={{fontSize: hp(2)}}
                className='flex-1 font-semibold text-neutral-700'
                placeholder='Email Address'
                placeholderTextColor={'gray'}
                onChangeText={(text) => emailRef.current = text}
              />
            </View>
            <View style={{height: hp(7)}} className='flex-row gap-4 px-4 bg-neutral-200 items-center rounded-xl'>
              <Octicons name='lock' size={hp(2.7)} color={'gray'} />
              <TextInput 
                style={{fontSize: hp(2)}}
                className='flex-1 font-semibold text-neutral-700'
                placeholder='Password'
                placeholderTextColor={'gray'}
                secureTextEntry={true}
                onChangeText={(text) => passwordRef.current = text}
              />
            </View>

            <View>
              {
                loading ? (
                  <View className='flex-row justify-center'>
                    <Loading size={hp(6.5)} />
                  </View>
                ) : (
                  <TouchableOpacity onPress={handleRegister} style={{height: hp(6.5)}} className='bg-black rounded-xl justify-center items-center'>
                    <Text style={{fontSize: hp(2.7)}} className='text-white font-bold tracking-wider'>Sign Up</Text>
                  </TouchableOpacity>
                )
              }
            </View>
            

            <View className='flex-row justify-center'>
              <Text style={{fontSize: hp(1.8)}} className='font-semibold text-neutral-500'>Already have an account? </Text>
              <Pressable onPress={() => router.push('/signIn')}>
                <Text style={{fontSize: hp(1.8)}} className='font-bold text-blue-400'>Sign In</Text>
              </Pressable>
            </View>

          </View>

        </View>

      </View>
    </CustomKeyBoardView>
  )
}

export default SignUp
import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import Loading from '@/components/Loading';
import { useAuth } from '@/context/authContext';

const SignIn = () => {

  const router = useRouter();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    if(!emailRef.current || !passwordRef.current) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    setLoading(true);
    const response = await login({email: emailRef.current, password: passwordRef.current});
    setLoading(false);
    if(!response.success) {
      Alert.alert("Sign In", response.msg);
    }


  }

  return (
    <View className='flex-1 bg-slate-50'>
      <StatusBar style='dark' />
      <View style={{paddingTop: hp(8), paddingHorizontal: wp(5)}} className='flex-1 gap-12'>
        <View className='items-center'>
          <Image style={{height: hp(23)}} resizeMode='contain' source={require('@/assets/images/sign-in.jpg')} />
        </View>

        <View className='gap-10'>
          <Text style={{fontSize: hp(4)}} className='font-bold tracking-wider text-center text-neutral-800'>Sign In</Text>

          <View className='gap-4'>
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
            <View className='gap-3'>
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
              <Text style={{fontSize: hp(1.8)}} className='text-right font-semibold text-neutral-500'>Forgot Password?</Text>
            </View>

            <View>
              {
                loading ? (
                  <View className='flex-row justify-center'>
                    <Loading size={hp(6.5)} />
                  </View>
                ) : (
                  <TouchableOpacity onPress={handleLogin} style={{height: hp(6.5)}} className='bg-black rounded-xl justify-center items-center'>
                    <Text style={{fontSize: hp(2.7)}} className='text-white font-bold tracking-wider'>Sign In</Text>
                  </TouchableOpacity>
                )
              }
            </View>
            

            <View className='flex-row justify-center'>
              <Text style={{fontSize: hp(1.8)}} className='font-semibold text-neutral-500'>Don't have an account? </Text>
              <Pressable onPress={() => router.push('/signUp')}>
                <Text style={{fontSize: hp(1.8)}} className='font-bold text-blue-400'>Sign Up</Text>
              </Pressable>
            </View>

          </View>

        </View>

      </View>
    </View>
  )
}

export default SignIn
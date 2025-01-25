import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { getDocs, query, where } from 'firebase/firestore';

import { useAuth } from '@/context/authContext';
import ChatList from '@/components/ChatList';
import Loading from '@/components/Loading';
import { userRef } from '@/config/firebase';

const Home = () => {

  const { user } = useAuth();
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    if(user?.uid)
      getUsers();

  }, [])

  const getUsers = async () => {
    
    const q = query(userRef, where('userId', '!=', user?.uid));

    const querySnapshot = await getDocs(q);
    let data: any = [];
    querySnapshot.forEach(doc => {
      data.push({...doc.data()});
    });

    setUsers(data);
  }

  return (
    <View className='flex-1 bg-white'>
      <StatusBar style='light' />

      {
        users.length > 0 ? (
          <ChatList users={users} currentUser={user} />
        ) : (
          <View className='flex-1 items-center' style={{top: hp(30)}}>
            <Loading size={hp(20)} />
          </View>
        )
      }

    </View>
  )
}

export default Home
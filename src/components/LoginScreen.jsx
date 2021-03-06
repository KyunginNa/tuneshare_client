import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, TextInput } from 'react-native'
import Auth from '../modules/AuthDevise'
import { showMessage } from 'react-native-flash-message'
import styles from '../styles/styles'
import { Fontisto } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'

const LoginScreen = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginMessage, setLoginMessage] = useState()
  const dispatch = useDispatch()
  const deviseAuth = new Auth({
    host: 'https://tuneshare-ca.herokuapp.com/api',
  })

  const authWithDevise = async () => {
    await deviseAuth
      .signIn(email, password)
      .then(resp => {
        props.navigation.navigate('HomeScreen')
        dispatch({
          type: 'SET_CURRENT_USER',
          payload: {
            authenticated: true,
          },
        })
      })
      .catch(error => {
        setLoginMessage(error.response.data.errors[0])
      })
  }

  const image = require('../images/image.png')

  return (
    <View style={{ flex: 1, flexDirection: 'column' }} testID='login-screen'>
      <ImageBackground source={image} style={styles.loginImage}>
        <TextInput
          testID='login-email'
          placeholderTextColor='white'
          style={styles.loginInput}
          placeholder='Enter your email...'
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          testID='login-password'
          placeholderTextColor='white'
          secureTextEntry={true}
          style={styles.loginInput}
          placeholder='Enter your password...'
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity
          raised='true'
          testID='login-submit'
          hitSlop={styles.loginHitSlop}
          style={styles.loginSubmit}
          onPress={() => {
            authWithDevise()
            {
              !loginMessage &&
                showMessage({
                  message: 'Welcome to TuneShare...',
                  description: 'Now share some tunes!',
                  type: 'success',
                  autoHide: true,
                  backgroundColor: '#833AB4',
                  color: '#FFDC80',
                  opacity: 0.7,
                  duration: 3000,
                })
            }
          }}
        >
          <Text>
            <Fontisto
              name='spotify'
              style={{ paddingLeft: 32, paddingTop: 12, paddingBottom: 12, paddingRight: 32 }}
              color='#ffffff'
              size={77}
            />
          </Text>
        </TouchableOpacity>
        {loginMessage &&
          showMessage({
            message: loginMessage,
            type: 'warning',
            autoHide: true,
            duration: 6000,
            backgroundColor: '#E50914',
            color: '#C13584',
            opacity: 0.5,
            hideOnPress: true,
          })}
      </ImageBackground>
    </View>
  )
}

export default LoginScreen
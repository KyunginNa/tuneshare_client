import React, { useState } from 'react'
import {
  TextInput,
  Button,
  FlatList,
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  TouchableHighlight
} from 'react-native'
import { ListItem, Card } from 'react-native-elements'
import TrackService from '../modules/TrackService'
import TrackPlayer from './TrackPlayer'
import { useSelector } from 'react-redux'
import store from '../state/store/store'
import styles from '../styles/styles'
import PostService from '../modules/PostService'

const PostForm = (props) => {
  const [search, setSearch] = useState()
  const [description, setDescription] = useState()
  const { searchResult, trackDetails, errorMessage, credentials } = useSelector(
    (state) => state
  )

  const image = require('../images/image.png')

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} style={styles.loginImage}>
        <View style={styles.formContent}>
          <View style={styles.inputContent}>
            <TextInput
              style={styles.searchInput}
              testID="searchInput"
              placeholder="Search a song to create a post!"
              onChangeText={(text) => setSearch(text)}
              value={search || ''}
            />
            <TouchableHighlight
              style={styles.searchButton}
              testID="searchButton"
              onPress={() => TrackService.index(search)}
            >
              <Text>Search</Text>
            </TouchableHighlight>
          </View>
        </View>
        <FlatList
          testID="searchResults"
          data={searchResult}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItem
              style={styles.searchResultBox}
              testID={`result-${item.id}`}
              onPress={() =>
                store.dispatch({
                  type: 'SET_TRACK_DETAILS',
                  payload: {
                    track: item.track,
                    artists: item.artists,
                    image: item.image,
                    preview: item.preview,
                  },
                })
              }
            >
              <ListItem.Title>{item.track}</ListItem.Title>
              <ListItem.Subtitle>{item.artists}</ListItem.Subtitle>
            </ListItem>
          )}
        />
        {trackDetails && (
          <>
            <Card testID="trackPreview" style={styles.previewCard}>
              <Card.Title style={styles.track}>{trackDetails.track}</Card.Title>
              <Card.Title style={styles.artists}>
                {trackDetails.artists}
              </Card.Title>
              <Card.Divider />
              <Card.Image
                style={styles.image}
                source={{ uri: trackDetails.image }}
              >
                <TrackPlayer post={trackDetails} />
              </Card.Image>
            </Card>
            <TextInput
              style={styles.postDescription}
              placeholder="Write a caption!"
              testID="descriptionInput"
              onChangeText={(text) => setDescription(text)}
            />
            <Button
              style={styles.postButton}
              testID="postButton"
              title="Post"
              color="black"
              onPress={() =>
                PostService.create(
                  trackDetails,
                  description,
                  props.navigation.navigate,
                  credentials
                )
              }
            />
          </>
        )}
        <Text testID="errorMessage">{errorMessage}</Text>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default PostForm

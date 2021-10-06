import axios from 'axios';
import React, {useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  ActivityIndicator,
  View,
  Button,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useMutation, useQuery, useQueryClient} from 'react-query';

import {urls} from '../../constants';

import styles from './styles';

export const Posts = ({navigation}) => {
  const fetchPosts = async () => {
    try {
      const res = await axios.get(urls.getPosts);

      return res.data;
    } catch (err) {
      console.error('fetchPosts', err);
      throw new Error(`${err}`);
    }
  };

  const queryClient = useQueryClient();

  const updatePosts = async post => {
    try {
      const {data: updated} = await axios.post(urls.getPosts, post);

      console.log('updated', updated);
    } catch (err) {
      console.error('fetchPosts', err);
      throw new Error(`${err}`);
    }
  };

  const newlyPost = {title: 'New Post Optimistic', id: 45};

  const {mutate} = useMutation(newPost => updatePosts(newPost), {
    onMutate: async newPost => {
      await queryClient.cancelQueries('posts');

      const previousPosts = queryClient.getQueryData('posts');

      queryClient.setQueryData('posts', old => [newPost, ...old]);

      console.log('mutation is going to happen');

      return previousPosts;
    },
    onError: (error, variables, prevValues) => {
      queryClient.setQueryData('posts', prevValues);
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries('posts');
    // },
  });

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery('posts', fetchPosts);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (isError) {
    return (
      <Text style={{color: 'red', fontSize: 25}}>Sorry: {`${error}`}</Text>
    );
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <Button title="Update" onPress={() => mutate(newlyPost)} />
          {posts.map(({title, id}) => {
            return (
              <TouchableOpacity style={styles.userItem} key={id}>
                <Text style={{color: 'white'}}>Post Title: {title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

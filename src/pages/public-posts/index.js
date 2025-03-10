import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/container';
import {
  Card,
  CardTitle,
  CardAction,
  CardButton,
} from 'react-native-material-cards';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {
  getMorePostsCollection,
  getPostsCollection,
  getUserInfosCollection,
} from '../../utils/utils';
import {useSelector} from 'react-redux';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {db} from '../../utils/firebase';
import styles from './styles';
import FastImage from 'react-native-fast-image';

const PublicPosts = route => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentPostLikes, setCurrentPostLikes] = useState([]);
  const {user, userLoading} = useSelector(state => state.user);

  const [postsPerLoad, setPostsPerLoad] = useState(4);
  const [startAfter, setStartAfter] = useState(Object);
  const [lastPost, setLastPost] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user && !userLoading) {
      const usersFromFirestore = async () => {
        await getUserInfosCollection().then(res => {
          setUsers(res);
        });
      };
      usersFromFirestore();
    }
  }, [user]);

  useEffect(() => {
    if (users.length !== 0 && user) {
      const postsFromFirestore = async () => {
        await getPostsCollection(postsPerLoad).then(res => {
          let mergedPosts = res.posts;

          mergedPosts.forEach(post => {
            const findPostUser =
              users.find(user => user.uid === post.userId) ?? null;
            if (findPostUser !== null) {
              post.userProfilePhoto = findPostUser?.profilePhoto;
              post.userFullName = findPostUser?.fullName;
              post.userHoroscope = findPostUser?.horoscope;
            }
          });
          setPosts([...mergedPosts]);
          setStartAfter(res.lastVisible);
        });
      };

      postsFromFirestore();
      const unsubscribe = navigation.addListener('focus', () => {
        setLastPost(false);
        postsFromFirestore();
      });

      return unsubscribe;
    }
  }, [users]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getPostsCollection(postsPerLoad).then(res => {
      let mergedPosts = res.posts;

      mergedPosts.forEach(post => {
        const findPostUser =
          users.find(user => user.uid === post.userId) ?? null;
        if (findPostUser !== null) {
          post.userProfilePhoto = findPostUser?.profilePhoto;
          post.userFullName = findPostUser?.fullName;
          post.userHoroscope = findPostUser?.horoscope;
        }
      });
      setPosts([...mergedPosts]);
      setStartAfter(res.lastVisible);
      setRefreshing(false);
    });
  };

  const handleLoadMore = async () => {
    if (!lastPost) {
      await getMorePostsCollection(startAfter, postsPerLoad).then(res => {
        let mergedPosts = res.posts;

        mergedPosts.forEach(post => {
          const findPostUser = users.find(user => user.uid === post.userId);
          if (findPostUser) {
            post.userProfilePhoto = findPostUser.profilePhoto;
            post.userFullName = findPostUser.fullName;
            post.userHoroscope = findPostUser.horoscope;
          }
        });
        setPosts([...posts, ...mergedPosts]);
        setStartAfter(res.lastVisible);
        mergedPosts.length === 0 ? setLastPost(true) : setLastPost(false);
      });
    }
  };

  const handleLikePost = async ({collectionId}) => {
    try {
      const docRef = doc(db, 'Posts', collectionId);

      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const postData = docSnapshot.data();
        const updatedLikeCount = postData.like + 1;

        await updateDoc(docRef, {like: updatedLikeCount});
      } else {
      }
    } catch (error) {
      return error;
    }
  };

  const renderItem = ({item}) => {
    const currentLike = currentPostLikes[item?.collectionId] ?? item.like;
    return (
      <Card style={styles.materialCardStyle}>
        <FastImage
          source={{
            uri: item?.imageURL,
            priority: FastImage.priority.high,
          }}
          style={styles.materialCardImageStyle}
        />
        <CardTitle
          title={`${item.userFullName}, ${item.userHoroscope}`}
          subtitle={item.description}
          style={styles.materialCardTitleStyle}
        />

        <CardAction
          style={styles.materialCardActionStyle}
          separator={true}
          inColumn={false}>
          <CardButton
            onPress={() => {
              setCurrentPostLikes(prev => ({
                ...prev,
                [item.collectionId]: currentLike + 1,
              }));
              handleLikePost({
                collectionId: item.collectionId,
              });
            }}
            title="Beğen"
            color="blue"
          />
          <Text style={styles.currentLikeStyle}>({currentLike})</Text>
        </CardAction>
      </Card>
    );
  };

  return (
    <Container>
      <SafeAreaView style={styles.safeAreaContainer}>
        {userLoading ? (
          <ActivityIndicator size={'large'} color={'white'} />
        ) : (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('UserPostTransaction')}
              activeOpacity={0.7}
              style={styles.addPostTransitionStyle}>
              <MaterialIcons name="add-box" color={'white'} size={40} />
            </TouchableOpacity>
            <FlatList
              data={posts}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={handleLoadMore}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.01}
              scrollEventThrottle={150}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              ListFooterComponent={() =>
                !lastPost ? (
                  <ActivityIndicator size={'large'} color={'white'} />
                ) : (
                  <View style={{height: 100}} />
                )
              }
            />
          </>
        )}
      </SafeAreaView>
    </Container>
  );
};

export default PublicPosts;

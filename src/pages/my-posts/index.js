import {ActivityIndicator, FlatList, SafeAreaView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/container';
import {
  Card,
  CardTitle,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import {useNavigation} from '@react-navigation/native';
import {
  getMoreUserPostsByEmail,
  getUserInfoByEmail,
  getUserPostsByEmail,
} from '../../utils/utils';
import {useSelector} from 'react-redux';
import {deleteDoc, doc} from 'firebase/firestore';
import {db} from '../../utils/firebase';
import CustomHeader from '../../components/custom-header';
import HeaderButton from '../../components/header-button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';

const MyPosts = () => {
  const navigation = useNavigation();
  const {user, userLoading} = useSelector(state => state.user);
  const [currentUserPosts, setCurrentUserPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const [postsPerLoad, setPostsPerLoad] = useState(4);
  const [startAfter, setStartAfter] = useState(Object);
  const [lastPost, setLastPost] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const usersFromFirestore = async () => {
      await getUserInfoByEmail(user.email).then(res => {
        setCurrentUser(res);
      });
    };
    usersFromFirestore();
  }, [user]);

  useEffect(() => {
    const postsFromFirestore = async () => {
      await getUserPostsByEmail(user?.uid, postsPerLoad).then(res => {
        let mergedPosts = res.posts;
        mergedPosts.forEach(post => {
          post.userFullName = currentUser.fullName;
          post.userHoroscope = currentUser.horoscope;
        });

        setCurrentUserPosts([...mergedPosts]);
        setStartAfter(res.lastVisible);
      });
    };
    postsFromFirestore();
    const unsubscribe = navigation.addListener('focus', () => {
      setLastPost(false);
      postsFromFirestore();
    });

    return unsubscribe;
  }, [currentUser]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getUserPostsByEmail(user.uid, postsPerLoad).then(res => {
      let mergedPosts = res.posts;

      mergedPosts.forEach(post => {
        post.userProfilePhoto = currentUser?.profilePhoto;
        post.userFullName = currentUser?.fullName;
        post.userHoroscope = currentUser?.horoscope;
      });
      setCurrentUserPosts([...currentUserPosts, ...mergedPosts]);
      setStartAfter(res.lastVisible);
      setRefreshing(false);
    });
  };

  const handleLoadMore = async () => {
    if (!lastPost) {
      await getMoreUserPostsByEmail(user.uid, startAfter, postsPerLoad).then(
        res => {
          let mergedPosts = res.posts;

          mergedPosts.forEach(post => {
            post.userProfilePhoto = currentUser.profilePhoto;
            post.userFullName = currentUser.fullName;
            post.userHoroscope = currentUser.horoscope;
          });
          setCurrentUserPosts([...currentUserPosts, ...mergedPosts]);
          setStartAfter(res.lastVisible);
          mergedPosts.length === 0 ? setLastPost(true) : setLastPost(false);
        },
      );
    }
  };

  const handleDeletePost = async ({collectionId}) => {
    try {
      const docRef = doc(db, 'Posts', collectionId);

      deleteDoc(docRef);

      const updatedPosts = currentUserPosts.filter(
        post => post.collectionId !== collectionId,
      );

      setCurrentUserPosts(updatedPosts);
    } catch (error) {
      return error;
    }
  };

  const renderItem = ({item}) => {
    return (
      <Card style={styles.materialCardStyle}>
        <CardImage
          style={styles.materialCardImageStyle}
          source={{uri: item.imageURL}}
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
            onPress={() => navigation.navigate('EditMyPost')}
            title="Düzenle"
            color="blue"
          />
          <CardButton
            onPress={() => {
              handleDeletePost({
                collectionId: item.collectionId,
              });
            }}
            title="SİL"
            color="red"
          />
        </CardAction>
      </Card>
    );
  };

  return (
    <Container>
      <CustomHeader
        containerStyle={styles.headerContainerStyle}
        iconLeft={
          <HeaderButton
            onPress={() => navigation.goBack()}
            children={<Icon size={24} name="chevron-left" color={'white'} />}
          />
        }
        iconTitle={'Gönderilerim'}
      />
      <SafeAreaView style={styles.safeAreaContainer}>
        {userLoading ? (
          <ActivityIndicator size={'large'} color={'white'} />
        ) : (
          <FlatList
            data={currentUserPosts}
            renderItem={renderItem}
            keyExtractor={item => item.id}
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
        )}
      </SafeAreaView>
    </Container>
  );
};

export default MyPosts;

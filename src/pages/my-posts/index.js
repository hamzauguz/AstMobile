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
import {windowHeight, windowWidth} from '../../utils/helpers';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ConfirmDialog} from 'react-native-simple-dialogs';

const MyPosts = () => {
  const navigation = useNavigation();
  const {user, userLoading} = useSelector(state => state.user);
  const [currentUserPosts, setCurrentUserPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const [postsPerLoad, setPostsPerLoad] = useState(4);
  const [startAfter, setStartAfter] = useState(Object);
  const [lastPost, setLastPost] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deletePostDialogVisible, setDeletePostDialogVisible] = useState(false);
  const [deletePostId, setDeletePostId] = useState(null);
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
      setLoading(true);
      await getUserPostsByEmail(user?.uid, postsPerLoad).then(res => {
        let mergedPosts = res.posts;
        mergedPosts.forEach(post => {
          post.userFullName = currentUser.fullName;
          post.userHoroscope = currentUser.horoscope;
        });

        setCurrentUserPosts([...mergedPosts]);
        setStartAfter(res.lastVisible);
        setLoading(false);
      });
    };
    postsFromFirestore();

    const unsubscribe = navigation.addListener('focus', () => {
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
      setCurrentUserPosts([...mergedPosts]);
      setStartAfter(res.lastVisible);
      setRefreshing(false);
      setLastPost(false);
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
          currentUserPosts?.length === 0
            ? setLastPost(true)
            : setLastPost(false);
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
      setDeletePostId(null);
      setDeletePostDialogVisible(false);
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
            onPress={() =>
              navigation.navigate('EditMyPost', {
                collectionId: item.collectionId,
              })
            }
            title="Düzenle"
            color="blue"
          />
          <CardButton
            onPress={() => {
              setDeletePostId(item.collectionId);
              setDeletePostDialogVisible(true);
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
        {loading ? (
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
            ListEmptyComponent={() => (
              <View
                style={{
                  alignItems: 'center',
                  height: windowHeight,
                  justifyContent: 'center',
                }}>
                <FontAwesome5Icon
                  name="comment-slash"
                  color="#b717d2"
                  size={80}
                  style={{bottom: 30}}
                />

                <TouchableOpacity
                  onPress={() => navigation.navigate('UserPostTransaction')}
                  activeOpacity={0.5}
                  style={{
                    width: windowWidth - 120,
                    height: 60,
                    backgroundColor: '#b717d2',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    borderRadius: 20,
                    flexDirection: 'row',
                  }}>
                  <MaterialIcons name="add-box" color={'white'} size={40} />

                  <Text style={{color: 'white', fontSize: 22}}>
                    Gönderi Oluştur
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            ListFooterComponent={() =>
              lastPost ? (
                <ActivityIndicator size={'large'} color={'white'} />
              ) : (
                <View style={{height: 100}} />
              )
            }
          />
        )}
      </SafeAreaView>
      <ConfirmDialog
        title="Sil"
        message="Gönderiyi silmek istiyor musunuz?"
        visible={deletePostDialogVisible}
        onTouchOutside={() => setDeletePostDialogVisible(false)}
        positiveButton={{
          title: 'EVET, SİL',
          onPress: () =>
            handleDeletePost({
              collectionId: deletePostId,
            }),
        }}
        negativeButton={{
          title: 'HAYIR',
          onPress: () => setDeletePostDialogVisible(false),
        }}
      />
    </Container>
  );
};

export default MyPosts;

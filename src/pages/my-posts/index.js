import {ActivityIndicator, FlatList, SafeAreaView} from 'react-native';
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
  getPostsCollection,
  getUserInfoByEmail,
  getUserPostsByEmail,
} from '../../utils/utils';
import {useSelector} from 'react-redux';
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import {db} from '../../utils/firebase';
import CustomHeader from '../../components/custom-header';
import HeaderButton from '../../components/header-button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';

const MyPosts = () => {
  const navigation = useNavigation();
  const [userInfos, setUserInfos] = useState(new Array());
  const {user, userLoading} = useSelector(state => state.user);
  const [currentUserPosts, setCurrentUserPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const [postsPerLoad, setPostsPerLoad] = useState(2);
  const [userInfoWithoutPost, setUserInfoWithoutPost] = useState(null);
  console.log('user uid: ', user.uid);

  useEffect(() => {
    const usersFromFirestore = async () => {
      await getUserInfoByEmail(user.email).then(res => {
        setCurrentUser(res);
      });
    };
    usersFromFirestore();
  }, []);
  console.log('currentuser: ', currentUser);

  useEffect(() => {
    const postsFromFirestore = async () => {
      await getUserPostsByEmail(user.uid).then(res => {
        let mergedPosts = res;
        mergedPosts.forEach(post => {
          post.userFullName = currentUser.fullName;
          post.userHoroscope = currentUser.horoscope;
        });

        setCurrentUserPosts(mergedPosts);
      });
    };
    postsFromFirestore();
  }, [currentUser]);

  const handleLoadMore = async () => {
    // setPostsPerLoad(prev => prev + 2);
    // await getUserInfoByEmail(user.email).then(res => {
    //   let combinedPosts = res.socialPost;
    //   combinedPosts.sort(
    //     (a, b) =>
    //       new Date(a.uploadDate).getSeconds() -
    //       new Date(b.uploadDate).getSeconds(),
    //   );
    //   combinedPosts.forEach(post => {
    //     post.profilePhoto = res.profilePhoto;
    //     post.fullName = res.fullName;
    //     post.horoscope = res.horoscope;
    //   });
    //   setUserInfos(prev => [
    //     ...prev,
    //     ...combinedPosts.slice(postsPerLoad, postsPerLoad + 2),
    //   ]);
    // });
  };

  const handleDeletePost = async ({collectionId}) => {
    try {
      const docRef = doc(db, 'Posts', collectionId);

      deleteDoc(docRef);

      const updatedPosts = currentUserPosts.filter(
        post => post.collectionId !== collectionId,
      );

      // Güncellenmiş gönderileri ayarla
      setCurrentUserPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting posts:', error);
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
            ListFooterComponent={() =>
              postsPerLoad.length && (
                <ActivityIndicator size={'large'} color={'white'} />
              )
            }
          />
        )}
      </SafeAreaView>
    </Container>
  );
};

export default MyPosts;

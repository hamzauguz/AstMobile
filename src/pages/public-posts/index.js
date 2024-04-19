import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import {windowWidth} from '../../utils/helpers';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {
  getMoreUserInfosCollection,
  getUserInfosCollection,
} from '../../utils/utils';
import {useSelector} from 'react-redux';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {db} from '../../utils/firebase';

const PublicPosts = () => {
  const navigation = useNavigation();
  const [userInfos, setUserInfos] = useState(new Array());
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [currentPostLikes, setCurrentPostLikes] = useState([]);
  const {user} = useSelector(state => state.user);

  const [postsPerLoad, setPostsPerLoad] = useState(2);
  const [postLength, setPostLength] = useState(null);

  useEffect(() => {
    const userInfoFromFirestore = async () => {
      await getUserInfosCollection().then(res => {
        const users = res.objectsArray;
        let combinedPosts = [];
        users.forEach(user => {
          combinedPosts = combinedPosts
            .concat(user.socialPost)
            .slice(0, postsPerLoad);
        });

        combinedPosts.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

        combinedPosts.forEach(post => {
          const user = users.find(user => user.uid === post.uid);
          post.profilePhoto = user.profilePhoto;
          post.fullName = user.fullName;
          post.horoscope = user.horoscope;
        });

        setUserInfos([...combinedPosts]);
      });
    };
    userInfoFromFirestore();
  }, []);

  const handleLoadMore = async () => {
    setPostsPerLoad(prev => prev + 2);
    await getMoreUserInfosCollection().then(res => {
      const users = res.objectsArray;

      let combinedPosts = [];
      users.forEach(user => {
        combinedPosts = combinedPosts
          .concat(user.socialPost)
          .slice(postsPerLoad, postsPerLoad + 2);
      });

      combinedPosts.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

      combinedPosts.forEach(post => {
        const user = users.find(user => user.uid === post.uid);
        post.profilePhoto = user.profilePhoto;
        post.fullName = user.fullName;
        post.horoscope = user.horoscope;
      });

      setUserInfos(prev => [...prev, ...combinedPosts]);
    });
  };

  const handleLikePost = async ({collectionId, postId}) => {
    try {
      const docRef = doc(db, 'UserInfo', String(collectionId));
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userInfo = docSnap.data();
        const socialPostIndex = userInfo.socialPost.findIndex(
          post => post.id === postId,
        );

        if (socialPostIndex !== -1) {
          userInfo.socialPost[socialPostIndex].like++; // Beğeni sayısını 1 artırın
          await updateDoc(docRef, {socialPost: userInfo.socialPost});
        }
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const renderItem = ({item}) => {
    const currentLike = currentPostLikes[item?.id] ?? item.like;
    return (
      <Card style={styles.materialCardStyle}>
        <CardImage
          style={styles.materialCardImageStyle}
          source={{uri: item.imageURL}}
        />
        <CardTitle
          title={`${item.fullName}, ${item.horoscope}`}
          subtitle={item.description}
          style={styles.materialCardTitleStyle}
          subtitleStyle={styles.materialSubtitleStyle}
        />

        <CardAction
          style={styles.materialCardActionStyle}
          separator={true}
          inColumn={false}>
          <CardButton
            onPress={() => {
              setCurrentPostLikes(prev => ({
                ...prev,
                [item.id]: currentLike + 1,
              }));
              handleLikePost({
                collectionId: item.collectionId,
                postId: item.id,
              });
            }}
            title="Beğen"
            color="blue"
          />
          <Text style={{color: 'red', fontSize: 18, fontWeight: 'bold'}}>
            ({currentLike})
          </Text>
        </CardAction>
      </Card>
    );
  };

  return (
    <Container>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserPostTransaction')}
          activeOpacity={0.7}
          style={{
            width: windowWidth - 50,
            height: Platform.OS === 'ios' ? 50 : 50,
            position: 'absolute',
            bottom: 20,
            zIndex: 9,
            backgroundColor: '#b717d2',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: 'white',
            alignContent: 'center',
            alignSelf: 'center',
            borderRadius: 20,
          }}>
          <MaterialIcons name="add-box" color={'white'} size={40} />
        </TouchableOpacity>
        <FlatList
          data={userInfos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onEndReached={handleLoadMore}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.01}
          scrollEventThrottle={150}
          ListFooterComponent={() =>
            postLength !== postsPerLoad.length && (
              <ActivityIndicator size={'large'} color={'white'} />
            )
          }
        />
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
  materialCardStyle: {
    // backgroundColor: 'red',
    display: 'flex',
    flex: Platform.OS === 'ios' ? 0.63 : 0.7,
  },
  materialCardImageStyle: {minHeight: 300, maxHeight: 300},
  materialCardContent: {backgroundColor: 'blue'},
  materialCardTitleStyle: {
    // backgroundColor: 'blue',
    maxHeight: 200,
  },
  materialSubtitleStyle: {
    // backgroundColor: 'purple',
  },
  materialCardActionStyle: {
    maxHeight: 40,
    alignItems: 'center',
    display: 'flex',
  },
});

export default PublicPosts;

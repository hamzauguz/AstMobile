import {
  ActivityIndicator,
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/container';
import {Card, CardImage} from 'react-native-material-cards';
import {windowWidth} from '../../utils/helpers';
import Textarea from 'react-native-textarea';
import ImageCropPicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {doc, updateDoc} from 'firebase/firestore';
import {db} from '../../utils/firebase';
import CustomHeader from '../../components/custom-header';
import HeaderButton from '../../components/header-button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {getUserPostToCollection} from '../../utils/utils';

const EditMyPost = ({route}) => {
  const {collectionId} = route.params;
  console.log('collectionId: ', collectionId);
  const [selectedImage, setSelectedImage] = useState({
    path: '',
  });
  const [progressBar, setProgressBar] = useState(false);
  const [postImageURL, setPostImageURL] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [editPost, setEditPost] = useState(null);
  const [checkSelectPhoto, setCheckSelectPhoto] = useState(false);
  const {user} = useSelector(state => state.user);
  const navigation = useNavigation();
  const docRef = doc(db, 'Posts', String(collectionId));

  const reference = storage().ref(
    `userPostsImage/${
      Platform.OS === 'ios'
        ? `${selectedImage?.modificationDate}-${user?.uid}`
        : selectedImage?.modificationDate
    }-${user?.uid}`,
  );

  useEffect(() => {
    const userPost = async () => {
      getUserPostToCollection(collectionId).then(res => {
        setSelectedImage({path: res?.imageURL});
        setPostDescription(res?.description);
        setEditPost(res);
      });
    };
    userPost();
  }, [user]);
  console.log('image post url : ', postImageURL);
  useEffect(() => {
    if (postImageURL !== '') {
      const uploadImageFromFireStore = async () => {
        await updateDoc(docRef, {
          imageURL: postImageURL,
          description: postDescription,
        });

        Alert.alert('Bilgilendirme', 'Gönderi başarılı ile yüklendi.');
        navigation.navigate('MyPosts', {prev: 'PublicPosts'});
      };
      uploadImageFromFireStore();
    }
  }, [postImageURL]);

  const onPostUpload = async () => {
    if (checkSelectPhoto) {
      setProgressBar(true);
      const pathToFile = selectedImage?.path;
      await reference.putFile(pathToFile).then(res => {
        const encodedName = encodeURIComponent(
          Platform.OS === 'ios'
            ? res.metadata.name
            : `userPostsImage/${res.metadata.name}`,
        );
        setPostImageURL(
          `https://firebasestorage.googleapis.com/v0/b/${res.metadata.bucket}/o/${encodedName}?alt=media`,
        );

        setProgressBar(false);
      });
    } else {
      setProgressBar(true);

      await updateDoc(docRef, {
        description: postDescription,
      });
      navigation.navigate('MyPosts', {prev: 'PublicPosts'});
      setProgressBar(false);
    }
  };

  const choosePhotoFromLibrary = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      mediaType: 'photo',
      compressImageQuality: 1,
      compressImageMaxHeight: 1000,
    }).then(image => {
      setSelectedImage(image);
      setCheckSelectPhoto(true);
    });
  };
  console.log('selectedImage: ', selectedImage);
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
        iconTitle={'Gönderi Paylaşımı'}
      />
      <ScrollView style={{flexGrow: 1}}>
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <Card style={styles.materialCardStyle}>
            <TouchableOpacity
              onPress={choosePhotoFromLibrary}
              style={{backgroundColor: 'red', width: '100%', height: 300}}>
              <CardImage
                style={styles.materialCardImageStyle}
                source={{
                  uri: selectedImage?.path,
                }}
              />
            </TouchableOpacity>
            <Textarea
              placeholder={'Gönderi ile ilgili açıklama yaz...'}
              placeholderTextColor={'black'}
              style={styles.textAreaStyle}
              value={postDescription}
              onChangeText={text => setPostDescription(text)}
              defaultValue={postDescription}
              maxLength={250}
            />
          </Card>
          <LinearGradient
            colors={['#b717d2', '#ce25ab']}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0}}
            style={{
              borderRadius: 10,
              alignItems: 'center',
              alignSelf: 'center',
              width: windowWidth - 50,
            }}>
            <TouchableOpacity onPress={onPostUpload} style={styles.button}>
              {progressBar ? (
                <ActivityIndicator size={'large'} color={'white'} />
              ) : (
                <Text style={styles.saveInfoTextStyle}>Paylaş</Text>
              )}
            </TouchableOpacity>
          </LinearGradient>
        </SafeAreaView>
      </ScrollView>
    </Container>
  );
};

export default EditMyPost;

const styles = StyleSheet.create({
  materialCardStyle: {
    display: 'flex',
    flex: Platform.OS === 'ios' ? 0.6 : 0.7,
    width: windowWidth - 50,
    borderRadius: 10,
    marginTop: 20,
  },
  materialCardImageStyle: {
    minHeight: 300,
    maxHeight: 300,
  },
  materialCardContent: {backgroundColor: 'blue'},
  materialCardTitleStyle: {
    backgroundColor: 'blue',
    maxHeight: 200,
  },
  materialSubtitleStyle: {
    backgroundColor: 'purple',
  },
  materialCardActionStyle: {
    maxHeight: 40,
    alignItems: 'center',
    display: 'flex',
    backgroundColor: 'purple',
  },
  textAreaStyle: {
    width: windowWidth,
    flex: 1,
    padding: 10,
    color: 'black',
  },
  button: {
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  saveInfoTextStyle: {color: 'white', fontWeight: '600', fontSize: 18},
  headerContainerStyle: {
    marginTop: 50,
    left: 10,
  },
});

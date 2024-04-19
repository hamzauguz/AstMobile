import {
  ActivityIndicator,
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/container';
import {Card, CardImage} from 'react-native-material-cards';
import {windowHeight, windowWidth} from '../../utils/helpers';
import Textarea from 'react-native-textarea';
import ImageCropPicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {arrayUnion, doc, Timestamp, updateDoc} from 'firebase/firestore';
import {db} from '../../utils/firebase';
import CustomHeader from '../../components/custom-header';
import HeaderButton from '../../components/header-button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {getUserInfoByEmail} from '../../utils/utils';
import uuid from 'react-native-uuid';
import {firebase} from '@react-native-firebase/auth';

const UserPostTransaction = () => {
  const [selectedImage, setSelectedImage] = useState({
    path: '',
  });
  const [validateSelectPhoto, setValidateSelectPhoto] = useState(false);
  const [progressBar, setProgressBar] = useState(false);
  const [postImageURL, setPostImageURL] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const {user} = useSelector(state => state.user);
  const navigation = useNavigation();

  const reference = storage().ref(
    `userPostsImage/${
      Platform.OS === 'ios'
        ? `${selectedImage?.modificationDate}-${user?.uid}`
        : selectedImage?.modificationDate
    }-${user?.uid}`,
  );

  useEffect(() => {
    const userInfoFromFireStore = async () => {
      await getUserInfoByEmail(user.email).then(res => {
        setUserInfo(res);
      });
    };
    userInfoFromFireStore();
  }, [user]);

  useEffect(() => {
    if (postImageURL !== '') {
      const uploadImageFromFireStore = async () => {
        const docRef = await doc(db, 'UserInfo', String(userInfo.collectionId));
        await updateDoc(docRef, {
          socialPost: arrayUnion({
            id: uuid.v4(),
            imageURL: postImageURL,
            description: postDescription,
            like: 0,
            createdAt: new Date(),
            collectionId: userInfo.collectionId,
          }),
        });

        Alert.alert('Bilgilendirme', 'Gönderi başarılı ile yüklendi.');
        navigation.goBack();
      };
      uploadImageFromFireStore();
    }
  }, [postImageURL]);

  const onPostUpload = async () => {
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
  };

  const choosePhotoFromLibrary = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      mediaType: 'photo',
      compressImageQuality: 1,
      compressImageMaxHeight: 1000,
    }).then(image => {
      setValidateSelectPhoto(true);
      setSelectedImage(image);
    });
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
        iconTitle={'Gönderi Paylaşımı'}
      />
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
                uri:
                  selectedImage.path === ''
                    ? 'https://i.pinimg.com/736x/64/49/ce/6449ce4a9bb1d2eb23475cd849f16114.jpg'
                    : selectedImage.path,
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
    </Container>
  );
};

export default UserPostTransaction;

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

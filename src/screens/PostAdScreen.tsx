import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  I18nManager,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/AppNavigator';
import { styles } from '../styles/PostAdScreen.styles';

type PostAdScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'PostAd'
>;

const PostAdScreen: React.FC = () => {
  const navigation = useNavigation<PostAdScreenNavigationProp>();
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    if (!title || !description || !price) {
      Alert.alert(t('common.error'), t('postAd.errorRequired'));
      return;
    }

    // TODO: Implement ad submission logic
    Alert.alert(t('common.success'), t('postAd.successMessage'), [
      {
        text: t('common.ok'),
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.header,
          { flexDirection: isRTL ? 'row-reverse' : 'row' },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{t('common.back')}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('postAd.headerTitle')}</Text>
        <View style={styles.placeholder} />
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('postAd.titleRequired')}</Text>
            <TextInput
              style={[styles.input, { textAlign: isRTL ? 'right' : 'left' }]}
              placeholder={t('postAd.titlePlaceholder')}
              value={title}
              onChangeText={setTitle}
              maxLength={100}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('postAd.category')}</Text>
            <TextInput
              style={[styles.input, { textAlign: isRTL ? 'right' : 'left' }]}
              placeholder={t('postAd.categoryPlaceholder')}
              value={category}
              onChangeText={setCategory}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('postAd.descriptionRequired')}</Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                { textAlign: isRTL ? 'right' : 'left' },
              ]}
              placeholder={t('postAd.descriptionPlaceholder')}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('postAd.priceRequired')}</Text>
            <TextInput
              style={[styles.input, { textAlign: isRTL ? 'right' : 'left' }]}
              placeholder={t('postAd.pricePlaceholder')}
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>{t('postAd.submit')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostAdScreen;

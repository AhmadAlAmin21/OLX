import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  I18nManager,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/ScreenHeader.styles';

export interface ScreenHeaderProps {
  title: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  showBackButton?: boolean;
  onBackPress?: () => void;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  leftComponent,
  rightComponent,
  showBackButton = false,
  onBackPress,
  titleStyle,
  containerStyle,
}) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  const defaultBackButton = showBackButton ? (
    <TouchableOpacity onPress={handleBackPress}>
      <Text style={styles.backButton}>{t('common.back')}</Text>
    </TouchableOpacity>
  ) : null;

  const leftElement =
    leftComponent !== undefined ? leftComponent : defaultBackButton;
  const rightElement = rightComponent;
  const hasLeft = !!leftElement;
  const hasRight = !!rightElement;

  // Determine title alignment based on what elements exist
  const titleAlignment: 'left' | 'center' | 'right' =
    hasLeft && hasRight
      ? 'center'
      : hasRight
      ? 'left'
      : hasLeft
      ? 'right'
      : 'left';

  return (
    <View
      style={[
        styles.header,
        { flexDirection: isRTL ? 'row-reverse' : 'row' },
        containerStyle,
      ]}
    >
      {leftElement && <View style={styles.leftContainer}>{leftElement}</View>}

      {rightElement && isRTL && (
        <View style={styles.rightContainer}>{rightElement}</View>
      )}

      <View
        style={[
          styles.centerContainer,
          {
            alignItems:
              titleAlignment === 'center'
                ? 'center'
                : titleAlignment === 'right'
                ? 'flex-end'
                : 'flex-start',
          },
        ]}
      >
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </View>
      {rightElement && !isRTL ? (
        <View style={styles.rightContainer}>{rightElement}</View>
      ) : leftElement ? (
        <View style={styles.rightContainer} />
      ) : null}
    </View>
  );
};

export default ScreenHeader;

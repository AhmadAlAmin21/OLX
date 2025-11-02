import React, { useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
  I18nManager,
} from 'react-native';
import { styles } from '../styles/BottomSheet.styles';

export interface BottomSheetOption {
  code: string;
  label: string;
}

interface BottomSheetProps {
  visible: boolean;
  title: string;
  options: BottomSheetOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  title,
  options,
  selectedValue,
  onSelect,
  onClose,
}) => {
  const slideAnim = React.useRef(new Animated.Value(300)).current;
  const isRTL = I18nManager.isRTL;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 150,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleSelect = (value: string) => {
    onSelect(value);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
          onStartShouldSetResponder={() => true}
        >
          <View style={styles.bottomSheetHeader}>
            <Text style={styles.bottomSheetTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.bottomSheetClose}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.options}>
            {options.map(option => (
              <TouchableOpacity
                key={option.code}
                style={[
                  styles.option,
                  selectedValue === option.code && styles.optionSelected,
                  { flexDirection: isRTL ? 'row-reverse' : 'row' },
                ]}
                onPress={() => handleSelect(option.code)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedValue === option.code && styles.optionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
                {selectedValue === option.code && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

export default BottomSheet;

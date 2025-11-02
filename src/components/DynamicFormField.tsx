import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  I18nManager,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import BottomSheet, { BottomSheetOption } from './BottomSheet';
import { CategoryField } from '../services/categoriesService';

interface DynamicFormFieldProps {
  field: CategoryField;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}

const DynamicFormField: React.FC<DynamicFormFieldProps> = ({
  field,
  value,
  onChange,
  error,
}) => {
  const { i18n } = useTranslation();
  const isRTL = I18nManager.isRTL;
  const currentLanguage = i18n.language || 'en';

  const getLabel = () => {
    if (currentLanguage === 'ar' && field.label_l1) {
      return field.label_l1;
    }
    return field.label || field.name;
  };

  const getPlaceholder = () => {
    if (currentLanguage === 'ar' && field.placeholder_l1) {
      return field.placeholder_l1;
    }
    return field.placeholder || '';
  };

  const [selectModalVisible, setSelectModalVisible] = useState(false);

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'string':
        return (
          <TextInput
            style={[
              styles.input,
              { textAlign: isRTL ? 'right' : 'left' },
              error && styles.inputError,
            ]}
            placeholder={getPlaceholder()}
            value={value || ''}
            onChangeText={onChange}
            maxLength={field.maxLength}
            placeholderTextColor="#999"
          />
        );

      case 'textarea':
        return (
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              { textAlign: isRTL ? 'right' : 'left' },
              error && styles.inputError,
            ]}
            placeholder={getPlaceholder()}
            value={value || ''}
            onChangeText={onChange}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            maxLength={field.maxLength}
            placeholderTextColor="#999"
          />
        );

      case 'number':
      case 'integer':
      case 'float':
        return (
          <TextInput
            style={[
              styles.input,
              { textAlign: isRTL ? 'right' : 'left' },
              error && styles.inputError,
            ]}
            placeholder={getPlaceholder()}
            value={value?.toString() || ''}
            onChangeText={text => {
              const numValue =
                field.type === 'integer'
                  ? parseInt(text, 10)
                  : parseFloat(text);
              onChange(isNaN(numValue) ? '' : numValue);
            }}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        );

      case 'select':
      case 'dropdown':
        const options: BottomSheetOption[] =
          field.choices?.map(choice => ({
            code: choice.value.toString(),
            label:
              currentLanguage === 'ar' && choice.label_l1
                ? choice.label_l1
                : choice.label || choice.value.toString(),
          })) || [];

        return (
          <>
            <TouchableOpacity
              style={[
                styles.input,
                styles.selectInput,
                { flexDirection: isRTL ? 'row-reverse' : 'row' },
                error && styles.inputError,
              ]}
              onPress={() => setSelectModalVisible(true)}
            >
              <Text
                style={[styles.selectText, !value && styles.selectPlaceholder]}
              >
                {value
                  ? options.find(opt => opt.code === value.toString())?.label ||
                    value
                  : getPlaceholder() || 'Select an option'}
              </Text>
              <Text style={styles.selectArrow}>›</Text>
            </TouchableOpacity>

            <BottomSheet
              visible={selectModalVisible}
              title={getLabel()}
              options={options}
              selectedValue={value?.toString()}
              onSelect={val => {
                onChange(val);
                setSelectModalVisible(false);
              }}
              onClose={() => setSelectModalVisible(false)}
            />
          </>
        );

      case 'multiselect':
      case 'checkbox':
        // For simplicity, treating multiselect as a single select for now
        // Can be enhanced later
        const multiOptions: BottomSheetOption[] =
          field.choices?.map(choice => ({
            code: choice.value.toString(),
            label:
              currentLanguage === 'ar' && choice.label_l1
                ? choice.label_l1
                : choice.label || choice.value.toString(),
          })) || [];

        return (
          <>
            <TouchableOpacity
              style={[
                styles.input,
                styles.selectInput,
                { flexDirection: isRTL ? 'row-reverse' : 'row' },
                error && styles.inputError,
              ]}
              onPress={() => setSelectModalVisible(true)}
            >
              <Text
                style={[styles.selectText, !value && styles.selectPlaceholder]}
              >
                {value
                  ? multiOptions.find(opt => opt.code === value.toString())
                      ?.label || value
                  : getPlaceholder() || 'Select an option'}
              </Text>
              <Text style={styles.selectArrow}>›</Text>
            </TouchableOpacity>

            <BottomSheet
              visible={selectModalVisible}
              title={getLabel()}
              options={multiOptions}
              selectedValue={value?.toString()}
              onSelect={val => {
                onChange(val);
                setSelectModalVisible(false);
              }}
              onClose={() => setSelectModalVisible(false)}
            />
          </>
        );

      default:
        // Default to text input
        return (
          <TextInput
            style={[
              styles.input,
              { textAlign: isRTL ? 'right' : 'left' },
              error && styles.inputError,
            ]}
            placeholder={getPlaceholder()}
            value={value?.toString() || ''}
            onChangeText={onChange}
            placeholderTextColor="#999"
          />
        );
    }
  };

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>
        {getLabel()}
        {field.required && <Text style={styles.required}> *</Text>}
      </Text>
      {renderField()}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: '#ff3b30',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  textArea: {
    height: 120,
    paddingTop: 12,
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  selectPlaceholder: {
    color: '#999',
  },
  selectArrow: {
    fontSize: 20,
    color: '#666',
    marginLeft: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#ff3b30',
    marginTop: 4,
  },
});

export default DynamicFormField;

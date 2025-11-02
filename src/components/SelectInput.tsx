import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { I18nManager } from 'react-native';

interface SelectInputProps {
  label: string;
  value?: string;
  placeholder: string;
  required?: boolean;
  onPress: () => void;
  error?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  placeholder,
  required = false,
  onPress,
  error,
}) => {
  const isRTL = I18nManager.isRTL;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <TouchableOpacity
        style={[
          styles.input,
          styles.selectInput,
          { flexDirection: isRTL ? 'row-reverse' : 'row' },
          error && styles.inputError,
        ]}
        onPress={onPress}
      >
        <Text style={[styles.selectText, !value && styles.selectPlaceholder]}>
          {value || placeholder}
        </Text>
        <Text style={styles.selectArrow}>›</Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default SelectInput;

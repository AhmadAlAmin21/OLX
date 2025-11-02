import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SectionHeaderProps {
  title: string;
  isFirst?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  isFirst = false,
}) => {
  return (
    <View style={[styles.sectionHeader, isFirst && styles.firstSectionHeader]}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    marginTop: 24,
    marginBottom: 12,
    paddingBottom: 8,
  },
  firstSectionHeader: {
    marginTop: 0,
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
  },
});

export default SectionHeader;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SectionHeaderProps {
  title: string;
  isFirst?: boolean;
  rightComponent?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  isFirst = false,
  rightComponent,
}) => {
  return (
    <View style={[styles.sectionHeader, isFirst && styles.firstSectionHeader]}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
      {rightComponent && (
        <View style={styles.rightComponent}>{rightComponent}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    marginTop: 24,
    marginBottom: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  firstSectionHeader: {
    marginTop: 0,
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    flex: 1,
  },
  rightComponent: {
    marginLeft: 8,
  },
});

export default SectionHeader;

import { StyleSheet } from 'react-native';
import { globalStyles } from './globalStyles';

export const styles = StyleSheet.create({
  container: globalStyles.container,
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    paddingHorizontal: 16,
    paddingVertical: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  settingValue: {
    fontSize: 16,
    color: '#666',
  },
  arrow: {
    fontSize: 24,
    color: '#999',
  },
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
  },
  languageOptionSelected: {
    backgroundColor: '#e3f2fd',
  },
  languageOptionText: {
    fontSize: 16,
    color: '#333',
  },
  languageOptionTextSelected: {
    color: '#1976d2',
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 18,
    color: '#1976d2',
    fontWeight: 'bold',
  },
});

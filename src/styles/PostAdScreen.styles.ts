import { StyleSheet } from 'react-native';
import { globalStyles } from './globalStyles';

export const styles = StyleSheet.create({
  container: globalStyles.container,
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
});

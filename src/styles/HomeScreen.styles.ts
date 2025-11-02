import { StyleSheet } from 'react-native';
import { globalStyles } from './globalStyles';

export const styles = StyleSheet.create({
  container: globalStyles.container,
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  postButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'left',
  },
  placeholder: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  centerContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  errorContainer: {
    padding: 20,
    backgroundColor: '#fee',
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    color: '#c33',
    textAlign: 'center',
  },
  categoryContainer: {
    marginBottom: 12,
  },
  categoryItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  parentCategoryItem: {
    backgroundColor: '#f8f9fa',
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  subCategoryItem: {
    backgroundColor: '#f8f9fa',
    marginLeft: 16,
    padding: 12,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  subCategoryName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },
  categorySlug: {
    fontSize: 12,
    color: '#007bff',
    fontFamily: 'monospace',
  },
  childrenCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
  childrenContainer: {
    marginTop: 4,
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  firstSectionHeader: {
    marginTop: 0,
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  compactCategoryItem: {
    flex: 1,
    minWidth: '45%',
    maxWidth: '48%',
    marginHorizontal: 6,
    marginBottom: 12,
    padding: 12,
  },
  compactCategoryName: {
    fontSize: 14,
    fontWeight: '500',
  },
  compactCategorySlug: {
    fontSize: 11,
  },
  moreInSection: {
    marginTop: 8,
  },
});

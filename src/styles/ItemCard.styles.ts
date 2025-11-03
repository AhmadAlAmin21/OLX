import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: 260,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 12,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 18,
  },
  content: {
    padding: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
    lineHeight: 20,
  },
  details: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  location: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  postedAgo: {
    fontSize: 12,
    color: '#999',
  },
});

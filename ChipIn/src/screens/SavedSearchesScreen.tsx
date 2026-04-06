import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSearchStore } from '../store/searchStore';

export default function SavedSearchesScreen() {
  const { searches, removeSearch } = useSearchStore();

  const handleDelete = (id: string) => {
    Alert.alert('Delete Search', 'Are you sure you want to delete this search?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => removeSearch(id) },
    ]);
  };

  if (searches.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No Saved Searches</Text>
        <Text style={styles.emptyText}>Go to Search tab to create your first keyword alert</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Saved Searches</Text>
      <FlatList
        data={searches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.searchCard}>
            <View style={styles.searchInfo}>
              <Text style={styles.keyword}>{item.keyword}</Text>
              <Text style={styles.date}>Created {item.createdAt.toLocaleDateString()}</Text>
              <Text style={styles.resultCount}>
                {item.results?.length || 0} posts found
              </Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#0077B5',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  searchCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInfo: {
    flex: 1,
  },
  keyword: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  resultCount: {
    fontSize: 14,
    color: '#0077B5',
    marginTop: 4,
  },
  deleteButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#fee2e2',
  },
  deleteText: {
    color: '#dc2626',
    fontWeight: '500',
  },
});

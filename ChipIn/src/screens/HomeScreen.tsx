import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useSearchStore } from '../store/searchStore';

export default function HomeScreen() {
  const [keyword, setKeyword] = useState('');
  const { addSearch, currentResults } = useSearchStore();

  const handleSearch = () => {
    if (keyword.trim()) {
      addSearch(keyword.trim());
      setKeyword('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Conversations</Text>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter keyword (e.g., AI, startup, React)"
          value={keyword}
          onChangeText={setKeyword}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {currentResults.length > 0 && (
        <FlatList
          data={currentResults}
          keyExtractor={(item) => item.id}
          style={styles.resultsList}
          renderItem={({ item }) => (
            <View style={styles.resultCard}>
              <Text style={styles.author}>{item.author}</Text>
              {item.authorTitle && <Text style={styles.authorTitle}>{item.authorTitle}</Text>}
              <Text style={styles.postText}>{item.text}</Text>
              <Text style={styles.date}>{item.postedAt.toLocaleDateString()}</Text>
            </View>
          )}
        />
      )}
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
  searchContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  searchButton: {
    backgroundColor: '#0077B5',
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  resultsList: {
    flex: 1,
  },
  resultCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  author: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
  authorTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  postText: {
    fontSize: 15,
    color: '#444',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});

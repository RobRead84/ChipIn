import { create } from 'zustand';
import { SavedSearch, LinkedInPost, SearchState } from '../types';

const generateId = () => Math.random().toString(36).substring(2, 15);

const MOCK_POSTS: LinkedInPost[] = [
  {
    id: '1',
    text: 'Exciting news about AI in the workplace! #AI #FutureOfWork',
    author: 'John Smith',
    authorTitle: 'Tech Lead at Example Corp',
    postedAt: new Date('2026-04-05'),
    url: 'https://linkedin.com/posts/example1',
  },
  {
    id: '2',
    text: 'Looking for feedback on our new product launch strategy.',
    author: 'Jane Doe',
    authorTitle: 'Product Manager',
    postedAt: new Date('2026-04-04'),
    url: 'https://linkedin.com/posts/example2',
  },
];

export const useSearchStore = create<SearchState>((set) => ({
  searches: [],
  currentResults: [],
  isSearching: false,
  addSearch: (keyword: string) => {
    const newSearch: SavedSearch = {
      id: generateId(),
      keyword,
      createdAt: new Date(),
      results: MOCK_POSTS,
    };
    set((state) => ({ searches: [...state.searches, newSearch] }));
  },
  removeSearch: (id: string) => {
    set((state) => ({
      searches: state.searches.filter((s) => s.id !== id),
    }));
  },
  setCurrentResults: (results: LinkedInPost[]) => set({ currentResults: results }),
  setSearching: (searching: boolean) => set({ isSearching: searching }),
}));

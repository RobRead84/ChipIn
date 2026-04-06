export interface LinkedInUser {
  sub: string;
  email: string;
  name: string;
  picture?: string;
}

export interface SavedSearch {
  id: string;
  keyword: string;
  createdAt: Date;
  results?: LinkedInPost[];
}

export interface LinkedInPost {
  id: string;
  text: string;
  author: string;
  authorTitle?: string;
  postedAt: Date;
  url: string;
}

export interface AuthState {
  user: LinkedInUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: LinkedInUser) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export interface SearchState {
  searches: SavedSearch[];
  currentResults: LinkedInPost[];
  isSearching: boolean;
  addSearch: (keyword: string) => void;
  removeSearch: (id: string) => void;
  setCurrentResults: (results: LinkedInPost[]) => void;
  setSearching: (searching: boolean) => void;
}

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  SavedSearches: undefined;
  Profile: undefined;
};

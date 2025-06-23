import '@testing-library/jest-native/extend-expect'

// Mock the expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
}))

// Mock the expo-vector-icons
jest.mock('@expo/vector-icons', () => ({
  Feather: 'Feather',
}))

// Mock the native modules
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

// Mock the native modules that might be used
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter')

// Mock the native modules that might be used
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: jest.fn(),
}))

// Mock the native modules that might be used
jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn().mockReturnValue({ width: 375, height: 812 }),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}))

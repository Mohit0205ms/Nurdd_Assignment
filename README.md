# Nurdd - Social Posts App

A modern React Native/Expo app for creating, viewing, and managing social posts with image uploads and authentication.

## 🚀 Features

### Core Features
- **User Authentication** - Login/Signup with Clerk authentication
- **Post Management** - Create, edit, view, and delete posts
- **Image Uploads** - Add images to posts using device gallery
- **Favorites** - Mark posts as favorites
- **Search & Filter** - Search posts by title/content
- **Pull-to-Refresh** - Refresh posts list
- **Offline Support** - Local caching of posts

### UI/UX Features
- **Dark Theme** - Modern dark theme throughout the app
- **Responsive Design** - Optimized for both iOS and Android
- **Keyboard Handling** - Proper keyboard avoidance and dismissal
- **Loading States** - Loading indicators for all async operations
- **Error Handling** - Comprehensive error handling with user feedback

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Authentication**: Clerk
- **State Management**: React Context
- **API**: JSONPlaceholder (demo) + Axios
- **Storage**: AsyncStorage for local caching
- **Navigation**: Expo Router
- **Styling**: React Native StyleSheet

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nurdd
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install Expo CLI** (if not already installed)
   ```bash
   npm install -g @expo/cli
   ```

4. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Add your Clerk publishable key:
     ```
     EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
     ```

5. **Start the development server**
   ```bash
   npx expo start
   ```

## 📱 Usage

### Authentication
- **Login**: Enter email/password to sign in
- **Signup**: Create new account with email verification
- **Logout**: Use the logout button in the header

### Posts Management
- **View Posts**: Browse all posts in the home screen
- **Create Post**: Tap the "+" button to create new posts
- **Edit Posts**: Tap any post to view details, then use "Edit" button
- **Favorite Posts**: Use the heart icon to favorite/unfavorite posts
- **Search**: Use the search bar to filter posts by title

### Navigation
- **Home**: View all posts with search functionality
- **Create/Edit**: Add or modify posts with image uploads
- **Post Details**: View full post content with images

## 🏗️ Project Structure

```
nurdd/
├── app/                    # Expo Router pages
│   ├── index.tsx          # Login screen
│   ├── signUp.tsx         # Signup screen
│   ├── home/
│   │   ├── index.tsx      # Posts list
│   │   └── [id].tsx       # Post details
│   ├── create/
│   │   └── index.tsx      # Create/Edit post
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── Button.tsx         # Custom button component
│   ├── Card.tsx           # Post card component
│   ├── Header.tsx         # App header
│   └── Input.tsx          # Custom input component
├── context/               # React Context providers
│   ├── AuthContext.tsx    # Authentication context
│   └── PostsContext.tsx   # Posts state management
├── hooks/                 # Custom hooks
│   └── usePosts.ts        # Posts operations hook
├── services/              # API services
│   ├── api.ts            # Axios configuration
│   ├── auth.ts           # Authentication API
│   └── posts.ts          # Posts API
├── types/                 # TypeScript type definitions
│   └── post.ts           # Post type definitions
├── utils/                 # Utility functions
│   └── storage.ts        # Local storage helpers
└── constants/             # App constants
    └── Colors.ts         # Color definitions
```

## 🔧 Configuration

### Clerk Authentication
1. Create a Clerk application at [clerk.com](https://clerk.com)
2. Copy your publishable key to `.env`
3. Configure sign-in/sign-up methods in Clerk dashboard

### Permissions
The app requires the following permissions:
- **Photo Library**: For image uploads (iOS/Android)

## 📋 API Endpoints

The app uses JSONPlaceholder for demo purposes:
- `GET /posts` - Fetch all posts
- `GET /posts/:id` - Fetch single post
- `POST /posts` - Create new post
- `PUT /posts/:id` - Update existing post

## 🎨 Customization

### Themes & Colors
- Edit `constants/Colors.ts` for color scheme changes
- Modify component styles for UI customization

### API Integration
- Replace JSONPlaceholder URLs in `services/` with your real API
- Update authentication logic for production auth service

## 🚀 Deployment

### Build for Production
```bash
# Build for iOS
npx expo build:ios

# Build for Android
npx expo build:android

# Build for web (if needed)
npx expo build:web
```

### Environment Variables
Make sure to set production environment variables:
- `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`
- Any other production API keys

## 🐛 Troubleshooting

### Common Issues

**Image Upload Not Working**
- Ensure `expo-image-picker` is installed
- Check photo library permissions in device settings
- Verify Expo app has necessary permissions

**Authentication Issues**
- Verify Clerk publishable key is correct
- Check internet connection for authentication
- Clear app data/cache if issues persist

**Posts Not Loading**
- Check internet connection
- Verify JSONPlaceholder API is accessible
- Check console for API errors

**Build Issues**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Expo cache: `npx expo start -c`
- Update Expo CLI: `npm install -g @expo/cli`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section above
- Review Expo/React Native documentation

---

## Demo
<img src="https://github.com/user-attachments/assets/a764dd4c-c21b-4ea2-bc6c-d1e8d4844a24" width="300" height="400"/>

<img src="https://github.com/user-attachments/assets/383a85b4-791a-4ca6-99f9-308e4fc1f46b" width="300" height="400"/>

<img src="https://github.com/user-attachments/assets/8a6eda3c-4a85-4008-909b-7cb2f8b5ff2a" width="300" height="400"/>

<img src="https://github.com/user-attachments/assets/223933e9-75f4-4e74-abe5-6246f1482bc6" width="300" height="400"/>


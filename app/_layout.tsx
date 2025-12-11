import React from "react";
import { Stack } from "expo-router";
// import { AuthProvide.r } from "../context/AuthContext";
import { PostsProvider } from "../context/PostsContext";
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';

export default function Layout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <PostsProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </PostsProvider>
    </ClerkProvider>
  );
}

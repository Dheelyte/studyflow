"use client";
import { CommunityProvider } from "@/components/CommunityContext";

export default function CommunityLayout({ children }) {
  return (
    <CommunityProvider>
        {children}
    </CommunityProvider>
  );
}

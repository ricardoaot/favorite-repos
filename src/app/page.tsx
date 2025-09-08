"use client";
import RepositoryList from "@/features/favoritesRepos/components/RepositoryList";
import { useState } from "react";


export default function Home() {
  const [query, setQuery] = useState<string>("")

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Favorite Repos</h1>
      <label>
        Query : 
      </label>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type a repo name ..."
      />
      <RepositoryList query={query} />
    </main>
  );
}
"use client"

import { useState } from "react"
import { Heart } from "lucide-react"

export default function FavRepoToggle(
  {
    repoId,
    isFavorite,
    refetchFavoriteRepos
  }:
    {
      repoId: string,
      isFavorite: boolean,
      refetchFavoriteRepos: () => void
    }
) {
  const [liked, setLiked] = useState(isFavorite)

  const handleClick = async () => {
    const newState = !liked
    setLiked(newState)

    try {
      let response = null
      if (newState) {
        response = await fetch("/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ repoId }),
        })
      } else {
        response = await fetch("/api/favorites/" + repoId, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
      }
      console.log('refetchFavoriteRepos', refetchFavoriteRepos)
      refetchFavoriteRepos()

      if (!response.ok) {
        throw new Error("Error en la petición")
      }
    } catch (error) {
      console.error(error)

      setLiked(!newState)
    }
  }

  return (
    <button onClick={handleClick} className="p-2">
      <Heart
        size={28}
        className={liked ? "fill-red-500 text-red-500" : "text-gray-500"}
      />
    </button>
  )
}
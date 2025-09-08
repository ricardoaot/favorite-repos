import { useQuery } from '@tanstack/react-query'
import { fetchFavoriteRepos } from '../services/repositoryService'
import { FavoriteRepo } from '../types'

export function useFavoriteRepos() {
    return useQuery<FavoriteRepo[]>({
        queryKey: ['favoriteRepos'],
        queryFn: fetchFavoriteRepos,
        staleTime: 1000 * 60, // 1 min
    })
}
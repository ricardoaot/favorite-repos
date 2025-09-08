import { useQuery } from '@tanstack/react-query'
import { fetchGithubRepos } from '../services/repositoryService'
import { GithubReposResponse } from '../types';

export function useGithubRepos(query: string, page: number) {
    return useQuery<GithubReposResponse>({
        queryKey: ['githubRepos', query, page],
        queryFn: () => fetchGithubRepos(query, page),
        staleTime: 1000 * 60,   // 1 minute
    })
}
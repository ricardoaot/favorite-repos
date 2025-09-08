export type GithubRepo = {
    id: string,
    name: string,
    description: string,
    url: string,
    stars: string
    language: string
}

export type EnrichedRepo = {
    id: string,
    name: string,
    notes: string,
    isFavorite: boolean
}

export type FavoriteRepo = {
    id: string,
    repoId: string,
    notes: string,
    createdAt: string
}

export type Pagination = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type GithubReposResponse = {
    data: GithubRepo[];
    pagination: Pagination;
}
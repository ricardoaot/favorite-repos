export async function fetchGithubRepos(query: string, page: number) {
    const res = await fetch(`/api/github?q=${query}&page=${page.toString()}`);
    const jsonResponse = await res.json();
    return jsonResponse;
}

export async function fetchFavoriteRepos() {
    const res = await fetch('/api/favorites');
    const jsonResponse = await res.json();
    return jsonResponse.data;
}
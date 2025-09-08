'use client'

import { useMemo, useState } from "react"
import FavRepoToggle from "../FavRepoToggle"
import { useGithubRepos } from '../../hooks/useGithubRepos'
import { useFavoriteRepos } from '../../hooks/useFavoriteRepos'

import {
    Pagination,
    EnrichedRepo,
    FavoriteRepo,
    GithubRepo
} from '../../types'

const RepositoryList = ({ query }: { query: string }) => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState("");
    const [page, setPage] = useState(1);
    const [repos, setRepos] = useState<EnrichedRepo[]>([])

    const { data: githubRepos, isLoading, error } = useGithubRepos(query, page)
    const { data: favoriteRepos = [], isLoading: favLoading, error: favError, refetch: refetchFavoriteRepos } = useFavoriteRepos()

    const enrichedRepos: EnrichedRepo[] = useMemo(() => {
        if (!githubRepos) return [];

        const favoriteMap = new Map(
            favoriteRepos.map((repo) => [repo.repoId, repo])
        );
        return githubRepos.data?.map((repo: GithubRepo) => {
            const favoriteRepo = favoriteMap.get(repo.id.toString());
            return {
                id: repo.id,
                name: repo.name,
                notes: favoriteRepo?.notes ?? "",
                isFavorite: !!favoriteRepo
            }
        });
    }, [githubRepos, favoriteRepos]);

    const pagination = githubRepos?.pagination;

    // update item
    const updateRepo = async () => {
        if (!editingId) return;
        const res = await fetch(`/api/favorites/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ notes: editingName }),
        });

        const updated = await res.json();

        setRepos((prev) =>
            prev.map(
                (repo) => {
                    if (repo.id === editingId) {
                        return {
                            ...repo,
                            notes: updated.notes
                        }
                    }
                    return repo

                }
            )
        );
        refetchFavoriteRepos()

        setEditingId(null);
        setEditingName("");
    };


    return (
        <>

            <h3> You can add a note in a Repo only if set as favorite </h3>

            <ul className="mb-4">
                {isLoading && <li>Loading...</li>}
                {error && <li>Error loading repos</li>}
                {enrichedRepos?.map((repo) => (
                    <li key={repo.id} className="border p-2 mb-2 flex justify-between">

                        {editingId === repo.id ? (
                            <>
                                {/*Edit block*/}
                                <span>{repo.name}</span>
                                <div className="flex gap-2">
                                    <input
                                        className="border p-2"
                                        value={editingName}
                                        onChange={(e) => setEditingName(e.target.value)}
                                    />
                                    <button
                                        onClick={updateRepo}
                                        className="bg-green-600 text-white px-2 rounded"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="bg-gray-400 text-white px-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                {/*Grid block*/}
                                <span>{repo.name}</span>
                                <span>{repo.notes}</span>
                                <div className="flex gap-2">
                                    {repo.isFavorite && <button
                                        onClick={() => {
                                            setEditingId(repo.id);
                                            setEditingName(repo.notes);
                                        }}
                                        className="bg-yellow-500 text-white px-2 rounded"
                                    >
                                        Note
                                    </button>
                                    }
                                    <FavRepoToggle repoId={repo.id} isFavorite={repo.isFavorite} refetchFavoriteRepos={refetchFavoriteRepos} />
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            {pagination && (
                <div className="flex gap-4 items-center mb-4">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span>
                        Page {page} of {pagination.totalPages}
                    </span>
                    <button
                        disabled={page === pagination.totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </>
    )
}

export default RepositoryList
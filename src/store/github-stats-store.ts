import { atom } from 'nanostores';
import type { GithubStats } from '../utils/github-stats';

export const githubStats = atom<GithubStats | null>(null);
export const isLoadingGithubStats = atom(false);
export const githubStatsError = atom<string | null>(null);

export const fetchGithubStatsInBackground = async () => {
  if (isLoadingGithubStats.get()) {
    return; // Already fetching
  }

  isLoadingGithubStats.set(true);
  githubStatsError.set(null);

  try {
    const response = await fetch('/api/github-stats');
    if (response.ok) {
      const stats = await response.json();
      githubStats.set(stats);
    } else {
      githubStatsError.set('Failed to fetch GitHub stats');
      githubStats.set({
        totalCommits: 0,
        lastCommit: null,
      });
    }
  } catch (error) {
    githubStatsError.set('Error loading GitHub stats');
    githubStats.set({
      totalCommits: 0,
      lastCommit: null,
    });
  } finally {
    isLoadingGithubStats.set(false);
  }
};


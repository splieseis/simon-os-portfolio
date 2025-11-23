export interface GithubStats {
  totalCommits: number;
  lastCommit: {
    repoName: string;
    repoUrl: string;
    message: string;
    committedDate: string;
    abbreviatedOid: string;
    timeAgo: string;
  } | null;
}

function getTimeAgo(dateString: string): string {
  const now = new Date();
  const commitDate = new Date(dateString);
  const diffInMs = now.getTime() - commitDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'MINUTE' : 'MINUTES'} AGO`;
  } else if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'HOUR' : 'HOURS'} AGO`;
  } else if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? 'DAY' : 'DAYS'} AGO`;
  } else {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} ${weeks === 1 ? 'WEEK' : 'WEEKS'} AGO`;
  }
}

export async function fetchGithubStats(): Promise<GithubStats> {
  const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN;

  const defaultStats: GithubStats = {
    totalCommits: 0,
    lastCommit: null,
  };

  if (!GITHUB_TOKEN) {
    return defaultStats;
  }

  try {
    const accountQuery = `
      query {
        viewer {
          login
          createdAt
          repositories(first: 1, orderBy: {field: PUSHED_AT, direction: DESC}, ownerAffiliations: OWNER) {
            nodes {
              name
              url
              pushedAt
              defaultBranchRef {
                target {
                  ... on Commit {
                    message
                    committedDate
                    abbreviatedOid
                  }
                }
              }
            }
          }
        }
      }
    `;

    const accountResponse = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({ query: accountQuery }),
    });

    if (!accountResponse.ok) {
      return defaultStats;
    }

    const accountJson = await accountResponse.json();
    if (accountJson.errors || !accountJson.data?.viewer) {
      return defaultStats;
    }

    const accountData = accountJson.data.viewer;
    const accountCreatedAt = new Date(accountData.createdAt);
    const now = new Date();
    
    let totalCommits = 0;
    const query = `
      query($from: DateTime!, $to: DateTime!) {
        viewer {
          contributionsCollection(from: $from, to: $to) {
            totalCommitContributions
            restrictedContributionsCount
          }
        }
      }
    `;

    const startYear = accountCreatedAt.getFullYear();
    const endYear = now.getFullYear();
    const totalYearsAvailable = endYear - startYear + 1;
    
    // Limit years to query (default: 10, configurable via env)
    // This prevents excessive API calls for very old accounts
    const maxYears = parseInt(import.meta.env.GITHUB_STATS_MAX_YEARS || '10', 10);
    const totalYears = Math.min(totalYearsAvailable, maxYears);

    for (let i = 0; i < totalYears; i++) {
      const queryYear = endYear - i;
      let yearEnd = new Date(queryYear, 11, 31, 23, 59, 59);
      let yearStart = new Date(queryYear, 0, 1, 0, 0, 0);
      
      if (queryYear === endYear) {
        yearEnd = now;
      }
      
      if (queryYear === startYear) {
        yearStart = accountCreatedAt;
      }
      
      if (yearStart >= yearEnd) {
        continue;
      }

      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
        body: JSON.stringify({ 
          query,
          variables: {
            from: yearStart.toISOString(),
            to: yearEnd.toISOString()
          }
        }),
      });

      if (!response.ok) {
        continue;
      }

      const json = await response.json();

      if (json.errors || !json.data?.viewer?.contributionsCollection) {
        continue;
      }

      const yearData = json.data.viewer.contributionsCollection;
      totalCommits += (yearData.totalCommitContributions || 0) + (yearData.restrictedContributionsCount || 0);
    }

    const lastRepo = accountData.repositories?.nodes?.[0];
    const lastCommit = lastRepo?.defaultBranchRef?.target;

    return {
      totalCommits,
      lastCommit: lastCommit ? {
        repoName: lastRepo.name,
        repoUrl: lastRepo.url,
        message: (lastCommit.message || '').split('\n')[0].trim(),
        committedDate: lastCommit.committedDate,
        abbreviatedOid: lastCommit.abbreviatedOid,
        timeAgo: getTimeAgo(lastCommit.committedDate),
      } : null,
    };
  } catch (error) {
    return defaultStats;
  }
}


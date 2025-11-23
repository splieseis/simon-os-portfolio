import type { APIRoute } from 'astro';
import { fetchGithubStats } from '../../utils/github-stats';

export const GET: APIRoute = async () => {
  try {
    const stats = await fetchGithubStats();
    
    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=900, s-maxage=900',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        totalCommits: 0,
        lastCommit: null,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};


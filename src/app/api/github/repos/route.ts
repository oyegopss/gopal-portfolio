import { NextRequest, NextResponse } from 'next/server'

const GITHUB_REST = 'https://api.github.com'

interface RawGitHubRepo {
  id: number
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  html_url: string
  updated_at: string
  fork?: boolean
}

export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  html_url: string
  updated_at: string
}

export interface GitHubReposResponse {
  repos: GitHubRepo[]
  error?: string
}

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get('username') || 'oyegopss'
  const token = process.env.GITHUB_TOKEN

  try {
    const res = await fetch(
      `${GITHUB_REST}/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        // Next may cache by default; allow revalidation
        cache: 'no-store',
      },
    )

    if (!res.ok) {
      const msg = `GitHub API error (${res.status})`
      return NextResponse.json({ error: msg }, { status: res.status })
    }

    const repos: RawGitHubRepo[] = await res.json()

    const cleaned = repos
      .filter((r) => !r.fork) // skip forks
      .map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        language: r.language,
        stargazers_count: r.stargazers_count,
        forks_count: r.forks_count,
        html_url: r.html_url,
        updated_at: r.updated_at,
      }))

    const payload: GitHubReposResponse = {
      repos: cleaned,
    }

    return NextResponse.json(payload)
  } catch (e) {
    console.error('GitHub repos API error:', e)
    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : 'Failed to fetch GitHub repositories',
      },
      { status: 500 },
    )
  }
}


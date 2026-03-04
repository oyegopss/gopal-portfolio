import { NextRequest, NextResponse } from 'next/server'

const GITHUB_GRAPHQL = 'https://api.github.com/graphql'
const GITHUB_REST = 'https://api.github.com'

export interface GitHubActivityResponse {
  totalContributions: number
  publicRepos: number
  starsReceived: number
  weeks: { contributionDays: { date: string; contributionCount: number }[] }[]
  error?: string
}

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get('username') || 'oyegopss'

  const token = process.env.GITHUB_TOKEN // optional, for higher rate limit

  const toDate = new Date()
  const fromDate = new Date(toDate)
  fromDate.setFullYear(fromDate.getFullYear() - 1)

  const fromStr = fromDate.toISOString().slice(0, 10)
  const toStr = toDate.toISOString().slice(0, 10)

  const graphqlQuery = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `

  try {
    const [graphqlRes, userRes] = await Promise.all([
      fetch(GITHUB_GRAPHQL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          query: graphqlQuery,
          variables: {
            login: username,
            from: fromDate.toISOString(),
            to: toDate.toISOString(),
          },
        }),
      }),
      fetch(`${GITHUB_REST}/users/${username}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }),
    ])

    const graphqlData = await graphqlRes.json()
    const userData = userRes.ok ? await userRes.json() : null

    if (graphqlData.errors) {
      return NextResponse.json(
        { error: graphqlData.errors[0]?.message || 'GraphQL error' },
        { status: 400 },
      )
    }

    const user = graphqlData.data?.user
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 },
      )
    }

    const calendar = user.contributionsCollection?.contributionCalendar
    const weeks = calendar?.weeks ?? []

    let starsReceived = 0
    if (userData?.public_repos) {
      const reposRes = await fetch(
        `${GITHUB_REST}/users/${username}/repos?per_page=100&sort=updated`,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} },
      )
      if (reposRes.ok) {
        const repos = await reposRes.json()
        starsReceived = repos.reduce((sum: number, r: { stargazers_count: number }) => sum + (r.stargazers_count || 0), 0)
      }
    }

    const payload: GitHubActivityResponse = {
      totalContributions: calendar?.totalContributions ?? 0,
      publicRepos: userData?.public_repos ?? 0,
      starsReceived,
      weeks,
    }

    return NextResponse.json(payload)
  } catch (e) {
    console.error('GitHub activity API error:', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to fetch GitHub data' },
      { status: 500 },
    )
  }
}

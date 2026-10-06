export type ContributionLevel =
  | 'NONE'
  | 'FIRST_QUARTILE'
  | 'SECOND_QUARTILE'
  | 'THIRD_QUARTILE'
  | 'FOURTH_QUARTILE';

export interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: ContributionLevel;
  weekday: number; // 0 = domingo
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: { contributionDays: ContributionDay[] }[];
}

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays { date contributionCount contributionLevel weekday }
          }
        }
      }
    }
  }
`;

/**
 * Obtiene el calendario de contribuciones del último año en tiempo de build.
 * Devuelve null si no hay token o la petición falla, para que la sección simplemente no se muestre.
 */
export async function getContributions(login: string): Promise<ContributionCalendar | null> {
  const token = import.meta.env.GITHUB_TOKEN;
  if (!token) {
    console.warn('[github] GITHUB_TOKEN no está definido; se omite la gráfica de contribuciones.');
    return null;
  }

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
    });
    const json = await res.json();

    if (!res.ok || json.errors) {
      console.warn('[github] No se pudieron obtener las contribuciones:', res.status, json.errors ?? json.message);
      return null;
    }

    return json.data.user.contributionsCollection.contributionCalendar;
  } catch (error) {
    console.warn('[github] Error al consultar contribuciones:', error);
    return null;
  }
}

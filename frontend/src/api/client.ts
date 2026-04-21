import type { Profile, Project, Skill, ContactRequest } from '@/types/api';

const BASE_URL = import.meta.env.VITE_API_URL ?? '';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json() as Promise<T>;
}

async function post<T, B>(path: string, body: B): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json() as Promise<T>;
}

export const api = {
  getProfile: () => get<Profile>('/api/profile'),
  getProjects: (technology?: string) =>
    get<Project[]>(technology ? `/api/projects?technology=${encodeURIComponent(technology)}` : '/api/projects'),
  getSkills: (category?: string) =>
    get<Skill[]>(category ? `/api/skills?category=${encodeURIComponent(category)}` : '/api/skills'),
  sendContact: (body: ContactRequest) =>
    post<{ message: string }, ContactRequest>('/api/contact', body),
};

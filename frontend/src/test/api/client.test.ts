import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '@/api/client';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

function mockResponse(data: unknown, ok = true, status = 200) {
  mockFetch.mockResolvedValueOnce({
    ok,
    status,
    json: () => Promise.resolve(data),
  });
}

beforeEach(() => mockFetch.mockReset());

describe('api.getProfile', () => {
  it('calls the correct endpoint', async () => {
    mockResponse({ name: 'Max Weber' });
    await api.getProfile();
    expect(mockFetch).toHaveBeenCalledWith('/api/profile');
  });

  it('throws on non-ok response', async () => {
    mockResponse(null, false, 500);
    await expect(api.getProfile()).rejects.toThrow('API error 500');
  });
});

describe('api.getProjects', () => {
  it('calls /api/projects without filter', async () => {
    mockResponse([]);
    await api.getProjects();
    expect(mockFetch).toHaveBeenCalledWith('/api/projects');
  });

  it('includes technology query param when provided', async () => {
    mockResponse([]);
    await api.getProjects('React');
    expect(mockFetch).toHaveBeenCalledWith('/api/projects?technology=React');
  });
});

describe('api.getSkills', () => {
  it('calls /api/skills without filter', async () => {
    mockResponse([]);
    await api.getSkills();
    expect(mockFetch).toHaveBeenCalledWith('/api/skills');
  });

  it('includes category query param when provided', async () => {
    mockResponse([]);
    await api.getSkills('Languages');
    expect(mockFetch).toHaveBeenCalledWith('/api/skills?category=Languages');
  });
});

describe('api.sendContact', () => {
  it('sends a POST request with JSON body', async () => {
    mockResponse({ message: 'ok' });
    const body = { name: 'Alice', email: 'alice@example.com', message: 'Hello world from Alice' };
    await api.sendContact(body);
    expect(mockFetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }));
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Projects } from '@/components/sections/Projects';

vi.mock('@/hooks/useProjects');

const { useProjects } = await import('@/hooks/useProjects');

const mockProjects = [
  { id: 1, title: 'TrackFlow', description: 'Logistics tracking SaaS platform.', technologies: ['C#', 'React'], gitHubUrl: 'https://github.com', year: 2024 },
  { id: 2, title: 'FinLedger', description: 'Finance dashboard app.', technologies: ['Python', 'Vue.js'], gitHubUrl: 'https://github.com', liveUrl: 'https://example.com', year: 2023 },
];

describe('Projects', () => {
  it('renders project titles when loaded', () => {
    vi.mocked(useProjects).mockReturnValue({ data: mockProjects, isLoading: false, isError: false } as ReturnType<typeof useProjects>);
    render(<Projects />);
    expect(screen.getByText('TrackFlow')).toBeInTheDocument();
    expect(screen.getByText('FinLedger')).toBeInTheDocument();
  });

  it('renders technology badges', () => {
    vi.mocked(useProjects).mockReturnValue({ data: mockProjects, isLoading: false, isError: false } as ReturnType<typeof useProjects>);
    render(<Projects />);
    expect(screen.getAllByText('C#').length).toBeGreaterThan(0);
  });

  it('shows empty state when no projects match', () => {
    vi.mocked(useProjects).mockReturnValue({ data: [], isLoading: false, isError: false } as ReturnType<typeof useProjects>);
    render(<Projects />);
    expect(screen.getByText(/no projects found/i)).toBeInTheDocument();
  });

  it('shows error message on failure', () => {
    vi.mocked(useProjects).mockReturnValue({ data: undefined, isLoading: false, isError: true } as ReturnType<typeof useProjects>);
    render(<Projects />);
    expect(screen.getByText(/failed to load projects/i)).toBeInTheDocument();
  });
});

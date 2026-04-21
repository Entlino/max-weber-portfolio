import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/sections/Hero';

vi.mock('@/hooks/useProfile');

const { useProfile } = await import('@/hooks/useProfile');

const mockProfile = {
  name: 'Max Weber',
  title: 'Senior Application Developer',
  bio: 'Test bio text.',
  email: 'max@example.com',
  location: 'Berlin, Germany',
  gitHubUrl: 'https://github.com',
  linkedInUrl: 'https://linkedin.com',
  yearsOfExperience: 8,
};

describe('Hero', () => {
  it('renders developer name when loaded', () => {
    vi.mocked(useProfile).mockReturnValue({ data: mockProfile, isLoading: false, isError: false } as ReturnType<typeof useProfile>);
    render(<Hero />);
    expect(screen.getByText('Max Weber')).toBeInTheDocument();
  });

  it('renders title', () => {
    vi.mocked(useProfile).mockReturnValue({ data: mockProfile, isLoading: false, isError: false } as ReturnType<typeof useProfile>);
    render(<Hero />);
    expect(screen.getByText('Senior Application Developer')).toBeInTheDocument();
  });

  it('renders View My Work button', () => {
    vi.mocked(useProfile).mockReturnValue({ data: mockProfile, isLoading: false, isError: false } as ReturnType<typeof useProfile>);
    render(<Hero />);
    expect(screen.getByText('View My Work')).toBeInTheDocument();
  });

  it('shows skeleton when loading', () => {
    vi.mocked(useProfile).mockReturnValue({ data: undefined, isLoading: true, isError: false } as ReturnType<typeof useProfile>);
    render(<Hero />);
    expect(screen.queryByText('Max Weber')).not.toBeInTheDocument();
  });

  it('shows error message on failure', () => {
    vi.mocked(useProfile).mockReturnValue({ data: undefined, isLoading: false, isError: true } as ReturnType<typeof useProfile>);
    render(<Hero />);
    expect(screen.getByText(/failed to load profile/i)).toBeInTheDocument();
  });
});

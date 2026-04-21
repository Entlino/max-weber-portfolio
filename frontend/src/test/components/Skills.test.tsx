import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skills } from '@/components/sections/Skills';

vi.mock('@/hooks/useSkills');

const { useSkills } = await import('@/hooks/useSkills');

const mockSkills = [
  { id: 1, name: 'C#', category: 'Languages', proficiencyLevel: 5 },
  { id: 2, name: 'Docker', category: 'Tools', proficiencyLevel: 5 },
];

describe('Skills', () => {
  it('renders skill names when loaded', () => {
    vi.mocked(useSkills).mockReturnValue({ data: mockSkills, isLoading: false, isError: false } as ReturnType<typeof useSkills>);
    render(<Skills />);
    expect(screen.getByText('C#')).toBeInTheDocument();
    expect(screen.getByText('Docker')).toBeInTheDocument();
  });

  it('renders category headers', () => {
    vi.mocked(useSkills).mockReturnValue({ data: mockSkills, isLoading: false, isError: false } as ReturnType<typeof useSkills>);
    render(<Skills />);
    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(screen.getByText('Tools')).toBeInTheDocument();
  });

  it('does not show error when loading', () => {
    vi.mocked(useSkills).mockReturnValue({ data: undefined, isLoading: true, isError: false } as ReturnType<typeof useSkills>);
    render(<Skills />);
    expect(screen.queryByText(/failed/i)).not.toBeInTheDocument();
  });

  it('shows error message on failure', () => {
    vi.mocked(useSkills).mockReturnValue({ data: undefined, isLoading: false, isError: true } as ReturnType<typeof useSkills>);
    render(<Skills />);
    expect(screen.getByText(/failed to load skills/i)).toBeInTheDocument();
  });
});

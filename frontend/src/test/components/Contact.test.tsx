import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Contact } from '@/components/sections/Contact';

vi.mock('@/api/client', () => ({
  api: {
    sendContact: vi.fn(),
  },
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  Toaster: () => null,
}));

const { api } = await import('@/api/client');

describe('Contact form', () => {
  beforeEach(() => vi.clearAllMocks());

  it('renders all three fields', () => {
    render(<Contact />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('submit button is disabled when fields are empty', () => {
    render(<Contact />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeDisabled();
  });

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    await user.type(screen.getByLabelText(/name/i), 'Alice');
    await user.type(screen.getByLabelText(/email/i), 'not-valid');
    await user.type(screen.getByLabelText(/message/i), 'A long enough message here');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
  });

  it('shows validation error for short message', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    await user.type(screen.getByLabelText(/name/i), 'Alice');
    await user.type(screen.getByLabelText(/email/i), 'alice@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Short');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(screen.getByText(/at least 10/i)).toBeInTheDocument();
  });

  it('calls api.sendContact on valid submit', async () => {
    vi.mocked(api.sendContact).mockResolvedValueOnce({ message: 'ok' });
    const user = userEvent.setup();
    render(<Contact />);
    await user.type(screen.getByLabelText(/name/i), 'Alice');
    await user.type(screen.getByLabelText(/email/i), 'alice@example.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a valid long enough message');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => expect(api.sendContact).toHaveBeenCalledOnce());
  });
});

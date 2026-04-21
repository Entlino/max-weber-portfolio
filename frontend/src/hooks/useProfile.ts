import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/client';

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: api.getProfile,
    staleTime: Infinity,
  });
}

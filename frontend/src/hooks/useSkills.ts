import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/client';

export function useSkills(category?: string) {
  return useQuery({
    queryKey: ['skills', category],
    queryFn: () => api.getSkills(category),
    staleTime: Infinity,
  });
}

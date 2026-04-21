import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/client';

export function useProjects(technology?: string) {
  return useQuery({
    queryKey: ['projects', technology],
    queryFn: () => api.getProjects(technology),
    staleTime: Infinity,
  });
}

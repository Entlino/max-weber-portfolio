import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { useProjects } from '@/hooks/useProjects';
import { cn } from '@/lib/utils';

export function Projects() {
  const [activeTech, setActiveTech] = useState<string | undefined>(undefined);
  const { data: projects, isLoading, isError } = useProjects(activeTech);
  const { data: allProjects } = useProjects();

  const allTechs = allProjects
    ? [...new Set(allProjects.flatMap((p) => p.technologies))].sort()
    : [];

  return (
    <SectionWrapper id="projects" title="Projects" subtitle="Things I've built">
      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={activeTech === undefined ? 'default' : 'outline'}
          onClick={() => setActiveTech(undefined)}
        >
          All
        </Button>
        {allTechs.map((tech) => (
          <Button
            key={tech}
            size="sm"
            variant={activeTech === tech ? 'default' : 'outline'}
            onClick={() => setActiveTech(tech === activeTech ? undefined : tech)}
          >
            {tech}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <ProjectsSkeleton />
      ) : isError ? (
        <p className="text-destructive">Failed to load projects.</p>
      ) : !projects?.length ? (
        <p className="text-muted-foreground text-center py-12">
          No projects found for this filter.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <span className="text-xs text-muted-foreground shrink-0">{project.year}</span>
                </div>
                <CardDescription className="leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <a
                    href={project.gitHubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                  >
                    GitHub
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(buttonVariants({ size: 'sm' }))}
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="border border-border rounded-lg p-6 space-y-3">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-16 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

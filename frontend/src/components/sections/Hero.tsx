import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { buttonVariants } from '@/components/ui/button';
import { useProfile } from '@/hooks/useProfile';
import { cn } from '@/lib/utils';

export function Hero() {
  const { data: profile, isLoading, isError } = useProfile();

  return (
    <section id="about" className="min-h-screen flex items-center px-6 pt-16">
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            {isLoading ? (
              <HeroSkeleton />
            ) : isError ? (
              <p className="text-destructive">Failed to load profile.</p>
            ) : profile ? (
              <>
                <div>
                  <Badge variant="secondary" className="mb-4">
                    Available for opportunities
                  </Badge>
                  <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                    {profile.name}
                  </h1>
                  <p className="mt-3 text-xl text-primary font-medium">{profile.title}</p>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                  {profile.bio}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span>📍 {profile.location}</span>
                  <span>🚀 {profile.yearsOfExperience}+ years experience</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href="#projects" className={cn(buttonVariants())}>
                    View My Work
                  </a>
                  <a
                    href={profile.gitHubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: 'outline' }))}
                  >
                    GitHub
                  </a>
                  <a
                    href={profile.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: 'outline' }))}
                  >
                    LinkedIn
                  </a>
                </div>
              </>
            ) : null}
          </div>

          <div className="flex-shrink-0">
            <div className="h-48 w-48 rounded-full bg-muted border-2 border-primary/30 flex items-center justify-center">
              <span className="text-5xl font-bold text-primary">MW</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-14 w-80" />
      <Skeleton className="h-6 w-56" />
      <Skeleton className="h-20 w-full max-w-xl" />
      <div className="flex gap-3">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}

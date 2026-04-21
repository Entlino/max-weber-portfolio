import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { useSkills } from '@/hooks/useSkills';

export function Skills() {
  const { data: skills, isLoading, isError } = useSkills();

  const grouped = skills
    ? skills.reduce<Record<string, typeof skills>>((acc, skill) => {
        (acc[skill.category] ??= []).push(skill);
        return acc;
      }, {})
    : {};

  return (
    <SectionWrapper id="skills" title="Skills" subtitle="Technologies I work with">
      {isLoading ? (
        <SkillsSkeleton />
      ) : isError ? (
        <p className="text-destructive">Failed to load skills.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(grouped).map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                {category}
              </h3>
              <div className="space-y-3">
                {categorySkills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-foreground">{skill.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {skill.proficiencyLevel}/5
                      </Badge>
                    </div>
                    <Progress value={skill.proficiencyLevel * 20} className="h-1.5" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}

function SkillsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-4 w-24" />
          {Array.from({ length: 3 }).map((_, j) => (
            <div key={j} className="space-y-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-1.5 w-full" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

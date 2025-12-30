import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

export function ContentCard({ 
  children, 
  className, 
  hover = false,
  padding = "md" 
}: CardProps) {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };

  return (
    <div 
      className={cn(
        "rounded-2xl border border-border/50 bg-card shadow-soft",
        hover && "transition-smooth hover:shadow-medium hover:border-border",
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

interface CategoryCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  topicCount?: number;
  onClick?: () => void;
}

export function CategoryCard({ 
  title, 
  description, 
  icon, 
  topicCount,
  onClick 
}: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className="group w-full rounded-2xl border border-border/50 bg-card p-6 text-left shadow-soft transition-smooth hover:border-primary/30 hover:shadow-medium"
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-smooth group-hover:bg-primary/20">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg font-semibold text-foreground">
            {title}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
          {topicCount !== undefined && (
            <p className="mt-2 text-xs text-muted-foreground">
              {topicCount} topics
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

interface TopicCardProps {
  title: string;
  excerpt?: string;
  author: string;
  authorAvatar?: string;
  date: string;
  replyCount?: number;
  tags?: string[];
  isLocked?: boolean;
  onClick?: () => void;
}

export function TopicCard({
  title,
  excerpt,
  author,
  authorAvatar,
  date,
  replyCount,
  tags,
  isLocked,
  onClick
}: TopicCardProps) {
  return (
    <button
      onClick={onClick}
      className="group w-full rounded-2xl border border-border/50 bg-card p-5 text-left shadow-soft transition-smooth hover:border-primary/30 hover:shadow-medium"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-base font-semibold text-foreground line-clamp-1">
              {title}
            </h3>
            {isLocked && (
              <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                Gesloten
              </span>
            )}
          </div>
          {excerpt && (
            <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
              {excerpt}
            </p>
          )}
          {tags && tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-sage/10 px-2.5 py-0.5 text-xs text-sage-dark"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
            {authorAvatar || author.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm text-muted-foreground">{author}</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {replyCount !== undefined && (
            <span>{replyCount} reacties</span>
          )}
          <span>{date}</span>
        </div>
      </div>
    </button>
  );
}

interface BlogCardProps {
  title: string;
  excerpt?: string;
  coverUrl?: string;
  date: string;
  readTime?: string;
  onClick?: () => void;
}

export function BlogCard({
  title,
  excerpt,
  coverUrl,
  date,
  readTime,
  onClick
}: BlogCardProps) {
  return (
    <button
      onClick={onClick}
      className="group w-full overflow-hidden rounded-2xl border border-border/50 bg-card text-left shadow-soft transition-smooth hover:border-primary/30 hover:shadow-medium"
    >
      {coverUrl && (
        <div className="aspect-[16/9] overflow-hidden bg-muted">
          <img
            src={coverUrl}
            alt={title}
            className="h-full w-full object-cover transition-smooth group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-foreground line-clamp-2">
          {title}
        </h3>
        {excerpt && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {excerpt}
          </p>
        )}
        <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
          <span>{date}</span>
          {readTime && (
            <>
              <span>•</span>
              <span>{readTime}</span>
            </>
          )}
        </div>
      </div>
    </button>
  );
}

interface ExerciseCardProps {
  title: string;
  description?: string;
  duration?: string;
  hasAudio?: boolean;
  onClick?: () => void;
}

export function ExerciseCard({
  title,
  description,
  duration,
  hasAudio,
  onClick
}: ExerciseCardProps) {
  return (
    <button
      onClick={onClick}
      className="group w-full rounded-2xl border border-border/50 bg-card p-5 text-left shadow-soft transition-smooth hover:border-primary/30 hover:shadow-medium"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sage/10 text-sage-dark">
          {hasAudio ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M9 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-base font-semibold text-foreground">
            {title}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
          {duration && (
            <p className="mt-2 text-xs text-muted-foreground">
              ⏱ {duration}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * LEGACY — delete in T10. The scroll-triggered fade is gone (plan §16);
 * this now renders its children as they are so old pages keep building.
 */
export default function FadeIn({ children, className = "" }: FadeInProps) {
  return <div className={className}>{children}</div>;
}

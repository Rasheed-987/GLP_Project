export default function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1800px]  ${className ?? ''}`}>
      {children}
    </div>
  );
}

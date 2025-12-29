export default function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[2000px]  ${className ?? ''}`}>
      {children}
    </div>
  );
}

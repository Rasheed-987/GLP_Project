export default function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1900px]  ${className ?? ''}`}>
      {children}
    </div>
  );
}

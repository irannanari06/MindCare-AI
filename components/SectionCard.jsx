export function SectionCard({ children, className = "" }) {
  return (
    <section className={`glass rounded-[2rem] p-5 sm:p-7 ${className}`}>
      {children}
    </section>
  );
}

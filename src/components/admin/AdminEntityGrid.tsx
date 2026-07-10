import type { ReactNode } from "react";

interface AdminEntityGridProps {
  children: ReactNode;
}

export default function AdminEntityGrid({ children }: AdminEntityGridProps) {
  return (
    <div className="w-full mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {children}
    </div>
  );
}

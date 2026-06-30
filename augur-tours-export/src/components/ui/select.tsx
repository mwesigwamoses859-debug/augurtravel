import type { SelectHTMLAttributes, PropsWithChildren } from "react";

export function Select({ children, ...props }: PropsWithChildren<SelectHTMLAttributes<HTMLSelectElement>>) {
  return <select {...props}>{children}</select>;
}

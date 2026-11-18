/** Thin adapters so the ported screens keep their string-based link/navigation calls on TanStack Router. */
import {
  Link as RouterLink,
  Navigate as RouterNavigate,
  useLocation as useRouterLocation,
  useNavigate as useRouterNavigate,
  useParams as useRouterParams,
  useRouter,
} from "@tanstack/react-router";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  children?: ReactNode;
};

export function Link({ to, ...rest }: LinkProps) {
  // Paths are built at runtime from the source screens, so they are not typed route ids.
  return <RouterLink to={to as never} {...(rest as object)} />;
}

export function Navigate({ to, replace }: { to: string; replace?: boolean; state?: unknown }) {
  return <RouterNavigate to={to as never} replace={replace} />;
}

type NavigateTarget = string | number | { to: string; replace?: boolean };

export function useNavigate() {
  const navigate = useRouterNavigate();
  const router = useRouter();
  return (to: NavigateTarget) => {
    if (typeof to === "number") {
      router.history.go(to);
      return Promise.resolve();
    }
    if (typeof to === "string") return navigate({ to: to as never });
    return navigate({ to: to.to as never, replace: to.replace });
  };
}

export function useLocation() {
  return useRouterLocation();
}

export function useParams<
  T extends Record<string, string | undefined> = Record<string, string>,
>(): T {
  return useRouterParams({ strict: false }) as T;
}

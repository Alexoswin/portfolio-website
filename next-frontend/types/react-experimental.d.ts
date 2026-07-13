/**
 * React's experimental <ViewTransition> component. Next.js aliases `react`
 * imports in app code to its vendored build, which exports it when
 * `experimental.viewTransition` is enabled (next.config.ts) — but
 * @types/react does not declare it yet. Remove this once it does.
 */
import "react";

declare module "react" {
  interface ViewTransitionProps {
    children?: React.ReactNode;
    /** Shared-element identity across pages. */
    name?: string;
    /** View-transition class applied when this element enters. */
    enter?: string;
    /** View-transition class applied when this element exits. */
    exit?: string;
    /** View-transition class applied when this element updates. */
    update?: string;
    /** View-transition class applied when morphing between shared elements. */
    share?: string;
    /** Fallback view-transition class. */
    default?: string;
  }

  export const ViewTransition: React.ComponentType<ViewTransitionProps>;
}

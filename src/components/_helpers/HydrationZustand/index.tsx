import { useEffect, useState } from "react";

// Issue: Hydration issues occur in Next.js and Zustand due to inconsistencies between the
// server-rendered HTML's initial state and the state initialized by client-side JavaScript.

// Solution: Create a HydrationZustand component that uses the useEffect hook to wait for Next.js
// hydration to complete before rendering the application. This component sets isHydrated state
// to true upon completion, allowing the application to render. Wrap the application with HydrationZustand
// in the _app.js file to ensure it renders only after hydration is complete, ensuring compatibility
// with Zustand and other state management tools.

const HydrationZustand = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>{isHydrated ? <div>{children}</div> : null}</>;
};

export default HydrationZustand;

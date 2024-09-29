import "@/styles/globals.css";
import "github-markdown-css";

import HydrationZustand from "@/components/_helpers/HydrationZustand";
import NavigationBar from "@/components/NavigationBar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence, motion } from "framer-motion";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <HydrationZustand>
        <AnimatePresence mode="wait">
          <NextNProgress />

          <NavigationBar />
          <motion.div
            className="theme-dark"
            key={router.route}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Toaster />
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </HydrationZustand>
    </ThemeProvider>
  );
}

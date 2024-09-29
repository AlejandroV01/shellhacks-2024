import "@/styles/globals.css";
import "github-markdown-css";

import HydrationZustand from "@/components/_helpers/HydrationZustand";
import NavigationBar from "@/components/NavigationBar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence, motion } from "framer-motion";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";

import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAAB-BT5Juq_0D-DTUKTOtakBxhN9tb8po",
  authDomain: "quiz-sensei.firebaseapp.com",
  projectId: "quiz-sensei",
  storageBucket: "quiz-sensei.appspot.com",
  messagingSenderId: "672319185573",
  appId: "1:672319185573:web:78668c47c0e5a6c862234c",
  measurementId: "G-ZEYTJFB4TN",
};

export const initFirebaseAnalytics = () => {
  if (typeof window !== "undefined") {
    const app = initializeApp(firebaseConfig);
    getAnalytics(app);
  }
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    initFirebaseAnalytics();
  }, []);

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
          <Analytics />

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

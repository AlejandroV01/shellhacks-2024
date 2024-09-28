import { motion } from "framer-motion";

interface Props extends React.HTMLProps<HTMLDivElement> {
  condition: boolean;
  children: React.ReactNode;
  delay?: number;
}

export const AnimatedDivOnTrueValue = (props: Props) => {
  const { condition, children, delay = 0 } = props;

  if (!condition) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay,
      }}
    >
      <div {...props}>{children}</div>
    </motion.div>
  );
};

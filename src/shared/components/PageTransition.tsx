import { motion } from 'framer-motion'
import { fadeIn } from '../utils/animations'

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({
  children,
}: PageTransitionProps):React.ReactElement {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}
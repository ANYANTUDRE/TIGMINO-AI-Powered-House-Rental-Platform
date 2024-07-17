

export const Animation = {
  initial: "hidden",
  whileInView: "visible",
  viewport: {
    once: true,
    amount: 0.5
  },
  transition: {
    duration: 0.3
  },
  transitionDelay: {
    duration: 0.3,
    delay: 0.1
  },
  variants: {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0
    },
  },
  sideVariants: {
    hidden: {
      opacity: 0,
      x: -80
    },
    visible: {
      opacity: 1,
      x: 0
    },
  },
  LeftsideVariants: {
    hidden: {
      opacity: 0,
      x: 80,
      y: -36
    },
    visible: {
      opacity: 1,
      x: 0,
      y: -36
    },
  },
  
};

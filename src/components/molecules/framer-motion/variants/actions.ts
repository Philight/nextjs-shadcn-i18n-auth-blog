// TOOO hover - opacity brighten (white bg layer)
// ----------------------------------------------------------------------

export const varHover = (hover = 1.09, tap = 0.97) => ({
  hover: { scale: hover },
  tap: { scale: tap },
});

export const varHoverFade = (hover = 0.8, tap = 0.7) => ({
  hover: { opacity: hover },
  tap: { opacity: tap },
});

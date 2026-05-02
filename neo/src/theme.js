export const COLORS = {
  background: '#050510',
  surface: '#0c0c1e',
  card: '#111130',
  cardAlt: '#0d0d28',
  blue: '#0080ff',
  blueGlow: '#0040aa',
  red: '#ff3344',
  redDim: '#aa1122',
  green: '#00e87a',
  yellow: '#ffbb00',
  purple: '#8844ff',
  text: '#ffffff',
  textSecondary: '#aabbcc',
  textMuted: '#556677',
  border: '#1a1a3a',
  borderBright: '#2233aa',
  live: '#00e87a',
};

export const FONTS = {
  heading: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: 2,
  },
  subheading: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    letterSpacing: 1,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  metric: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
  },
  score: {
    fontSize: 52,
    fontWeight: '900',
    color: COLORS.blue,
    letterSpacing: -2,
  },
};

export const SHADOWS = {
  blue: {
    shadowColor: '#0080ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  red: {
    shadowColor: '#ff3344',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
};

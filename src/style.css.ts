import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const bottomBtn = style({
  position: 'fixed',
  zIndex: 2,
  width: '100%',
  padding: '12px',
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: '#FFFFFF',
});

const container = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  gap: '1rem',
});

const box = style({
  display: 'flex',
  padding: '24px 12px 0',
  flexDirection: 'column',
  gap: '8px',
  borderRadius: '24px',
  backgroundColor: '#EEEDFF',
  alignItems: 'center',
  textAlign: 'center',
});

const boxTable = style({
  borderRadius: '12px',
  padding: '8px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '8px',
  backgroundColor: '#F6F6FD',
});

const boxTableCell = recipe({
  base: {
    padding: '8px 12px',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  variants: {
    filled: {
      true: {
        backgroundColor: '#EAE2F8',
      },
    },
  },
});

const stepStyle = style({});
globalStyle(`${stepStyle} > div > div > div[class^="_option_"]`, {
  backgroundColor: 'var(--color-light-neutral-translucent-1300)',
  color: 'var(--color-light-text-primary-inverted)',
});

const boxCalc = style({
  borderRadius: '12px',
  padding: '16px',
  backgroundColor: '#F6F6FD',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const rowSb = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '8px',
});

const bannerAccount = style({
  padding: '16px',
  backgroundColor: '#F5F5F8',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  marginTop: '6px',
});

export const appSt = {
  bottomBtn,
  container,
  box,
  boxTable,
  boxTableCell,
  stepStyle,
  boxCalc,
  rowSb,
  bannerAccount,
};

import React from 'react';
import { useTheme } from '@mui/material/styles';

// Two cards: the waiter's (pink) behind, yours in front. Same mark as public/designv2simple.
const Logo: React.FC<{ size?: number }> = ({ size = 32 }) => {
  const theme = useTheme();
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true" style={{ display: 'block', flex: 'none' }}>
      <rect x="12" y="2" width="18" height="22" rx="2" fill={theme.palette.primary.main} />
      <rect x="2" y="8" width="18" height="22" rx="2" fill={theme.palette.text.primary} />
      <rect x="6" y="14" width="10" height="2.5" fill={theme.palette.background.default} />
      <rect x="6" y="19.5" width="7" height="2.5" fill={theme.palette.background.default} />
    </svg>
  );
};

export default Logo;

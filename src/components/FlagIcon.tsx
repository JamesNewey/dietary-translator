import React from 'react';
import { Box } from '@mui/material';

// Import all flag SVGs
import enFlag from '../assets/flags/en.svg';
import esFlag from '../assets/flags/es.svg';
import frFlag from '../assets/flags/fr.svg';
import deFlag from '../assets/flags/de.svg';
import itFlag from '../assets/flags/it.svg';
import ptFlag from '../assets/flags/pt.svg';
import ruFlag from '../assets/flags/ru.svg';
import zhFlag from '../assets/flags/zh.svg';
import jaFlag from '../assets/flags/ja.svg';
import koFlag from '../assets/flags/ko.svg';
import ukFlag from '../assets/flags/uk.svg';

const flagMap: { [key: string]: string } = {
  en: enFlag,
  es: esFlag,
  fr: frFlag,
  de: deFlag,
  it: itFlag,
  pt: ptFlag,
  ru: ruFlag,
  zh: zhFlag,
  ja: jaFlag,
  ko: koFlag,
  uk: ukFlag,
};

interface FlagIconProps {
  code: string;
  width?: number;
  height?: number;
}

const FlagIcon: React.FC<FlagIconProps> = ({ code, width = 24, height = 16 }) => {
  const flagSrc = flagMap[code];
  
  if (!flagSrc) {
    console.warn(`No flag found for language code: ${code}`);
    return null;
  }

  return (
    <Box
      component="img"
      src={flagSrc}
      alt={`${code} flag`}
      sx={{
        width,
        height,
        objectFit: 'cover',
        borderRadius: '2px',
        display: 'block',
      }}
      onError={(e) => {
        console.error(`Failed to load flag for language code: ${code}`);
        e.currentTarget.style.display = 'none';
      }}
    />
  );
};

export default FlagIcon; 
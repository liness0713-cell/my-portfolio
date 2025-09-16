// components/ColorPalette.tsx

import Link from 'next/link';
import React from 'react';

// 定义组件的props类型
interface ColorPaletteProps {
  href: string;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ href }) => {
  const colors = [
    'custom-blue',
    'custom-orange',
    'custom-green',
    'custom-red',
    'custom-green2',
    'custom-red2',
  ];

  return (
    <div className="mb-40 flex items-center">
      {colors.map((color, index) => (
        <Link 
          key={index}
          href={href}
          className={`w-3 h-3 bg-white mr-1 border-2 border-${color} aspect-square rounded-lg hover:bg-${color} transition-colors duration-200`}
        />
      ))}
    </div>
  );
};

export default ColorPalette;
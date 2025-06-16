import React from 'react';

type SvgComponentProps = React.SVGProps<SVGSVGElement> & {
  width?: string | number;
  height?: string | number;
  viewBox?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
  strokeLinecap?: 'round' | 'butt' | 'square' | 'inherit';
  strokeLinejoin?: 'round' | 'inherit' | 'miter' | 'bevel';
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export default function SvgComponent ({
  width = '24',
  height = '24',
  viewBox = '0 0 24 24',
  fill = 'none',
  stroke = 'currentColor',
  strokeWidth = 2,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  className = '',
  style = {},
  children,
  ...restProps
}: SvgComponentProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      className={className}
      style={style}
      {...restProps}
    >
      {children}
    </svg>
  );
};


import { SVGProps } from 'react';

export const SvgCommentMarker = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={35}
    height={36}
    fill='none'
    {...props}
  >
    <g filter='url(#a)'>
      <path fill='#fff' d='M6 17h12v12H6z' />
      <rect width={22} height={23} x={6.5} y={5.5} fill='#1E7631' rx={11} />
      <rect width={22} height={23} x={6.5} y={5.5} stroke='#fff' rx={11} />
    </g>
    <defs>
      <filter
        id='a'
        width={36}
        height={36}
        x={0}
        y={0}
        colorInterpolationFilters='sRGB'
        filterUnits='userSpaceOnUse'
      >
        <feFlood floodOpacity={0} result='BackgroundImageFix' />
        <feColorMatrix
          in='SourceAlpha'
          result='hardAlpha'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
        />
        <feOffset dy={1} />
        <feGaussianBlur stdDeviation={3} />
        <feComposite in2='hardAlpha' operator='out' />
        <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
        <feBlend in2='BackgroundImageFix' result='effect1_dropShadow_1_1269' />
        <feBlend
          in='SourceGraphic'
          in2='effect1_dropShadow_1_1269'
          result='shape'
        />
      </filter>
    </defs>
  </svg>
);

import type { svgProps } from "../SvgLib";

const TestsIcon = ({ className, stroke = 'currentColor' }: svgProps) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M14.1666 15.3583H10.8333L7.12495 17.8249C6.57495 18.1916 5.83329 17.8 5.83329 17.1333V15.3583C3.33329 15.3583 1.66663 13.6916 1.66663 11.1916V6.19157C1.66663 3.69157 3.33329 2.0249 5.83329 2.0249H14.1666C16.6666 2.0249 18.3333 3.69157 18.3333 6.19157V11.1916C18.3333 13.6916 16.6666 15.3583 14.1666 15.3583Z" stroke={stroke} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 9.46655V9.29159C10 8.72492 10.35 8.4249 10.7 8.18324C11.0417 7.9499 11.3833 7.64991 11.3833 7.09991C11.3833 6.33325 10.7667 5.71655 10 5.71655C9.23334 5.71655 8.6167 6.33325 8.6167 7.09991" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.99629 11.4584H10.0038" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default TestsIcon;
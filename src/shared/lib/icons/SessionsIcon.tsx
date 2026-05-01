import type { svgProps } from "../SvgLib";

const SessionsIcon = ({ className, stroke = 'currentColor' }: svgProps) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M6.66663 1.66675V4.16675" stroke={stroke} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.3334 1.66675V4.16675" stroke={stroke} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.91663 7.57495H17.0833" stroke={stroke} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.5 7.08341V14.1667C17.5 16.6667 16.25 18.3334 13.3333 18.3334H6.66667C3.75 18.3334 2.5 16.6667 2.5 14.1667V7.08341C2.5 4.58341 3.75 2.91675 6.66667 2.91675H13.3333C16.25 2.91675 17.5 4.58341 17.5 7.08341Z" stroke={stroke} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.079 11.4167H13.0864" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.079 13.9167H13.0864" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.9962 11.4167H10.0037" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.9962 13.9167H10.0037" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.91197 11.4167H6.91945" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.91197 13.9167H6.91945" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default SessionsIcon;
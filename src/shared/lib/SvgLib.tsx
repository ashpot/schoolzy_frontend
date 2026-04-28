export interface svgProps extends React.SVGAttributes<SVGElement>{
    className?: string
    stroke?: string
}
export const BrandIcon: React.FC<svgProps> = ({ className, stroke = 'currentColor' }) => (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" className={className}>
        <path d="M40.1627 20.4788C40.4984 20.3307 40.7832 20.0874 40.982 19.7791C41.1807 19.4707 41.2846 19.1108 41.2808 18.7439C41.277 18.3771 41.1657 18.0194 40.9606 17.7152C40.7556 17.411 40.4658 17.1737 40.1271 17.0326L24.0565 9.71256C23.5679 9.48971 23.0372 9.37439 22.5002 9.37439C21.9633 9.37439 21.4325 9.48971 20.944 9.71256L4.87523 17.0251C4.54142 17.1713 4.25745 17.4116 4.05804 17.7166C3.85864 18.0216 3.75244 18.3781 3.75244 18.7426C3.75244 19.107 3.85864 19.4635 4.05804 19.7685C4.25745 20.0736 4.54142 20.3139 4.87523 20.4601L20.944 27.7876C21.4325 28.0104 21.9633 28.1257 22.5002 28.1257C23.0372 28.1257 23.5679 28.0104 24.0565 27.7876L40.1627 20.4788Z" stroke={stroke} strokeWidth="3.75" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M41.25 18.75V30" stroke={stroke} strokeWidth="3.75" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.25 23.4375V30C11.25 31.4918 12.4353 32.9226 14.545 33.9775C16.6548 35.0324 19.5163 35.625 22.5 35.625C25.4837 35.625 28.3452 35.0324 30.455 33.9775C32.5647 32.9226 33.75 31.4918 33.75 30V23.4375" stroke={stroke} strokeWidth="3.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const LoginIcon: React.FC<svgProps> = ({ className, stroke = 'currentColor' }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
        <path d="M7.41675 6.29995C7.67508 3.29995 9.21675 2.07495 12.5917 2.07495H12.7001C16.4251 2.07495 17.9167 3.56662 17.9167 7.29162V12.725C17.9167 16.45 16.4251 17.9416 12.7001 17.9416H12.5917C9.24175 17.9416 7.70008 16.7333 7.42508 13.7833" stroke={stroke} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.66675 10H12.4001" stroke={stroke} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.5417 7.20837L13.3334 10L10.5417 12.7917" stroke={stroke} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

);
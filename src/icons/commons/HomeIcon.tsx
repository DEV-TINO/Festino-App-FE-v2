import React from 'react';
import { IconProps } from '@/types/Footer.types';

const HomeIcon : React.FC<IconProps> = ({ isActive }) => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.66656 20.9167C4.66656 22.5736 6.00971 23.9167 7.66656 23.9167H20.3332C21.9901 23.9167 23.3332 22.5736 23.3332 20.9167V10.9167C23.3332 10.2872 23.0368 9.69446 22.5332 9.31675L15.1999 3.81675C14.4888 3.28341 13.511 3.28342 12.7999 3.81675L5.46657 9.31675C4.96295 9.69446 4.66656 10.2872 4.66656 10.9167V20.9167ZM11.6665 18.0831C11.0222 18.0831 10.4999 18.6055 10.4999 19.2498C10.4999 19.8941 11.0222 20.4165 11.6665 20.4165H16.3332C16.9775 20.4165 17.4999 19.8941 17.4999 19.2498C17.4999 18.6055 16.9775 18.0831 16.3332 18.0831H11.6665Z"
        className={isActive ? 'fill-primary-700' : 'fill-secondary-100'}
      />
    </svg>
  );
};

export default HomeIcon;
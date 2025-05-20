import React from 'react';

const IconProfile: React.FC = () => {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="40" fill="#999999"/>
      <circle cx="40" cy="30" r="11" stroke="white" stroke-width="2"/>
      <mask id="path-3-inside-1_6304_17286" fill="white">
        <path d="M19 56C19 47.1634 26.1634 40 35 40H45C53.8366 40 61 47.1634 61 56V57H19V56Z"/>
      </mask>
      <path d="M17 56C17 46.0589 25.0589 38 35 38H45C54.9411 38 63 46.0589 63 56H59C59 48.268 52.732 42 45 42H35C27.268 42 21 48.268 21 56H17ZM61 57H19H61ZM17 57V56C17 46.0589 25.0589 38 35 38V42C27.268 42 21 48.268 21 56V57H17ZM45 38C54.9411 38 63 46.0589 63 56V57H59V56C59 48.268 52.732 42 45 42V38Z" fill="white" mask="url(#path-3-inside-1_6304_17286)"/>
    </svg>
  );
};

export default IconProfile;
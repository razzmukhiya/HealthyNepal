import React from 'react';
import { server } from "../../utils/api";

const DEFAULT_AVATAR = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

const Avatar = ({ src, alt, className }) => {
  return (
    <img 
      src={src ? `${server}/${src}` : DEFAULT_AVATAR}
      alt={alt || "avatar"}
      className={className}
      onError={(e) => {
        console.log("Avatar load error, using default");
        e.target.onerror = null;
        e.target.src = DEFAULT_AVATAR;
      }}
    />
  );
};

export default Avatar;

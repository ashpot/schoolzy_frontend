import React from "react";

const UserAvatar: React.FC<{name: string}> = ({name}) => {
   const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return(
    <div className="uppercase w-9 h-9 rounded-full bg-brand-primary flex items-center justify-center text-white text-sm font-bold ring-2 ring-white shadow-sm">
      <span>{initials}</span>
    </div>
  )

};

export default UserAvatar;
// import React, { useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronDown, ChevronRight } from "lucide-react";
// import { cn } from "@/shared/utils/cn";
// import { sidebarNavItems } from "../data/sidebarNav";
// import type { NavItem } from "@/shared/types/navigation";
// import brandLogo from "@/assets/brand/schoolzy_brand_name.svg";

// const UserAvatar = () => (
//   <div className="w-9 h-9 rounded-full bg-brand-primary flex items-center justify-center text-white text-sm font-semibold shrink-0">
//     BU
//   </div>
// );
// const user = {
//   name: "Ben Uche",
//   role: "Admin",
// };

// interface DashboardSidebarProps {
//   className?: string;
// }



// const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ className }) => {
//   return (
//     <aside
//       className={cn(
//         "flex flex-col h-screen w-64 lg:w-70 bg-white border-r border-border-line02 select-none",
//         className
//       )}
//     >
//       {/* Brand */}
//       <div className="px-5 py-5 border-b border-border-line02">
//         <img src={brandLogo} alt="My School" className="h-8 md:h-9" />
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-2 py-4 overflow-y-auto">
//         <ul className="space-y-1">
//           {sidebarNavItems.map((item) => (
//             <SidebarItem key={item.id} item={item} />
//           ))}
//         </ul>
//       </nav>

//       {/* Footer */}
//       <div className="border-t border-border-line02 p-3">
//         <div className="flex items-center gap-3 px-2 py-1">
//           <UserAvatar />
//           <div className="flex-1 min-w-0">
//             <p className="text-sm font-medium text-text-primary truncate">
//               {user.name}
//             </p>
//             <p className="text-xs text-text-muted">{user.role}</p>
//           </div>
//           <ChevronRight className="w-4 h-4 text-text-muted shrink-0" />
//         </div>
//       </div>

//       {/* Version */}
//       <div className="px-5 py-3 border-t border-border-line02">
//         <p className="text-xs text-text-muted">
//           © 2026 Schoolzy <span className="ml-2">v2.1.0</span>
//         </p>
//       </div>
//     </aside>
//   );
// };

// // ---- Sidebar Item (handles nesting) ----
// const SidebarItem: React.FC<{ item: NavItem }> = ({ item }) => {
//   const location = useLocation();
//   const hasChildren = item.children && item.children.length > 0;
//   const isActive = item.path ? location.pathname.startsWith(item.path) : false;
//   const [expanded, setExpanded] = useState(isActive);

//   const toggleExpand = () => setExpanded((prev) => !prev);

//   if (!hasChildren) {
//     return (
//       <li>
//         <NavLink
//           to={item.path!}
//           end={item.path === "/dashboard"}
//           className={({ isActive }) =>
//             cn(
//               "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-lato transition-all duration-150",
//               isActive
//                 ? "bg-brand-primary/10 text-brand-primary font-semibold"
//                 : "text-text-secondary hover:bg-bg-soft hover:text-text-primary"
//             )
//           }
//         >
//           {({ isActive }) => (
//             <>
//               <item.icon
//                 className={cn(
//                   "w-5 h-5 shrink-0",
//                   isActive ? "text-brand-primary" : "text-text-muted"
//                 )}
//               />
//               <span>{item.label}</span>
//             </>
//           )}
//         </NavLink>
//       </li>
//     );
//   }

//   return (
//     <li>
//       <button
//         onClick={toggleExpand}
//         className={cn(
//           "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-base font-medium font-lato transition-all duration-150",
//           isActive
//             ? "bg-brand-primar text-bg-main font-semibold"
//             : "text-text-nav hover:bg-brand-primary/75 hover:text-text-primary"
//         )}
//       >
//         <item.icon
//           className={cn(
//             "w-5 h-5 shrink-0",
//             isActive ? "text-bg-main" : "text-text-nav"
//           )}
//         />
//         <span className="flex-1 text-left">{item.label}</span>
//         <motion.span
//           animate={{ rotate: expanded ? 180 : 0 }}
//           transition={{ duration: 0.2 }}
//           className="shrink-0"
//         >
//           <ChevronDown
//             className={cn(
//               "w-4 h-4",
//               isActive ? "text-brand-primary" : "text-text-muted"
//             )}
//           />
//         </motion.span>
//       </button>

//       <AnimatePresence>
//         {expanded && (
//           <motion.ul
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             className="overflow-hidden ml-4 pl-4 border-l border-border-line02 mt-1 space-y-1"
//           >
//             {item.children!.map((child) => (
//               <li key={child.id}>
//                 <NavLink
//                   to={child.path!}
//                   className={({ isActive }) =>
//                     cn(
//                       "block px-3 py-2 rounded-lg text-sm font-lato transition-all duration-150",
//                       isActive
//                         ? "bg-brand-primary/5 text-brand-primary font-medium"
//                         : "text-text-muted hover:text-text-primary hover:bg-bg-soft"
//                     )
//                   }
//                 >
//                   {child.label}
//                 </NavLink>
//               </li>
//             ))}
//           </motion.ul>
//         )}
//       </AnimatePresence>
//     </li>
//   );
// };

// export default DashboardSidebar;
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { sidebarNavItems } from "../data/sidebarNav";
import type { NavItem } from "@/shared/types/navigation";
import brandLogo from "@/assets/brand/schoolzy_brand_name.svg";

const UserAvatar = () => (
  <div className="w-9 h-9 rounded-full bg-brand-primary flex items-center justify-center text-white text-sm font-semibold shrink-0">
    BU
  </div>
);

const user = {
  name: "Ben Uche",
  role: "Admin",
};

interface DashboardSidebarProps {
  className?: string;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ className }) => {
  return (
    <aside
      className={cn(
        "flex flex-col h-screen w-64 lg:w-70 bg-white border-r border-border-line02 select-none",
        className
      )}
    >
      {/* Brand */}
      <div className="px-5 py-5.5 border-b border-border-line02">
        <img src={brandLogo} alt="My School" className="h-8 md:h-9" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {sidebarNavItems.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-border-line02 p-3">
        <div className="flex items-center gap-3 px-2 py-1">
          <UserAvatar />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">
              {user.name}
            </p>
            <p className="text-xs text-text-muted">{user.role}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-text-muted shrink-0" />
        </div>
      </div>

      {/* Version */}
      <div className="px-5 py-3 border-t border-border-line02">
        <p className="text-xs text-text-muted">
          © 2026 Schoolzy <span className="ml-2">v2.1.0</span>
        </p>
      </div>
    </aside>
  );
};

// ---- Sidebar Item (handles nesting) ----
const SidebarItem: React.FC<{ item: NavItem }> = ({ item }) => {
  const location = useLocation();
  const hasChildren = item.children && item.children.length > 0;

  // Active check: parent is active if its path matches OR any child is active
  const isActive = hasChildren
    ? item.children!.some((child) => location.pathname.startsWith(child.path!))
    : item.path
    ? location.pathname.startsWith(item.path)
    : false;

  const [expanded, setExpanded] = useState(isActive);
  const toggleExpand = () => setExpanded((prev) => !prev);

  // ---- Parent with NO children ----
  if (!hasChildren) {
    return (
      <li>
        <NavLink
          to={item.path!}
          end={item.path === "/dashboard"}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-base font-medium font-lato transition-all duration-150",
              isActive
                ? "bg-brand-primary text-white"
                : "text-text-nav hover:bg-bg-soft hover:text-text-primary"
            )
          }
        >
          {({ isActive }) => (
            <>
              <item.icon
                className={cn(
                  "w-5 h-5 shrink-0",
                  isActive ? "text-white" : "text-text-nav"
                )}
              />
              <span>{item.label}</span>
            </>
          )}
        </NavLink>
      </li>
    );
  }

  return (
    <li>
      <button
        onClick={toggleExpand}
        className={cn(
          "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-base font-medium font-lato transition-all duration-150",
          isActive
            ? "bg-brand-primary text-white"
            : "text-text-nav hover:bg-bg-soft hover:text-text-primary"
        )}
      >
        <item.icon
          className={cn(
            "w-5 h-5 shrink-0",
            isActive ? "text-white" : "text-text-nav"
          )}
        />
        <span className="flex-1 text-left">{item.label}</span>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown
            className={cn(
              "w-4 h-4",
              isActive ? "text-white" : "text-text-nav"
            )}
          />
        </motion.span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden ml-4 pl-4 mt-1 space-y-1"
          >
            {item.children!.map((child) => (
              <li key={child.id}>
                <NavLink
                  to={child.path!}
                  className={({ isActive }) =>
                    cn(
                      "block px-3 py-2 rounded-lg text-sm font-lato transition-all duration-150 font-medium",
                      isActive
                        ? "bg-brand-primary/10 text-brand-primary"
                        : "text-text-muted hover:text-text-primary hover:bg-bg-soft"
                    )
                  }
                >
                  {child.label}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

export default DashboardSidebar;
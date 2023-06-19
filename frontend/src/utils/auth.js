const authorizationRoles = {
  organizer: "organizer",
  user: "user",
  guest: "guest",
};

// const authorizationRoutes = {
//   organizer: [""],
//   user: [],
//   guest: [],
// };


export const isAuthorized = (user, resource) => {
  const userRole = !user ? authorizationRoles.guest : user.role;
  // handle dynamic routes
  const routeRole = resource.split("/")[1];
  return userRole === routeRole;
};




// const isAuthorized = (userRole, routeRole) => {
//   return userRole === routeRole;
// };

// export const authorizationRoutesByRole = {
//   organizer: [
//     {
//       path: "/dashboard",
//       component: Dashboard,
//       layout: "/admin",
//     },
//     {
//       path: "/profile",
//       component: UserProfile,
//       layout: "/admin",
//     },
//   ],
//   user: [
//     {
//       path: "/profile",
//       component: UserProfile,
//       layout: "/admin",
//     },
//   ],
//   guest: [
//     {
//       path: "/profile",
//       component: UserProfile,
//       layout: "/admin",
//     },
//   ],
// };
// }


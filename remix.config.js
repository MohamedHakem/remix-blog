// /**
//  * @type {import('@remix-run/dev').AppConfig}
//  */
// module.exports = {
//   cacheDirectory: "./node_modules/.cache/remix",
//   ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
//   serverDependenciesToBundle: [
//     "marked",
//   ],
// };

// from/for deploying to vercel
/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
 module.exports = {
  appDirectory: "app",
  browserBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "api/_build",  
  serverBuildTarget: "vercel"
};
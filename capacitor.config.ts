import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.sch.mathemagic",
  appName: "Mathemagic",
  webDir: "out",
  server: {
    url: "https://school-learning-app.vercel.app",
    cleartext: false,
  },
  android: {
    allowNavigation: ["my.spline.design", "*.spline.design"],
  },
  ios: {
    contentInset: "always", // optional, UI
    allowNavigation: ["my.spline.design", "*.spline.design"], // sama kayak Android
  },
} as CapacitorConfig;

export default config;

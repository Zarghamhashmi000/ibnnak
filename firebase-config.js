// ============================================================================
// Ibnnak — Firebase configuration
// ----------------------------------------------------------------------------
// TODO (before go-live): Ibnnak needs its OWN Firebase project.
//  1. Create a free Firebase project at https://console.firebase.google.com
//     (do NOT reuse any other shop's project — this shop is separate)
//  2. Add a Web app ( </> ) to the project and copy its config values
//  3. Paste them below, replacing each PASTE_YOUR_* placeholder
//  4. Commit/push this file — the shop and admin panel will connect
//
// Until real values are pasted, the site runs in "not configured" mode:
// it shows elegant empty states and logs one console warning. No errors.
// ============================================================================

const firebaseConfig = {
  apiKey: "AIzaSyBJHfpn0pJN8WQx-PRLuk32JeKM16twi30",
  authDomain: "ibnnak-91972.firebaseapp.com",
  projectId: "ibnnak-91972",
  storageBucket: "ibnnak-91972.firebasestorage.app",
  messagingSenderId: "335401374622",
  appId: "1:335401374622:web:3a5e951caa0b378f6bbc8f"
};

// True only when the owner has pasted real values above.
const FIREBASE_CONFIGURED =
  typeof firebaseConfig !== "undefined" &&
  firebaseConfig.apiKey !== "PASTE_YOUR_API_KEY" &&
  firebaseConfig.projectId !== "PASTE_YOUR_PROJECT_ID";

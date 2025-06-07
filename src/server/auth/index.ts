import { auth, signIn, signOut } from "./config";
import { cache } from "react";

const cachedAuth = cache(auth);

export { cachedAuth as auth, signIn, signOut };

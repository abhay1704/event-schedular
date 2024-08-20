import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "./config";

const auth = getAuth(app);

export const signUPByEmailPwd = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return {
      success: true,
      accessToken: user.accessToken,
      uid: user.uid,
      email: user.email,
      name: user.displayName,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
    return {
      success: false,
      errorCode,
      errorMessage,
    };
  }
};

export const signInByEmailPwd = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("Logged in Successfully from Authenticat.js");

    return {
      success: true,
      accessToken: user.accessToken,
      uid: user.uid,
      email: user.email,
      name: user.displayName,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      success: false,
      errorCode,
      errorMessage,
    };
  }
};

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  provider.addScope(
    "https://www.googleapis.com/auth/admin.directory.user.readonly"
  );
  provider.addScope("https://www.googleapis.com/auth/calendar.events");

  try {
    const result = signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // const email =
    // The signed-in user info.
    const user = result.user;
    return {
      success: true,
      user: user,
      token: token,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);

    return {
      success: false,
      errorCode,
      errorMessage,
      email,
      credential,
    };
  }
};

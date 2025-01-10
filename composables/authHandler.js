
let store;
import CryptoJS from 'crypto-js';
import pkg from "cbor-js";
const { decode } = pkg
export const AuthHandler = async (id, router) => {
  let nuxt = useNuxtApp();
  store = useLoungeStore();
  let crud = nuxt.$crud;
  try {
    store.SetActiveUser(id, true);
    const res = await crud.getSingleDoc('USERS', id);
    RouteUser(res.data().account, router);
    store.SetUserData(res.data());
    return { success: true };
  } catch (err) {
    console.log(err);
  }
};

export const AuthHandlerMini = async (id) => {
  let nuxt = useNuxtApp();
  store = useLoungeStore();
  let crud = nuxt.$crud;
  try {
    store.SetActiveUser(id, true);
    const res = await crud.getSingleDoc('USERS', id);
    store.SetUserData(res.data());
    return { success: true };
  } catch (err) {
    console.log(err);
  }
};
export const GetWebAuth = async () => {
  try {
    let nuxt = useNuxtApp()
    let axios = nuxt.$UseAxios
    let userCred = TokenGetter();
    const res = await axios.get(`/passcode?id=${userCred.uid}`, {
      headers: {
        Accept: "application/json",
        Authorization: userCred.token,
      },
    });
    let data = res.data;
    return data
  } catch (err) {
    console.log(err)
    return { status: false, ...err }
  }
}
export const RegisterAuth = async (docid, fullname) => {
  try {
    let nuxt = useNuxtApp();
    let crud = nuxt.$crud;
    const publicKeyCredentialCreationOptions = {
      challenge: Uint8Array.from(
        "MMSA" + Math.floor(Math.random() * 212932093).toString(),
        (c) => c.charCodeAt(0)
      ),
      rp: {
        name: "evotingclient.vercel.app",
        id: "evotingclient.vercel.app",
        // name: "localhost",
        // id: "localhost",
      },
      user: {
        id: Uint8Array.from(docid, (c) => c.charCodeAt(0)),
        name: fullname,
        displayName: fullname,
      },
      pubKeyCredParams: [
        { alg: -7, type: "public-key" }, // ES256
      ],
      authenticatorSelection: {
        authenticatorAttachment: "platform",
      },
      timeout: 60000,
      attestation: "direct",
    };
    const credential = await navigator.credentials.create({
      publicKey: publicKeyCredentialCreationOptions,
    });
    // decode the clientDataJSON into a utf-8 string
    const utf8Decoder = new TextDecoder("utf-8");
    const decodedClientData = utf8Decoder.decode(
      credential.response.clientDataJSON
    );
    // parse the string as an object
    const clientDataObj = JSON.parse(decodedClientData);
    const attestationObject = new Uint8Array(
      credential.response.attestationObject
    );
    const decodedAttestationObj = await decode(attestationObject.buffer);

    const { authData } = decodedAttestationObj;
    // get the length of the credential ID
    const dataView = new DataView(new ArrayBuffer(2));
    const idLenBytes = authData.slice(53, 55);
    idLenBytes.forEach((value, index) => dataView.setUint8(index, value));
    const credentialIdLength = dataView.getUint16();
    // get the credential ID
    const credentialId = authData.slice(55, 55 + credentialIdLength);
    // get the public key object
    const publicKeyBytes = authData.slice(55 + credentialIdLength);
    let crednBytes = arrayBufferToBase64(credentialId);
    let pubKeyByte = arrayBufferToBase64(publicKeyBytes);
    await crud.updateDocument('USERS', docid, { credentialId: crednBytes, publicKeyBytes: pubKeyByte })
    let data = { credentialId: crednBytes, publicKeyBytes: pubKeyByte };
    console.log(data);
    return data
  } catch (err) {
    console.log(err);
    return { status: false, ...err }
  }
}

export const LoginAuth = async () => {
  try {
    let nuxt = useNuxtApp();
    let crud = nuxt.$crud;
    let store = useLoungeStore()
    const res = await crud.getSingleDoc('USERS', store.activeUser);
    let userData = res.data()
    const { credentialId, publicKeyBytes } = userData
    console.log(credentialId, publicKeyBytes);
    let cred = base64ToArrayBuffer(credentialId)
    const publicKeyCredentialRequestOptions = {
      challenge: Uint8Array.from(
        Math.floor('MASF' + Math.random() * 26836903203).toString(), c => c.charCodeAt(0)),
      allowCredentials: [{
        id: cred,
        type: 'public-key',
        transports: ['internals'],
      }],
      timeout: 60000,
    }
    const assertion = await navigator.credentials.get({
      publicKey: publicKeyCredentialRequestOptions
    });
    const utf8Decoder = new TextDecoder('utf-8');
    const decodedClientData = utf8Decoder.decode(
      assertion.response.clientDataJSON)
    const clientDataObj = JSON.parse(decodedClientData);
    console.log(assertion)
    if (assertion.rawId) {
      console.log("Hooray! User is authenticated! 🎉");
      return {
        status: true, credentialId: credentialId
      }
    } else {
      console.log("Verification failed. 😭");
      return { status: false }
    }
  } catch (err) {
    console.log(err)
    return { status: false, ...err }

  }
}

export const DeleteAuth = async (docid) => {
}

export const arrayBufferToBase64 = (buffer) => {
  const binaryString = String.fromCharCode.apply(
    null,
    new Uint8Array(buffer)
  );
  return btoa(binaryString);
}

export const base64ToArrayBuffer = (base64) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export const base64ToUint8Array = (base64) => {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export const importPublicKey = async (publicKeyBytes) => {
  try {
    const algorithm = {
      name: "ECDSA",
      namedCurve: "P-256" // This is for ES256 (ECDSA using P-256)
    };

    const key = await window.crypto.subtle.importKey(
      "raw",                // format of the key to import
      publicKeyBytes.buffer,       // the actual key data
      algorithm,            // the algorithm the key will be used with
      true,                 // whether the key is extractable (i.e. can be exported)
      ["verify"]            // what this key can do
    );

    return key;
  } catch (err) {
    console.log(err)
    return err
  }

}

export const verifySignature = async (publicKey, signature, signedData) => {
  try {
    const algorithm = {
      name: "ECDSA",
      hash: { name: "SHA-256" },
    };

    const isValid = await window.crypto.subtle.verify(
      algorithm,             // algorithm to use for verification
      publicKey,             // the public key to use for verification
      signature,             // the signature to verify
      signedData             // the data that was signed
    );

    return isValid;
  } catch (err) {
    console.log(err)
    return err
  }

}

function RouteUser(usertype, router) {
  switch (usertype) {
    case 'client':
      router.push({ path: '/client' });
      break;

    case 'advertiser':
      router.push({ path: '/advertiser' });
      break;

    case 'agency':
      router.push({ path: '/agency' });
      break;
    case 'admin':
      router.push({ path: '/admin' });
      break;
    default:
      ShowSnack('Cannot Route User. Registration Type Missing', 'negative');
        router.push({ path: '/' });
      break;
  }
}

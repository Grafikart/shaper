import Crypto, {
  KeyLike,
  SignKeyObjectInput,
  SignPrivateKeyInput,
  VerifyKeyObjectInput,
  VerifyPublicKeyInput,
} from "crypto";

const Algo = "SHA256";

export function sign(
  str: string,
  privateKey: KeyLike | SignKeyObjectInput | SignPrivateKeyInput
) {
  const data = Buffer.from(str);
  const s = Crypto.sign(Algo, data, privateKey);
  return s.toString("base64");
}

export function verify(
  str: string,
  signature: string,
  publicKey: KeyLike | VerifyKeyObjectInput | VerifyPublicKeyInput
): boolean {
  return Crypto.verify(
    Algo,
    Buffer.from(str),
    publicKey,
    Buffer.from(signature, "base64")
  );
}

import { getDownloadURL, StorageReference, uploadBytes } from '@firebase/storage'

async function uploadFile(
  filesRef: StorageReference,
  fileOrBytes: Uint8Array | ArrayBuffer,
) {
  try {
    const snapshot = await uploadBytes(filesRef, fileOrBytes)
    const downloadLink = await getDownloadURL(snapshot.ref)
    console.log(downloadLink);
    return downloadLink
  } catch (e) {
    console.log("Error while generating download link :", e);
    return "Error while generating download link ";
  }
}

export { uploadFile }

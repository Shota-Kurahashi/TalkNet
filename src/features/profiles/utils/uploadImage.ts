import mime from "mime-types";
import { v4 as uuid } from "uuid";
import { axios } from "src/libs/client";

export async function uploadImage({ file }: { file: File }) {
  const name = uuid();
  const ext = mime.extension(file.type);
  const filename = encodeURIComponent(`${name}.${ext}`);
  const fileType = encodeURIComponent(file.type);
  const res = await axios.get(`/images?file=${filename}&fileType=${fileType}`);
  const { url, fields } = await res.data;
  const formData = new FormData();

  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value as string | Blob);
  });

  return axios.post(url, formData).then(() => ({ url, filename, fields }));
}

export const readFile = async (
  onValid: (filename: string) => void,
  file: File
) => {
  const { filename } = await uploadImage({
    file,
  });
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = async () => {
    onValid(filename);
  };
};

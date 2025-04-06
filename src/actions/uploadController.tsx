"use server";
import { postFormData, putFormData } from "@/lib";
import { photoReq } from "@/lib/reqAPI/apiRequests";
import Cookies from "js-cookie";

export async function registerProfile(
  formData: FormData,
  userId: number,
  userPhoto: string
) {
  const file = formData.get("file") as File;

  if (file) {
    formData.append("file", file);

    try {
      const options = {
        headers: {
          authorization: `Bearer ${Cookies.get("jwt")}`,
          userId,
        },
      };
      if (!userPhoto) {
        await postFormData(
          "/controller/photo/createNewPhoto",
          formData,
          options
        );
      } else {
        await putFormData("/controller/photo/updatePhoto", formData, options);
      }

      const result = await photoReq(userId);
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}

export default registerProfile;

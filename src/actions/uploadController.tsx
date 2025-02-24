"use server";
import { postFormData, putFormData } from "@/lib";
import { photoReq } from "@/lib/reqAPI/apiRequests";
import Cookies from "js-cookie";

export async function registerProfile(
  formData: FormData,
  userId: number,
  userPhoto: string
) {
  const file = formData.get("file");

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

// export async function registerProfile(prevState, formData) {
//   const errors = {};
//   // const formData = new FormData();
//   const myFile = { file: formData.get("file") };
//   if(typeof myFile.file==='file'){
//      (async () => {
//         if (myFile.file) {
//           setStatus({ message: "uploading" });
//           // const formData = new FormData();
//           formData.append("file", myFile.file);

//           try {
//             const options = {
//               headers: {
//                 authorization: `Bearer ${Cookies.get("jwt")}`,

//                 userId: user.id,
//               },
//             };
//             if (!userPhoto) {
//               const result = await postFormData(
//                 "/controller/photo/createNewPhoto",
//                 formData,

//                 options
//               );
//               // setStatus(result);
//               return result;
//             } else {
//               const result = await putFormData(
//                 "/controller/photo/updatePhoto",
//                 formData,

//                 options
//               );

//               // setStatus(result);
//               return result;
//             }
//           } catch (error) {
//             console.error(error);
//             setStatus(error);
//           }
//         }
//       })();
//   }
//   if (typeof myFile.file !== "file") errors.file = "you must upload a file";
//   if (errors.file) {
//     return { errors: errors, success: false };
//   } else {
//     return { success: true };
//   }
// }

export default registerProfile;

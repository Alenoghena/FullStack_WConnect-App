"use client";
import React from "react";
import Form from "next/form";
import { registerProfile } from "@/actions/uploadController";

const ProfilePicture = ({ userId, userPhoto, setUserPhoto }) => {
  return (
    <Form
      action={async (formData) => {
        const resp = await registerProfile(formData, userId, userPhoto);
        setUserPhoto(resp);
      }}
      className="w-20 fixed left-10 top-28"
    >
      <div>
        <div>
          <input id="file" type="file" name="file" />
        </div>

        <button className="submit">Upload a file</button>

        {/* <Result status={status} /> */}
      </div>
    </Form>
  );
};

// const Result = ({ status }) => {
//   if (status.message === "Photo updated successfully") {
//     return <p>✅ File uploaded successfully!</p>;
//   } else if (status.message === "fail") {
//     return <p>❌ File upload failed!</p>;
//   } else if (status.message === "uploading") {
//     return <p>⏳ Uploading selected file...</p>;
//   } else {
//     return null;
//   }
// };

export default ProfilePicture;

///////now
// "use client";
// import React from "react";
// import Form from "next/form";

// const ProfilePicture = ({
//   file,
//   status,
//   handleFileChange,
//   handleUpload,
//   showFile,
// }) => {
//   return (
//     <Form action={"/"} className="w-20 absolute left-10">
//       {showFile && (
//         <div className="mt-40">
//           <div>
//             <input
//               id="file"
//               type="file"
//               name="file"
//               onChange={(e) => handleFileChange(e)}
//             />
//           </div>

//           {file && (
//             <button onClick={() => handleUpload(file)} className="submit">
//               Upload a file
//             </button>
//           )}

//           <Result status={status} />
//         </div>
//       )}
//     </Form>
//   );
// };

// const Result = ({ status }) => {
//   if (status.message === "Photo updated successfully") {
//     return <p>✅ File uploaded successfully!</p>;
//   } else if (status.message === "fail") {
//     return <p>❌ File upload failed!</p>;
//   } else if (status.message === "uploading") {
//     return <p>⏳ Uploading selected file...</p>;
//   } else {
//     return null;
//   }
// };

// export default ProfilePicture;

// ("use client");
// import React from "react";
// import Form from "next/form";
// import { registerProfile } from "@/actions/uploadController";

// // // import { init } from "next/dist/compiled/webpack/webpack";
// import { useFormStatus } from "react-dom";
// import { useActionState } from "react";

// function SubmitButton() {
//   const { pending } = useFormStatus();
//   return (
//     <button disabled={pending} type="submit" onClick={() => handleUpload(file)}>
//       Upload a file
//     </button>
//   );
// }

// const ProfilePicture = ({
//   file,
//   status,
//   handleFileChange,
//   handleUpload,
//   showFile,
// }) => {
//   const [formState, formAction] = useActionState(registerProfile(), null);

//   return (
//     <Form action={formAction} className="w-20 absolute left-10">
//       {/* {userPhoto && (
//         <img
//           src={`${API_PHOTO_URL}${userPhoto.profilePhoto}`}
//           alt="UserPix"
//           style={{ width: 120, height: 120, borderRadius: 50 }}
//           className="img-user"
//           onClick={() => setShowFile(!showFile)}
//         />
//       )} */}

//       {showFile && (
//         <div className="input-group">
//           <div>
//             <input
//               id="file"
//               type="file"
//               name="file"
//               onChange={(e) => handleFileChange(e)}
//             />
//             {formState.errors?.file && <p>{formState.errors?.file}</p>}
//           </div>

//           {/* {file && <SubmitButton />} */}

//           {file && (
//             <button onClick={() => handleUpload(file)} className="submit">
//               Upload a file
//             </button>
//           )}

//           <Result status={status} />
//         </div>
//       )}
//     </Form>
//   );
// };

// const Result = ({ status }) => {
//   if (status.message === "Photo updated successfully") {
//     return <p>✅ File uploaded successfully!</p>;
//   } else if (status.message === "fail") {
//     return <p>❌ File upload failed!</p>;
//   } else if (status.message === "uploading") {
//     return <p>⏳ Uploading selected file...</p>;
//   } else {
//     return null;
//   }
// };

// export default ProfilePicture;

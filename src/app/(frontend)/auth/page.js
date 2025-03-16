"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthHeader from "@/components/AuthHeader";
import { loginUser } from "@/actions/loginUser";
import { createUser } from "@/actions/createUser";
import Form from "next/form";
import Cookies from "js-cookie";

const Autheticate = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [authButtonText, setAuthButtonText] = useState("Login");
  const [createStatus, setCreateStatus] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const router = useRouter();

  //This simply passes the data to the database, Register or login User

  const toggleForm = () => {
    if (authButtonText === "Login") {
      setIsNewUser(true);
      setAuthButtonText("Sign Up");
    } else {
      setIsNewUser(false);
      setAuthButtonText("Login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-2xl min-w-96 mx-auto">
      <AuthHeader />
      {createStatus && <p>{createStatus}</p>}

      <Form
        action={async (formData) => {
          if (isNewUser) {
            const resp = await createUser(formData);
            return resp?.success;
          }
          const resp = await loginUser(formData);
          const accessToken = resp?.accessToken;
          const email = resp?.email;
          Cookies.set("jwt", accessToken, {
            secure: true,
            expires: 1,
            httpOnly: true,
            sameSite: true,
          });
          localStorage.setItem("email", email);
          router.push("/");
        }}
      >
        <p className="text-center mb-6 text-3xl">Wconnect</p>

        <div className="flex flex-col items-center justify-center gap-4 text-black">
          {isNewUser && (
            <>
              <label htmlFor="username">Username:</label>

              <input
                id="username"
                name="username"
                placeholder="Ex. Username..."
              />
            </>
          )}

          <label htmlFor="email">Email:</label>

          <input id="email" name="email" placeholder="Ex. Ex@gmail.com..." />
          <label htmlFor="password">Password:</label>

          <input
            id="password"
            type="password"
            name="password"
            placeholder="Ex. John123..."
          />

          <button type="submit" className="my-4 text-white">
            {authButtonText}
          </button>
        </div>

        {!isNewUser && (
          <div className="messageAuth">
            New to Wconnect App?
            <span
              className="cursor-pointer ml-4 text-yellow-500"
              onClick={toggleForm}
            >
              Click to Sign Up
            </span>
          </div>
        )}
        {isNewUser && (
          <div className="line-clamp-1">
            Already on Wconnect App?
            <span
              className="cursor-pointer ml-4 text-yellow-500"
              onClick={toggleForm}
            >
              Click to Login
            </span>
          </div>
        )}
      </Form>

      {errMsg && <p className="error">{errMsg}</p>}
    </div>
  );
};
export default Autheticate;

// "use client";
// import React, { useState } from "react";
// // import Cookies from "js-cookie";
// import { useRouter} from "next/navigation";
// // import { Formik, Form, Field, ErrorMessage } from "formik";
// import { postData } from "@/lib";
// import Form from "next/form";
// // import "./Auth.css";

// function Auth({ setAuth }) {
//   const [isNewUser, setIsNewUser] = useState(false);
//   const [authButtonText, setAuthButtonText] = useState("Sign In");
//   const [createStatus, setCreateStatus] = useState("");
//   const [errMsg, setErrMsg] = useState("");
//   const [user, setUser] = useState({ username: "", email: "", password: "" });
//   const [loginData, setLoginData] = useState({ email: "", password: "" });

//   // const router = useRouter();
//   console.log("What????");

//   //This simply passes the data to the database, Register or login User
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("success or failure");
//       if (isNewUser) {
//         const { success } = await postData("/createNewUser", user);
//         console.log(success);
//         if (success) {
//           setCreateStatus(success);
//         }
//       } else {
//         const user = await postData("/auth", loginData);
//         console.log(user);
//         setAuth(user.accessToken);
//         // sessionStorage.setItem("jwt", user.accessToken);
//         // Cookies.set("jwt", user.accessToken, {
//         //   expires: 7,
//         //   secure: true,
//         // });
//         redirect("/");
//         // router.push("/");
//       }
//     } catch (err) {
//       setErrMsg(err.message);
//     }
//   };

//   const toggleForm = () => {
//     if (authButtonText === "Sign In") {
//       setIsNewUser(true);
//       setAuthButtonText("Sign Up");
//     } else {
//       setIsNewUser(false);
//       setAuthButtonText("Sign In");
//     }
//   };
//   return (
//     <div className="flex flex-col items-center justify-center gap-4 text-2xl min-w-96 mx-auto mt-40">
//       {createStatus && <p>{createStatus}</p>}

//       <Form action={"/"} scroll={false} onSubmit={(e) => onSubmit(e)}>
//         <p className="text-center mb-6 text-3xl">Wconnect</p>

//         <div className="flex flex-col items-center justify-center gap-4 text-black">
//           {isNewUser && (
//             <>
//               <label htmlFor="username">Username:</label>

//               <input
//                 id="username"
//                 name="username"
//                 placeholder="Ex. Username..."
//                 value={user.username}
//                 onChange={(e) => {
//                   setUser({ ...user, username: e.target.value });
//                 }}
//               />
//             </>
//           )}

//           <label htmlFor="email">Email:</label>

//           <input
//             id="email"
//             name="email"
//             placeholder="Ex. Ex@gmail.com..."
//             value={user.email}
//             onChange={(e) => {
//               isNewUser
//                 ? setUser({ ...user, email: e.target.value })
//                 : setLoginData({ ...loginData, email: e.target.value });
//             }}
//           />
//           <label htmlFor="password">Password:</label>

//           <input
//             id="password"
//             type="password"
//             name="password"
//             placeholder="Ex. John123..."
//             value={user.password}
//             onChange={(e) => {
//               isNewUser
//                 ? setUser({ ...user, password: e.target.value })
//                 : setLoginData({ ...loginData, password: e.target.value });
//             }}
//           />

//           <button type="submit" className="my-4 text-white">
//             {authButtonText}
//           </button>
//         </div>

//         {!isNewUser && (
//           <div className="messageAuth">
//             New to Wconnect App?
//             <span
//               className="cursor-pointer ml-4 text-yellow-500"
//               onClick={toggleForm}
//             >
//               Click to Sign Up
//             </span>
//           </div>
//         )}
//         {isNewUser && (
//           <div className="line-clamp-1">
//             Already on Wconnect App?
//             <span
//               className="cursor-pointer ml-4 text-yellow-500"
//               onClick={toggleForm}
//             >
//               Click to Sign In
//             </span>
//           </div>
//         )}
//       </Form>

//       {errMsg && <p className="error">{errMsg}</p>}
//     </div>
//   );
// }
// export default Auth;

// Cookies.set("jwt", resp.accessToken, {
//   expires: 7,
//   httpOnly: true,
//   secure: true,
// });
// localStorage.setItem("jwt", resp.accessToken);

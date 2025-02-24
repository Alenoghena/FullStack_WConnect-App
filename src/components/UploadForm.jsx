// 'use client';
// import {registerProfile} from '@/actions/uploadController';
// import { init } from 'next/dist/compiled/webpack/webpack';
// import { useFormState, useFormStatus } from 'react-dom';

// function UploadForm({file, handleFileChange, handleUpload}) {
//     const [formState, formAction] = useFormState(registerProfile,{isLoading: false});

//   return (
//     <form action={'/'} className='max-w-xs'>
//       <div className='mb-3'>
//         <input
//               id="file"
//               type="file"
//               name="file"
//               onChange={(e) => handleFileChange(e)}
//          />

//       </div>
//       {file && (
//             <button onClick={() => handleUpload(file)} className="text-xl" type='submit'>
//               Upload a file
//             </button>
//           )}
//     </form>
//   )
// }

// export default UploadForm

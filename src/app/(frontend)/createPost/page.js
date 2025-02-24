import React from "react";

import Form from "next/form";
import { MdSend } from "react-icons/md";
import { createPost } from "@/actions/createPost";

const CreatePosts = ({ user, setPosts }) => {
  const { id, username } = user;

  return (
    <div className="flex justify-center items-center gap-14 mx-auto mt-8">
      <Form
        action={async (formData) => {
          const resp = await createPost(formData, id, username);
          setPosts(resp);
        }}
        className="flex justify-center items-center gap-2 mx-auto fixed bottom-4"
      >
        <div className="text-black text-lg">
          <label htmlFor="title" className="absolute left-[99999px]">
            Title:
          </label>

          <input id="title" name="title" placeholder="Ex. Title..." />
        </div>
        <div className="text-black text-lg">
          <label htmlFor="postText" className="absolute left-[99999px]">
            Post:
          </label>

          <input id="postText" name="postText" placeholder="Ex. post..." />
        </div>

        <button type="submit" className="btn--post">
          <MdSend />
        </button>
      </Form>
    </div>
  );
};

export default CreatePosts;

"use client";
import React from "react";
import Form from "next/form";
import { MdSend } from "react-icons/md";
import { createComments } from "@/actions/createComments";

const CreateComment = ({ user, postId, setComments }) => {
  const username = user?.username;

  return (
    <div className="flex justify-center items-center gap-14 mx-auto mt-8">
      <Form
        action={async (formData) => {
          const resp = await createComments(formData, postId, username);
          setComments(resp);
        }}
        className="flex justify-center items-center gap-2 mx-auto fixed bottom-4"
      >
        <div className="text-black text-lg">
          <label htmlFor="commentBody" className="absolute left-[99999px]">
            Comment:
          </label>

          <input
            id="commentBody"
            name="commentBody"
            placeholder="Ex. post..."
          />
        </div>

        <button type="submit" className="btn--post">
          <MdSend />
        </button>
      </Form>
    </div>
  );
};

export default CreateComment;

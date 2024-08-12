import Link from "next/link";
import React from "react";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full justify-center items-center text-center max-w-full  flex-col p-4">
      <h1 className="head_text">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>
  <div className="flex justify-center">
  <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl  justify-center flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-santoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here ..."
            required
            className="form_textarea"
          ></textarea>
        </label>
        <label className="">
          <span className="font-santoshi font-semibold text-base text-gray-700">
            Tag{' '}
          </span>
          <span className="font-normal">(#product , #webdevelopment, #idea)</span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          ></input>
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
            <Link href="/" className="text-gray-500 text-sm">
                Cancel
            </Link>
            <button type="submit" disabled={submitting} className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
              {submitting ? `${type}...` : type}
            </button>
        </div>
      </form>
  </div>
    </section>
  );
};

export default Form;

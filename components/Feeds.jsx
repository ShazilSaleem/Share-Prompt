"use client";
import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
const PromptCardList = ({ data, handleTagClick }) => {
  console.log("DATA",data)
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => {
        return <PromptCard
          key={prompt._id}
          post={prompt}
          handleTagClick={handleTagClick}
        />;
      })}
    </div>
  );
};
const Feeds = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const handleSearchChange = () => {};
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts()
  }, []);
console.log(posts)
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer mx-4"
        ></input>
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feeds;

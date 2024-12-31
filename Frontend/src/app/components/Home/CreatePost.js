import { createPost } from "@/app/actions/Action";
import React, { useState } from "react";
import { IoIosImages } from "react-icons/io";
import { useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io";

function CreatePost({ toggle, openModal }) {
  const [image, setImage] = useState(null);
  const [content, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create a post.");
      return;
    }

    if (!image || !content) {
      alert("Please provide both image and content.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("content", content);

    try {
      await dispatch(createPost(formData, token));

      toggle();
      setImage(null);
      setDescription("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleBackdropClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`${openModal ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      <div
        onClick={handleBackdropClick}
        className={`${
          openModal ? "scale-100" : "scale-95"
        } duration-300 fixed top-0 left-0 bg-black/50 backdrop-blur-lg flex items-center justify-center w-full h-full`}
      >
        <div className="p-4 w-[40%]">
          <div className="h-full border-2 border-[#393939] bg-black border-opacity-60 rounded-lg overflow-hidden">
            <div className="py-3 px-6 text-white text-center gap-4 relative">
              Create new post
              <IoMdClose
                className="absolute top-3 right-3 text-xl cursor-pointer"
                onClick={() => {
                  toggle();
                }}
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="h-[500px] bg-[#262626] flex items-center justify-center text-white">
                <div className="text-center">
                  <label>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="mb-4 px-3 py-1 rounded-lg hidden"
                    />
                    <IoIosImages className="text-[80px] mb-4 text-[#a8a8a8] mx-auto" />
                    <div className="text-xl mb-3">
                      Drag photos here
                    </div>
                  </label>
                  <div className="mb-4">
                    <textarea
                      placeholder="Write a description"
                      value={content}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-2 placeholder:text-sm border w-full border-[#393939] bg-[#161616] rounded focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 px-5 py-2 rounded-md"
                  >
                    POST
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;

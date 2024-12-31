import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegHeart } from "react-icons/fa6";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FiSend } from "react-icons/fi";
import {
  dislikePosts,
  followingUser,
  followUser,
  getPosts,
  likePosts,
} from "@/app/actions/Action";
import { FaHeart } from "react-icons/fa";

function PostPage() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post);
  const id = localStorage.getItem("id");
  console.log(posts, "posts");
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const unlikeCalled = (id) => {
    const payload = {
      postId: id,
    };
    dispatch(dislikePosts(payload));
  };

  const likeCalled = (id) => {
    const payload = {
      postId: id,
    };
    dispatch(likePosts(payload));
  };

  const followingCalled = (id) => {
    const payload = {
      followingId: id,
    };
    dispatch(followingUser(payload));
  };

  const followCalled = (id) => {
    const payload = {
      followingId: id,
    };
    dispatch(followUser(payload));
  };

  return (
    <div className="px-[250px] flex">
      <div className="p-4 w-[70%]">
        {posts?.posts?.length > 0 ? (
          <>
            {posts?.posts?.map((post) => {
              return (
                <div
                  key={post.id}
                  className="border-2 border-[#393939] border-opacity-60 rounded-lg overflow-hidden mb-4"
                >
                  <div className="py-3 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-[40px] h-[40px] bg-black text-lg flex items-center justify-center rounded-full">
                        {post.author?.split('')[0]}
                      </div>
                      {post.author}
                    </div>
                    {localStorage.getItem("id") == post.userId ? (
                      ""
                    ) : (
                      <button
                        className="bg-[#4d4d4d] text-xs px-3 py-1 rounded"
                        onClick={() => {
                          if (post?.is_following == true) {
                            followingCalled(post.userId);
                          } else {
                            followCalled(post.userId);
                          }
                        }}
                      >
                        {post?.is_following == true ? "Following" : "Follow"}
                      </button>
                    )}
                  </div>
                  <img
                    className="h-[400px] w-full object-cover object-center"
                    src={post.image_url}
                    alt="blog"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-2xl mb-3">
                      {post.liked_user_ids?.includes(parseInt(id)) ? (
                        <FaHeart
                          className="text-red-600 cursor-pointer"
                          onClick={() => {
                            unlikeCalled(post.id);
                          }}
                        />
                      ) : (
                        <FaRegHeart
                          className="hover:text-[#a8a8a8] cursor-pointer"
                          onClick={() => {
                            likeCalled(post.id);
                          }}
                        />
                      )}

                      <IoChatbubbleOutline className="hover:text-[#a8a8a8] cursor-pointer" />
                      <FiSend className="hover:text-[#a8a8a8] cursor-pointer" />
                    </div>
                    <p className="mb-2">{post.like_count} likes</p>
                    <p className="leading-relaxed mb-3">{post.content}</p>
                    <h1 className="title-font font-medium text-[#A8A8A8] mb-3">
                      View all 12 comments
                    </h1>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <p>No posts available</p>
        )}
      </div>      
    </div>
  );
}

export default PostPage;

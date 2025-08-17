"use client";

import { useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import AuthPopup from "./Authpopup";
import PostCard from "./Postcard";
import mouse from "../assets/mouse.svg"
import loginLogout from "../assets/loginlogout.svg"
interface Post {
  id: number;
  content: string;
  createdAt: Date;
  author:string
}

interface User {
  name: string;
  email: string;
  password: string;
}

export default function FeedList() {
  // ✅ Initialize posts safely from localStorage

  const [isLogin, setLogin] = useState<boolean>(() => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        return true
      }
      return false;
    } catch (err) {
        return false;
    }
  });
;
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const raw = localStorage.getItem("posts");
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return parsed.map((p: any) => ({
        ...p,
        createdAt: new Date(p.createdAt), // revive date
      }));
    } catch (err) {
      console.error("Invalid posts JSON in localStorage:", err);
      return [];
    }
  });

  const [showAuthPopUp, toggleAuthPopup] = useState(false);


  const alerFunction = () => {
    if (!isLogin) {
        toggleAuthPopup(true);
    }
    else {
        alert("feature not implemented")
    }
  }

  // Callback for when TextEditor submits a post
  const handleAddPost = (content: string) => {
    if (!content.trim()) return;

    const user = localStorage.getItem("user");
    if (user) {
      const newPost: Post = {
        id: Date.now(),
        content,
        createdAt: new Date(),
        author: JSON.parse(user).name
      };
      setPosts([newPost, ...posts]);
    } else {
      localStorage.setItem("pendingPost", content);
      toggleAuthPopup(true);
    }
  };

  // ✅ Sync posts to localStorage
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  // ✅ Handle login success
  const handleAuthSuccess = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    toggleAuthPopup(false);
    setLogin(true)

    const pendingPost = localStorage.getItem("pendingPost");
    if (pendingPost) {
      const newPost: Post = {
        id: Date.now(),
        content: pendingPost,
        createdAt: new Date(),
        author: user.name
      };
      setPosts((prev) => [newPost, ...prev]);
      localStorage.removeItem("pendingPost");
    }
  };

  function toogleLogin(): void {
    if (isLogin) {
        localStorage.removeItem('user');
        setLogin(false);
    }
    else {
        toggleAuthPopup(true);
    }
  }

  return (
    <>
        <div className="justify-between flex items-center">
            <div className="flex items-center gap-2">
                <img src={mouse} alt="mouse"></img>
                <span className="text-black">foo-rum</span>
            </div>
            <div className="flex justify-center mb-2">
                <div className="flex items-center gap-2 justify-center cursor-pointer" onClick={toogleLogin}>
                    <span>{isLogin ?  'logout' : 'login'}</span>
                    <img width={30} height={30} src={loginLogout} alt="profile"/>
                </div>
            </div>
        </div>
        <div className="container border border-[rgba(0,0,0,0.03)] rounded-[21px] p-2">
            <TextEditor handleButtonClick={alerFunction} onSubmit={handleAddPost} />

            {showAuthPopUp && (
                <AuthPopup
                onSuccess={handleAuthSuccess}
                onClose={() => toggleAuthPopup(false)}
                />
            )}

            {/* Posts list */}
            <div className="mt-4 space-y-3">
                {posts.length > 0 &&
                posts.map((post) => (
                    <PostCard post={post} alerFunction={alerFunction} ></PostCard>
                ))}
            </div>
        </div>
    </>
  );
}

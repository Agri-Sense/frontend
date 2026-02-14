import { useRef, useEffect } from "react";
import "../styles/Feed.css";
import { config } from "../../config";

import { useQuery, useQueryClient } from 'react-query';

import CreatePost from "./createPost";

import { useState } from "react";
import { toast } from "react-toastify";
import { Loading } from "../../Routes/loading";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import { FeedContext } from "../../context/FeedContextProvider";


export const Feed = () => {
  // Get QueryClient from the context
  const queryClient = useQueryClient();

  const [isPostLoading, setIsPostLoading] = useState(false);
  const { postType, setPostType } = useContext(FeedContext);
  const { user } = useContext(UserContext);
  const numImages = 2;

  if (postType) useEffect(() => { refetch() }, [postType])

  const fetchPost = async (type) => {
    const res = await fetch(`${config.API_URL}/forum/posts/${type}`, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });

    const data = await res.json();
    
    if (data.error || data.success === false) {
      return toast.error(data.error);
    }

    return data.data
  };

  const {isLoading, data: posts, error, refetch} = useQuery("feedPosts", () => fetchPost(postType), {
  });

  if (isLoading) return
  if (error){
    toast.error("Error encountered at fetch")
  }

  const handleFollow = async (e) => {
    let user_id = e.target.getAttribute("data-id");
    const res = await fetch(`${config.API_URL}/forum/follow`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
        "content-type": "application/json",
      },
      body: JSON.stringify({ user_id: String(user_id) }),
    });

    const data = await res.json();

    if (data.error || data.success === false) {
      return toast.error(data.error);
    }

    queryClient.invalidateQueries('feedPosts')
    toast.success(data.message);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    //do sth here
  };

  const handleUpvoteClick = async (e) => {
    const icon = e.target;
    const elem = e.target.parentElement;
    const downVoteElem = elem.parentElement.children[2];
    const downVoteIcon = downVoteElem.children[0];

    if (!icon || !elem || !downVoteElem || !downVoteIcon) return;

    const question_id = e.target.getAttribute("data-qid");

    const res = await fetch(`${config.API_URL}/forum/upvote`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
        "content-type": "application/json",
      },
      body: JSON.stringify({ question_id }),
    });

    const data = await res.json();

    if (data.error || data.success === false) {
      return toast.error(data.error);
    }

    refetch()
    toast.success(data.message);
    if (downVoteElem.className == "") {
      if (elem.className == "" && downVoteElem.className == "") {
        downVoteElem.classList.toggle("inactive");
        downVoteIcon.classList.remove("bi-arrow-down-square-fill");
        downVoteIcon.classList.add("bi-arrow-down-square");

        elem.classList.toggle("inactive");
        icon.classList.remove("bi-arrow-up-square");
        icon.classList.add("bi-arrow-up-square-fill");
      } else {
        downVoteElem.classList.toggle("inactive");
        downVoteIcon.classList.add("bi-arrow-down-square-fill");
        downVoteIcon.classList.remove("bi-arrow-down-square");

        elem.classList.toggle("inactive");
        icon.classList.remove("bi-arrow-up-square-fill");
        icon.classList.add("bi-arrow-up-square");
      }
    } else {
      downVoteElem.classList.toggle("inactive");
      downVoteIcon.classList.remove("bi-arrow-down-square-fill");
      downVoteIcon.classList.add("bi-arrow-down-square");
      elem.classList.toggle("inactive");
      icon.classList.remove("bi-arrow-up-square-fill");
      icon.classList.add("bi-arrow-up-square");
    }
  };

  const handleDownvoteClick = async (e) => {
    const icon = e.target;
    const elem = e.target.parentElement;
    const upVoteElem = elem.parentElement.children[0];
    const upVoteIcon = upVoteElem.children[0];

    if (!icon || !elem || !upVoteElem || !upVoteIcon) return;

    const question_id = e.target.getAttribute("data-qid");
    const res = await fetch(`${config.API_URL}/forum/downvote`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
        "content-type": "application/json",
      },
      body: JSON.stringify({ question_id }),
    });

    const data = await res.json();

    if (data.error || data.success === false) {
      return toast.error(data.error);
    }

    refetch()
    toast.success(data.message);

    if (upVoteElem.className == "") {
      if (elem.className == "inactive") {
        upVoteElem.classList.toggle("inactive");
        upVoteIcon.classList.remove("bi-arrow-up-square-fill");
        upVoteIcon.classList.add("bi-arrow-up-square");

        elem.classList.toggle("inactive");
        icon.classList.remove("bi-arrow-downn-square-fill");
        icon.classList.add("bi-arrow-down-square");
      } else {
        upVoteElem.classList.toggle("inactive");
        upVoteIcon.classList.remove("bi-arrow-up-square-fill");
        upVoteIcon.classList.add("bi-arrow-up-square");

        elem.classList.toggle("inactive");
        icon.classList.remove("bi-arrow-down-square-fill");
        icon.classList.add("bi-arrow-down-square");
      }
    } else {
      upVoteElem.classList.toggle("inactive");
      upVoteIcon.classList.remove("bi-arrow-up-square-fill");
      upVoteIcon.classList.add("bi-arrow-up-square");
      elem.classList.toggle("inactive");
      icon.classList.remove("bi-arrow-down-square");
      icon.classList.add("bi-arrow-down-square-fill");
    }
  };

  const handleCommentSection = (e) => {
    const parentDiv = e.target.parentElement.parentElement.parentElement.id;
    console.log(parentDiv);
  };

  return (
    <>
      <div className="feed">
        <CreatePost refetch={refetch} />

        <div className="feed-posts">
          {isPostLoading ? <Loading /> : ""}
          {posts &&
            posts.map((item) => {
              return (
                <div className="post" id={item._id} key={item._id}>
                  <div className="post-counts">
                    <button
                      className=""
                      onClick={handleUpvoteClick}
                      data-qid={item._id}
                    >
                      <i
                        className={
                          item.upvotes.includes(user._id)
                            ? "bi-arrow-up-square-fill"
                            : "bi-arrow-up-square"
                        }
                        data-qid={item._id}
                      ></i>
                    </button>
                    <span>{item.upvotes.length}</span>
                    <button
                      className=""
                      onClick={handleDownvoteClick}
                      data-qid={item._id}
                    >
                      <i
                        className={
                          item.downvotes.includes(user._id)
                            ? "bi-arrow-down-square-fill"
                            : "bi-arrow-down-square"
                        }
                        data-qid={item._id}
                      ></i>
                    </button>
                  </div>
                  <div className="post-data-container">
                    <div className="author">
                      <span className="author-img">
                        <img src={item.author_id.profile_pic} alt="pp" />
                      </span>
                      <span>
                        <p className="author-name">
                          {item.author_id.full_name}
                        </p>
                        <small className="author-role text-muted">
                          {item.author_id.role === "user" ? "Farmer" : "Seller"}
                        </small>
                      </span>
                      <span className="follow-btn-container">
                        {item.author_id.followers.includes(user._id) ===
                        false ? (
                          <button
                            className="follow-btn"
                            onClick={handleFollow}
                            data-id={item.author_id._id}
                          >
                            Follow
                          </button>
                        ) : (
                          <button
                            className="unfollow-btn"
                            onClick={handleFollow}
                            data-id={item.author_id._id}
                          >
                            Unfollow
                          </button>
                        )}
                      </span>
                    </div>
                    <div className="author-keywords">
                      {item.tags &&
                        item.tags.map((tag, key) => {
                          return (
                            <span className="keyword" key={key}>
                              {tag}
                            </span>
                          );
                        })}
                    </div>
                    <div className="author-post">
                      <p className="description">{item.question}</p>
                      {typeof item.photo != "string" ? (
                        <></>
                      ) : item.photo != "" ? (
                        <div className="author-post-image">
                          <img src={item.photo} alt="image" />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="below-posts">
                      <div className="post-btns">
                        <button
                          className="comment"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${item._id}`}
                        >
                          <i className="bi bi-chat-left-text"></i>
                          Comment
                        </button>
                        <button className="share">
                          <i className="bi bi-share"></i>
                          Share
                        </button>
                      </div>

                      <div className="content-box-wrapper">
                        <div className="collapse" id={item._id}>
                          <div className="comment-box">
                            <div className="create-comment-wrapper">
                              <span className="author-img">
                                <img
                                  src="https://scontent.fbir4-1.fna.fbcdn.net/v/t39.30808-6/318499336_969462414459076_3592138521682688925_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=oCBoVqye2JgAX8NPx5a&_nc_ht=scontent.fbir4-1.fna&oh=00_AfAPk9Wa_8_6QhFbmOCt8UQ8o06_U6vBBlWE9_hs5Hlb4g&oe=63C778AF"
                                  alt="person"
                                />
                              </span>
                              <span className="create-comment">
                                <textarea placeholder="Write your comments here..."></textarea>
                              </span>
                              <span className="submit-comment">
                                <button
                                  type="submit"
                                  onChange={handleCommentSubmit}
                                >
                                  <i className="bi bi-send"></i>
                                </button>
                              </span>
                            </div>
                            <div className="comment-header">
                              <div className="dropdown options">
                                <button
                                  className="btn dropdown-toggle"
                                  type="button"
                                  data-bs-toggle="dropdown"
                                >
                                  Sort by
                                </button>
                                <ul className="dropdown-menu">
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      Relevance
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      Newest
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="text-muted totalComments">
                                24 comments
                              </div>
                            </div>
                            <div className="comments">
                              <div className="comment">
                                <span className="commenter-img">
                                  <img
                                    src="https://scontent.fbir4-1.fna.fbcdn.net/v/t39.30808-6/318499336_969462414459076_3592138521682688925_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=oCBoVqye2JgAX8NPx5a&_nc_ht=scontent.fbir4-1.fna&oh=00_AfAPk9Wa_8_6QhFbmOCt8UQ8o06_U6vBBlWE9_hs5Hlb4g&oe=63C778AF"
                                    alt="person"
                                  />
                                </span>
                                <span className="text">
                                  <p className="commenter-name">
                                    Yaman Sarbariya
                                  </p>
                                  <small className="commented-date text-muted">
                                    8 months ago
                                  </small>
                                  <p className="description">
                                    Lorem, ipsum dolor sit amet consectetur
                                    adipisicing elit. Molestias eveniet
                                    excepturi aliquid quas recusandae? Quidem
                                    accusantium
                                  </p>
                                </span>
                              </div>

                              <div className="comment">
                                <span className="commenter-img">
                                  <img
                                    src="https://scontent.fbir4-1.fna.fbcdn.net/v/t39.30808-6/318499336_969462414459076_3592138521682688925_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=oCBoVqye2JgAX8NPx5a&_nc_ht=scontent.fbir4-1.fna&oh=00_AfAPk9Wa_8_6QhFbmOCt8UQ8o06_U6vBBlWE9_hs5Hlb4g&oe=63C778AF"
                                    alt="person"
                                  />
                                </span>
                                <span className="text">
                                  <p className="commenter-name">
                                    Yaman Sarbariya
                                  </p>
                                  <small className="commented-date text-muted">
                                    8 months ago
                                  </small>
                                  <p className="description">
                                    Lorem, ipsum dolor sit amet consectetur
                                    adipisicing elit. Molestias eveniet
                                    excepturi aliquid quas recusandae? Quidem
                                    accusantium
                                  </p>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

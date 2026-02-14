import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import FileUpload from "./FileUpload";
import TextField from "@mui/material/TextField";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState, useRef, useLayoutEffect } from "react";
import { UserContext } from "../../context/userContext";
import { FeedContext } from "../../context/FeedContextProvider";
import { useContext } from "react";
import { config } from "../../config";
const MIN_TEXTAREA_HEIGHT = 32;

export default function CreatePost({ refetch }) {
  const [open, setOpen] = useState(false);
  const [postDescription, setPostDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [image, setImage] = useState([]);
  const { user } = useContext(UserContext);
  const { postType } = useContext(FeedContext);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const textAreaRef = React.useRef(null);

  useLayoutEffect(() => {
    // Reset height - important to shrink on delete
    if (textAreaRef.current !== null) {
      textAreaRef.current.style.height = "inherit";
      // Set height
      textAreaRef.current.style.height = `${Math.max(
        textAreaRef.current.scrollHeight,
        MIN_TEXTAREA_HEIGHT
      )}px`;
    }
  }, [postDescription]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImage([]);
  };

  const handleCreatePost = async (e) => {
    if (!postDescription || !keywords) {
      return toast.error("Descritpion and keywords not present");
    }

    let formData = new FormData();

    let tags = keywords
      .split("#")
      .map((i) => i.trim())
      .filter((i) => i);

    console.log(tags);

    formData.append("author_id", user._id);
    formData.append("question", postDescription);
    formData.append("tags", JSON.stringify(tags));

    if (image && image.length > 0) {
      formData.append("photo", image[0]);
    }

    const res = await fetch(`${config.API_URL}/forum/add-question`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      body: formData,
    });

    const data = await res.json();

    if (data.error || data.success === false) {
      return toast.error(data.error);
    }

    toast.success(data.message);
    refetch()
    setKeywords("");
    setPostDescription("");
    setImage([]);

    setOpen(false);
  };

  return (
    <>
      <div className="create-post">
        <span className="user-img">
          {
            user.profile_pic? <img src={user.profile_pic} alt="pfp" />
            : <img src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg" alt="default pfp" />
          }
          
        </span>
        <span className="input-field">
          <input
            onClick={handleClickOpen}
            type="text"
            data-bs-toggle="modal"
            placeholder="Share something new"
          />
        </span>
        <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
          <DialogTitle>{"Create a new post.."}</DialogTitle>
          <DialogContent>
            <textarea
              ref={textAreaRef}
              value={postDescription}
              onChange={(e) => setPostDescription(e.target.value)}
              style={{
                minHeight: MIN_TEXTAREA_HEIGHT,
                resize: "none",
              }}
              placeholder="Write something that matters.."
            />

            <p className="label">Keywords</p>
            <TextField
              className="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              label="# followed by keyword"
              variant="outlined"
            />
            <FileUpload image={image} setImage={setImage} />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Close
            </Button>
            <Button
              className="btn text-white px-4"
              style={{background: "#282828"}}
              onClick={handleCreatePost}
              autoFocus
            >
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <ToastContainer />
    </>
  );
}

import "../styles/Profile.css"
import "../styles/Feed.css"
import "../../Routes/signup.css"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

export const Profile = () => {
    const [editValues, setEditValues] = useState({
        profile_pic: null,
        full_name: "",
        email: "",
        password: "",
        phone: "",
    })

    const [imgUrl, setImgUrl] = useState("");

    useEffect(() => {
        if (!editValues.profile_pic) return;
        setImgUrl(URL.createObjectURL(editValues.profile_pic));
    }, [editValues.profile_pic]);

    const hasImage = true;
    const numImages = 2
    const postUpvoteCount = 10;

    const handleProfileEdit = () => {
        //do sth heress
    }

    const handleCommentSubmit = () => {
        //do sth here
    }

    const handleShare = (e) => {
        toast.success("Link to the post has been copied.")
    }

    return (
        <div className="profile-section">
        <label htmlFor="#" className="content-header mt-4 mb-3">My Profile</label>
        <div className="profile-container">
            <div className="my-info">
                <div className="my-profile"></div>
                <div className="my-friends-list"></div>
            </div>
            <div className="details">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#my-profile-details" type="button" role="tab">Home</button>
                        <button className="nav-link" data-bs-toggle="tab" data-bs-target="#edit-my-profile" type="button" role="tab">Profile</button>
                    </div>
                </nav>
                <div className="tab-content">
                    <div className="tab-pane show active" id="my-profile-details" role="tabpanel" tabIndex="0">
                        <label className="internal-div-header">Your News Feed</label>
                        <div className="feed-posts">
                            <div className="post my-profile-post" id="1">
                                <div className="post-counts">
                                    <button
                                    className="">
                                        <i className="bi bi-arrow-up-square-fill"></i>
                                    </button>
                                    <span>{postUpvoteCount}</span>
                                    <button
                                    className="">
                                        <i className="bi bi-arrow-down-square"></i>
                                    </button>
                                </div>
                                <div className="post-data-container">
                                    <div className="author">
                                        <span className="author-img">
                                            <img src="https://scontent-lcy1-2.xx.fbcdn.net/v/t39.30808-6/318499336_969462414459076_3592138521682688925_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=deXb1cmmirkAX9rGgbq&_nc_ht=scontent-lcy1-2.xx&oh=00_AfDN1X9pL9MdcIFm6ti4wjSxcyc_cW5dNh-TQKqL9PXnrA&oe=63BB9B2F" alt="pp" />
                                        </span>
                                        <span>
                                            <p className="author-name">Bibek Shah</p>
                                            <small className="author-role text-muted">Farmer</small>
                                        </span>
                                    </div>
                                    <div className="author-keywords">
                                        <span className="keyword">Farming</span>
                                        <span className="keyword">Agriculture</span>
                                        <span className="keyword">Paddy</span>
                                    </div>
                                    <div className="author-post">
                                        <p className="description">
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora quia incidunt distinctio maiores facere modi,
                                            dolore repudiandae velit! Dignissimos inventore aliquid, quisquam obcaecati incidunt maxime.
                                            Accusamus ducimus sequi earum impedit.
                                        </p>
                                        {
                                            hasImage === false ? <></>
                                            : (numImages == 1) ?  
                                            <div className="author-post-image">
                                                <img src="https://diaryofdennis.files.wordpress.com/2015/08/random-plant-photo.jpg" alt="image" />
                                            </div>
                                            : <div id="mypostImagesCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
                                                <div className="carousel-inner">
                                                    <div className="author-post-image carousel-item active">
                                                        <img className="d-block w-100" src="https://diaryofdennis.files.wordpress.com/2015/08/random-plant-photo.jpg" alt="image" />
                                                    </div>
                                                    <div className="author-post-image carousel-item active">
                                                        <img className="d-block w-100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReARrLImlNJRQNaxGjv6civEey3cVKUdP6Ag&usqp=CAU" alt="image" />
                                                    </div>
                                                </div>
                                                <button className="carousel-control-prev" type="button" data-bs-target="#mypostImagesCarousel" data-bs-slide="prev">
                                                    <span className="carousel-control-prev-icon"></span>
                                                    <span className="visually-hidden">Previous</span>
                                                </button>
                                                <button className="carousel-control-next" type="button" data-bs-target="#mypostImagesCarousel" data-bs-slide="next">
                                                    <span className="carousel-control-next-icon"></span>
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                                            </div>
                                        }
                                    </div>
                                    <div className="below-posts">
                                        <div className="post-btns">
                                            <button
                                            className="comment"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#post-1">
                                                <i className="bi bi-chat-left-text"></i>
                                                Comment
                                            </button>
                                            <button
                                            className="share"
                                            onClick={handleShare}>
                                                <i className="bi bi-share"></i>
                                                Share
                                            </button>
                                        </div>
                                        
                                        <div className="content-box-wrapper">
                                            <div className="collapse" id="post-1">
                                                <div className="comment-box">
                                                    <div className="create-comment-wrapper">
                                                        <span className="author-img">
                                                            <img src="https://scontent-lcy1-2.xx.fbcdn.net/v/t39.30808-6/318499336_969462414459076_3592138521682688925_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=deXb1cmmirkAX9rGgbq&_nc_ht=scontent-lcy1-2.xx&oh=00_AfDN1X9pL9MdcIFm6ti4wjSxcyc_cW5dNh-TQKqL9PXnrA&oe=63BB9B2F" alt="person" />
                                                        </span>
                                                        <span className="create-comment">
                                                            <textarea placeholder="Write your comments here..."></textarea>
                                                        </span>
                                                        <span className="submit-comment">
                                                            <button
                                                            type="submit"
                                                            onChange={handleCommentSubmit}>
                                                                <i className="bi bi-send"></i>
                                                            </button>
                                                        </span>
                                                    </div>
                                                    <div className="comment-header">
                                                        <div className="dropdown options">
                                                            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                                                Sort by
                                                            </button>
                                                            <ul className="dropdown-menu">
                                                                <li><a className="dropdown-item" href="#">Relevance</a></li>
                                                                <li><a className="dropdown-item" href="#">Newest</a></li>
                                                            </ul>
                                                        </div>
                                                        <div className="text-muted totalComments">24 comments</div>
                                                    </div>
                                                    <div className="comments">
                                                        <div className="comment">
                                                            <span className="commenter-img">
                                                                <img src="https://scontent-lcy1-2.xx.fbcdn.net/v/t39.30808-6/318499336_969462414459076_3592138521682688925_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=deXb1cmmirkAX9rGgbq&_nc_ht=scontent-lcy1-2.xx&oh=00_AfDN1X9pL9MdcIFm6ti4wjSxcyc_cW5dNh-TQKqL9PXnrA&oe=63BB9B2F" alt="person" />
                                                            </span>
                                                            <span className="text">
                                                                <p className="commenter-name">Yaman Sarbariya</p>
                                                                <small className="commented-date text-muted">8 months ago</small>
                                                                <p className="description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias eveniet excepturi aliquid quas recusandae? Quidem accusantium</p>
                                                            </span>
                                                        </div>

                                                        <div className="comment">
                                                            <span className="commenter-img">
                                                                <img src="https://scontent-lcy1-2.xx.fbcdn.net/v/t39.30808-6/318499336_969462414459076_3592138521682688925_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=deXb1cmmirkAX9rGgbq&_nc_ht=scontent-lcy1-2.xx&oh=00_AfDN1X9pL9MdcIFm6ti4wjSxcyc_cW5dNh-TQKqL9PXnrA&oe=63BB9B2F" alt="person" />
                                                            </span>
                                                            <span className="text">
                                                                <p className="commenter-name">Yaman Sarbariya</p>
                                                                <small className="commented-date text-muted">8 months ago</small>
                                                                <p className="description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias eveniet excepturi aliquid quas recusandae? Quidem accusantium</p>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="edit-my-profile" role="tabpanel" tabIndex="0">
                        <label className="internal-div-header">Edit Profile</label>
                        <div className="signup-form-container">
                            <form className="login-form" onSubmit={handleProfileEdit}>
                                <div className="upload-section mb-5">
                                <div>
                                    <p className="signup-header">Profile Picture</p>
                                    {editValues.profile_pic && (
                                    <div>
                                        <img
                                        className="profile-picture me-4"
                                        alt="not found"
                                        src={imgUrl}
                                        />
                                        <button
                                        className="removeUploadedImageAtSignup"
                                        onClick={() => {
                                            setEditValues({ ...editValues, profile_pic: null });
                                        }}
                                        >
                                        Remove
                                        </button>
                                    </div>
                                    )}
                                    {!editValues.profile_pic && (
                                    <input
                                        className="uploadImageAtSignup"
                                        type="file"
                                        name="profile_pic"
                                        required={true}
                                        onChange={(event) => {
                                        console.log(event.target.files[0]);
                                        setEditValues({ ...editValues, profile_pic: event.target.files[0] });
                                        }}
                                    />
                                    )}
                                </div>
                                </div>
                                <div className="input-section">
                                <input
                                    onChange={(e) =>
                                        setEditValues({ ...editValues, full_name: e.target.value })
                                    }
                                    type="text"
                                    required={true}
                                    placeholder="Enter your full name"
                                    name="full_name"
                                ></input>

                                <input
                                    onChange={(e) => setEditValues({ ...editValues, email: e.target.value })}
                                    type="text"
                                    disabled={true}
                                    value="bibekshh1@gmail.com"
                                    name="email"
                                ></input>

                                <input
                                    onChange={(e) => setEditValues({ ...editValues, password: e.target.value })}
                                    type="password"
                                    required={true}
                                    placeholder="Enter your password"
                                    name="password"
                                ></input>

                                <input
                                    onChange={(e) => setEditValues({ ...editValues, phone: e.target.value })}
                                    type="text"
                                    required={true}
                                    placeholder="Enter your phone number"
                                    name="phone"
                                ></input>
                                <button className="submit-btn" type="submit">
                                    Signup
                                </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer />
        </div>
    )
}
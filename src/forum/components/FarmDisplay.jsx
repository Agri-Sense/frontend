import "../styles/FarmDisplay.css"

export const FarmDisplay = () => {
    return (
        <div className="farm-display">
            <div className="encourage">
                <label htmlFor="#">Agri-sense Community</label>
                <p className="en-message mx-auto text-muted">Create, share and learn from the unlimited notes, photos and videos and ask your questions, answer your friends all over the world and grow. Create, share and learn.</p>
                <div className="actions">
                    <button className="mx-auto mb-2">Join Community, it's free!</button>
                    <button className="mx-auto">Watch about Agri-sense</button>
                </div>
            </div>
            <div className="friends-suggestion">
                <label htmlFor="#" className="suggestions-label">Suggestions</label>

                <div className="user">
                    <div className="left">
                        <div className="user-avatar">
                            <img src="https://i.stack.imgur.com/5Kgaq.jpg?s=192&g=1" />
                        </div>
                        <div className="user-info">
                            <span className="name">Bibek Shah</span>
                            <span className="role text-muted">Seller</span>
                        </div>
                    </div>
                    <div className="options right">
                        <button className="follow-btn">Follow</button>
                    </div>
                </div>
                <div className="user">
                    <div className="left">
                        <div className="user-avatar">
                            <img src="//s3.amazonaws.com/bucketeer-6a6b5dd7-82e9-48dd-b3be-ec23fe6cc180/users/avatars/000/000/001/medium/presenting_I.png?1664763020" />
                        </div>
                        <div className="user-info">
                            <span className="name">Yaman Sarabariya</span>
                            <span className="role text-muted">Farmer</span>
                        </div>
                    </div>
                    <div className="options right">
                        <button className="follow-btn">Follow</button>
                    </div>
                </div>
                <div className="user">
                    <div className="left">
                        <div className="user-avatar">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYGY7hEAIBV9_PWjpbY8Ufx_XIHR6zP_zqUbozsFurx6veVKqL3KLj5Gt8wl04OME7FKA&usqp=CAU" />
                        </div>
                        <div className="user-info">
                            <span className="name">Prabesh Shrestha</span>
                            <span className="role text-muted">Farmer</span>
                        </div>
                    </div>
                    <div className="options right">
                        <button className="follow-btn">Follow</button>
                    </div>
                </div>
                <div className="user">
                    <div className="left">
                        <div className="user-avatar">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwX9qBxst5evuOaVeYKH28O09mwfzN_yeSsOnHYqnnvjgeygbwU-b9N0Oj2dF6zWncAcI&usqp=CAU" />
                        </div>
                        <div className="user-info">
                            <span className="name">Bibek Bhatt</span>
                            <span className="role text-muted">Seller</span>
                        </div>
                    </div>
                    <div className="options right">
                        <button className="follow-btn">Follow</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

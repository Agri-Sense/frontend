

export const Home = () => {
    return(
        <div className="seller-home">
            <label htmlFor="#" className="content-header">Dashboard</label>
            Hello {user.email}. This is seller's dashboard.
            <SellerHome />
        </div>
    )
}


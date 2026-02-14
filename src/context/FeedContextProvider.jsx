import { createContext, useState } from "react";
export const FeedContext = createContext();

const FeedContextProvider = ({ children }) => {
  const [postType, setPostType] = useState("popular");

  return (
    <FeedContext.Provider value={{ postType, setPostType }}>
      {children}
    </FeedContext.Provider>
  );
};

export default FeedContextProvider;
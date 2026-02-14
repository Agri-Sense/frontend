import { createContext, useState } from "react";

const UserHomeContext = createContext({
    userHomeData: null,
    setUserHomeData: () => {}
});

const UserHomeContextProvider = ({children}) =>{
    const [userHomeData, setUserHomeData] = useState({
        temperature: '70',
        phrase: 'Partly',
        isDayTime: true,
        wind: '13 km/h',
        pressure: '1016 mb',
        uvIndex: 3,
        uvIndexPhrase: 'Moderate',
        precipitation: '0 mm',
        humidity: 34
    });

    return(
        <UserHomeContext.Provider value={[userHomeData, setUserHomeData]}>
            {children}
        </UserHomeContext.Provider>
    )
}

export {UserHomeContext, UserHomeContextProvider};
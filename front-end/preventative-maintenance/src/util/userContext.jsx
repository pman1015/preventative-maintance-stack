import { createContext } from "react";


const userContext = createContext({
    user:null,
    hasLoginError:false,
    login:null,
    logout:false
});

export default userContext;
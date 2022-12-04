import React from 'react';
import {useLocation} from "react-router";

const ErrorPage = () => {

    const location = useLocation();

    return (


        <div>
            {location.state ?
                <>Something went Wrong, Try again later, message : {JSON.stringify(location.state)} </> :
                <>Page Not Found</>
            }
        </div>
    );
};

export default ErrorPage;
import React from "react";


const Notification = ({message, error}) => {
    if (!message){
        return null
    }
    return (
        <div className={error ? "error notif" : "notif notification"}>
            {message}
        </div>
    )
}

export default Notification

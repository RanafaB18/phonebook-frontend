import React from "react";


const Notification = ({message}) => {
    if (!message){
        return null
    }
    const color = message.includes("removed")
    return (
        <div className={color ? "error notif" : "notif notification"}>
            {message}
        </div>
    )
}

export default Notification

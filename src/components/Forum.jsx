import React, {useState} from "react";
import '../styles/ComponentStyles.css';

export default function Forum()
{
    const[replyStatus, setReplyStatus] = useState(0)

    const[chatList, setChatList] = useState([
        {
            chatId: 0,
            chatMessage: "Hello There"
        },
        {
            chatId: 1,
            chatMessage: "Yeah Hi,"
        },
        {
            chatId: 0,
            chatMessage: "So, how are you?"
        },
        {
            chatId: 1,
            chatMessage: "Hello There"
        },
        {
            chatId: 1,
            chatMessage: "I am fine"
        },
    ])
    
    return(
     <>
     <div className="teacher-dash-forum-card">
            <h3>Q & A Session</h3>

            <div  className="teacher-dash-forum-chat-content">
                { chatList.map ((data)=>(
                    <div>
                    {data.chatId === 0 &&
                        <div className="teacher-dash-forum-chat-box">
                            <p>{data.chatMessage}</p>
                            {!replyStatus && (<p className="teacher-dash-forum-chat-reply" onClick={(e) => {
                                setReplyStatus(!replyStatus)
                            }}>Reply</p>)}
                            {replyStatus &&
                                <div className="teacher-dash-forum-chat-input">
                                    <input type="text" className="teacher-dash-forum-chat-input-box"/>
                                    <button onClick={() => setReplyStatus(false)}>Send</button>
                                </div>
                            }
                        </div> 
                    } 
                    {data.chatId === 1 &&
                        <div className="teacher-dash-forum-chat-box">
                            <p>{data.chatMessage}</p>
                            <p className="teacher-dash-forum-chat-reply" onClick={(e)=>{setReplyStatus(!replyStatus)}}>Reply</p>
                        </div> 
                    } 
                    </div>
                ))}
            </div>
     </div>
     </>
    );
}
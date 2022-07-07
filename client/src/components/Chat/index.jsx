import React, { useEffect, useRef, useState } from "react";
import s from "./styles.module.scss";
import { Chats } from "phosphor-react";
import socketIOClient from "socket.io-client";
import { motion } from "framer-motion";
const Chat = () => {
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState("");
  const [id, setId] = useState();
  const [show, setShow] = useState(false);
  const socketRef = useRef();
  const messagesEnd = useRef();
  useEffect(() => {
    socketRef.current = socketIOClient.connect("http://localhost:9000");

    socketRef.current.on("getId", (data) => {
      setId(data);
    });

    socketRef.current.on("sendDataServer", (dataGot) => {
      setMess((oldMsgs) => [...oldMsgs, dataGot.data]);
      scrollToBottom();
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message !== null) {
      const msg = {
        content: message,
        id: id,
      };
      socketRef.current.emit("sendDataClient", msg);
      setMessage("");
    }
  };

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  const renderOtherMess = mess.map((m, index) => (
    <div key={index}>{m.content}</div>
  ));

  const renderMess = mess.map((m, index) => <div key={index}>{m.content}</div>);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      sendMessage();
    }
  };

  return (
    <div className={s.container}>
      <div className={s.box_icon} onClick={() => setShow(!show)}>
        <Chats size={34} weight="fill" className={s.icon_chat} />
      </div>

      <div class={`${s.box_chat} ${show === true ? s.show : s.hide}`}>
        <div className={s.box_chat_message_orther}>
          <div className={s.other_peo} ref={messagesEnd}>
            {renderMess}
          </div>
        </div>
        <div class={s.box_chat_message}>
          <div className={s.my} ref={messagesEnd}>
            {renderMess}
          </div>
        </div>

        <div class={s.send_box}>
          <input
            value={message}
            onKeyDown={onEnterPress}
            onChange={handleChange}
            placeholder="Nhập tin nhắn ..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

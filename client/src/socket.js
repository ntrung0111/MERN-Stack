import { useEffect } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";

import { CREATE, DELETE, LIKE, UPDATE } from "./constants/actionTypes";

const SocketClient = () => {
  const dispatch = useDispatch();
  const socket = io.connect(process.env.REACT_APP_SERVER_URL);

  useEffect(() => {
    socket.emit("join");
  }, [socket]);

  useEffect(() => {
    socket.on("joinToClient", (data) => {
      localStorage.setItem("socketId", data);
    });

    return () => socket.off("joinToClient");
  }, [socket]);

  // Create post
  useEffect(() => {
    socket.on("createPostToClient", (data) => {
      dispatch({ type: CREATE, payload: data });
    });

    return () => socket.off("createPostToClient");
  }, [socket, dispatch]);

  // Like post
  useEffect(() => {
    socket.on("likePostToClient", (data) => {
      dispatch({ type: LIKE, payload: data });
    });

    return () => socket.off("likePostToClient");
  }, [socket, dispatch]);

  // Update post
  useEffect(() => {
    socket.on("updatePostToClient", (post) => {
      dispatch({ type: UPDATE, payload: post });
    });

    return () => socket.off("updatePostToClient");
  }, [socket, dispatch]);

  // Delete post
  useEffect(() => {
    socket.on("deletePostToClient", (id) => {
      dispatch({ type: DELETE, payload: id });
    });

    return () => socket.off("deletePostToClient");
  }, [socket, dispatch]);
};

export default SocketClient;

let users = [];

const sendToClient = (socket, socketId, action, data) => {
  const clients = users.filter((user) => user.socketId !== socketId);

  if (clients.length > 0) {
    clients.forEach((client) => {
      socket.to(`${client.socketId}`).emit(action, data);
    });
  }
};

const SocketServer = (socket) => {
  socket.on("join", () => {
    users.push({
      socketId: socket.id,
    });

    socket.emit("joinToClient", socket.id);
  });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
  });

  socket.on("createPost", (post, socketId) => {
    sendToClient(socket, socketId, "createPostToClient", post);
  });

  socket.on("likePost", (post, socketId) => {
    sendToClient(socket, socketId, "likePostToClient", post);
  });

  socket.on("updatePost", (post, socketId) => {
    sendToClient(socket, socketId, "updatePostToClient", post);
  });

  socket.on("deletePost", (id, socketId) => {
    sendToClient(socket, socketId, "deletePostToClient", id);
  });
};

export default SocketServer;

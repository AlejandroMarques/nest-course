import { Manager, Socket } from "socket.io-client";

interface DataFromServer {
  id: string;
  message: string;
  fullName: string;
}

let socket: Socket;

export const connectToServer = (token: string) => {
  const manager = new Manager("http://localhost:3000/socket.io/socket.io.js", {
    extraHeaders: {
      authentication: token,
    }
  });

  socket?.removeAllListeners();
  socket = manager.socket("/");

  addListeners();
};

const addListeners = () => {
  const serverStatusLabel = document.querySelector<HTMLSpanElement>("#server-status")!;
  const clientsUl = document.querySelector<HTMLUListElement>("#clients-ul")!;
  const messageForm = document.querySelector<HTMLFormElement>("#message-form")!;
  const messageInput = document.querySelector<HTMLInputElement>("#message-input")!;
  const messagesUl = document.querySelector<HTMLUListElement>("#messages-ul")!;

  socket.on("connect", () => {
    serverStatusLabel.textContent = "Online";
  });

  socket.on("disconnect", () => {
    serverStatusLabel.textContent = "Offline";
  });

  socket.on("clients-updated", (data: string[]) => {
    clientsUl.innerHTML = "";
    data.forEach((client) => {
      clientsUl.innerHTML += `<li id="client-${client}">${client}</li>`;
    });
  });

  socket.on("message-from-server", (data: DataFromServer) => {
    const newMessage = `
      <li>
        <strong>${data.fullName}</strong>
        <span>${data.message}</span>
      </li>
    `;
    const li = document.createElement("li");
    li.innerHTML = newMessage;
    messagesUl.append(li);
  });

  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (messageInput.value.trim().length <= 0) return;
    socket.emit("message-from-client", {
      id: "Yo",
      message: messageInput.value,
    });
    messageInput.value = "";
  });
};

// import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import CreateHero from "../components/CreateHero";
import { Create } from "../components/Create";
import { Logo } from "../components/Logo";
import HamburgerMenu from "../components/HamburgerMenu";
import VectorImage from "../components/VectorImage";
import Meta from "../components/Meta";
import Image from "next/image";
import { NavbarMdUp, NavbarSmUp } from "../components/NavBar/index";
import Link from "next/link";
import { SocketContext } from "../utils/socketContext";
import CCID from "../components/CCID";

export default function Home() {
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.emit("test", "test");
      console.log("Socket:", socket);
      socket.on("test", (message) => {
        console.log("New test message:", message);
      });

      return () => {
        socket.off("message");
      };
    }
  }, [socket]);

  const [imageProcessing, setImageProcessing] = useState(false); //processing state ie. loading...
  const [conditionalRender, setConditionalRender] = useState("");

  const toggleImageProcessing = async () => {
    setImageProcessing(false);
  };

  useEffect(() => {
    if (imageProcessing) {
      console.log(imageProcessing);
      setTimeout(toggleImageProcessing, 3000);
    }
  }, [imageProcessing]);

  return (
    <div>
      <Meta />
      <CCID />
    </div>
  );
}

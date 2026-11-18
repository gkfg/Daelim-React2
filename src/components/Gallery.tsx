"use client";

import "./styles.css";
import { useState } from "react";
import { Carousel } from "acme-carousel";
import Slider from "acme-carousel";

export default function Gallery() {
  const [isOpen, setIsOpen] = useState(false);

  const item = [
    { id: 1, src: "https://picsum.photos/id/237/400/300", alt: "Image 1" },
    { id: 2, src: "https://picsum.photos/id/238/400/300", alt: "Image 2" },
    { id: 3, src: "https://picsum.photos/id/239/400/300", alt: "Image 3" },
  ];
  return (
    <Carousel
      items={item}
      autoplay={{
        enabled: true,
        interval: 3000,
        pauseOnHover: true,
      }}
      infinite={true}
    />
  );
}

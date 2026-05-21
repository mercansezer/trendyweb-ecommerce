"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSlider() {
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=2000&auto=format&fit=crop",
      title: "Yılın Teknoloji Fırsatları",
      href: "/products/laptops",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop",
      title: "Yeni Sezon Koleksiyonu",
      href: "/products/womens-dresses",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2000&auto=format&fit=crop",
      title: "Ev Dekorasyonunda Trendler",
      href: "/products/home-decoration",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000&auto=format&fit=crop",
      title: "Aksesuar ve Saatlerde İndirim",
      href: "/products/womens-shoes",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2000&auto=format&fit=crop",
      title: "Konforlu Yaşam Alanları",
      href: "/products/home-decoration",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-xl bg-gray-100 group shadow-sm">
      {slides.map((slide, index) => (
        <Link
          key={slide.id}
          href={slide.href}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Overlay & Text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 text-white">
              <h2 className="text-xl md:text-4xl font-bold drop-shadow-md">
                {slide.title}
              </h2>
              <span className="inline-block mt-2 mb-3 bg-white text-black px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-[#F27A1A] hover:text-white transition-colors">
                Alışverişe Başla
              </span>
            </div>
          </div>
        </Link>
      ))}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.preventDefault();
              setCurrent(i);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              current === i ? "bg-white w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          setCurrent(current === 0 ? slides.length - 1 : current - 1);
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/80 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all z-30 backdrop-blur-sm cursor-pointer"
      >
        ◀
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          setCurrent(current === slides.length - 1 ? 0 : current + 1);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/80 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all z-30 backdrop-blur-sm cursor-pointer"
      >
        ▶
      </button>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";

interface ProgressDotsProps {
  numSections: number;
}

const ProgressDots: React.FC<ProgressDotsProps> = ({ numSections }) => {
  const [activeSection, setActiveSection] = useState(0);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const sectionHeight = window.innerHeight;
    const currentSection = Math.floor(scrollY / sectionHeight);
    setActiveSection(currentSection);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        right: "20px",
        transform: "translateY(-50%)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {Array.from({ length: numSections }).map((_, index) => (
        <div
          key={index}
          style={{
            width: activeSection === index ? "16px" : "12px",
            height: activeSection === index ? "16px" : "12px",
            backgroundColor: activeSection === index ? "#fff" : "#888",
            borderRadius: "50%",
            transition: "all 0.3s ease",
          }}
        />
      ))}
    </div>
  );
};

export default ProgressDots;

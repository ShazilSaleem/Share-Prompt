"use client"
import { animated, useSpring } from "@react-spring/web";
import React, { useState, useEffect } from "react";
import Feed from "@components/Feeds";

const LetterAnimation = ({ letter, delay }) => {
    const styles = useSpring({
      from: { opacity: 0, transform: 'scale(0.5)' },
      to: { opacity: 1, transform: 'scale(1)' },
      config: { tension: 200, friction: 12 },
      delay,
    });

    return <animated.span style={styles}>{letter}</animated.span>;
};

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300); // Adjust this delay as needed
    return () => clearTimeout(timer);
  }, []);

  const renderTextWithAnimation = (text) => {
    return text.split("").map((letter, index) => (
      <LetterAnimation key={index} letter={letter} delay={index * 50} />
    ));
  };

  return (
    <section className="w-full flex-center flex-col">
      {/* Always render the text but apply styles conditionally */}
      <h1 className={`head_text text-center ${isVisible ? '' : 'hidden-text'}`}>
        {renderTextWithAnimation("Discover & Share")}
        <br className="max-md:hidden"/>
        <span className="orange_gradient text-center">
          {renderTextWithAnimation("AI Powered Prompts")}
        </span>
      </h1>
      <p className={`desc text-center ${isVisible ? '' : 'hidden-text'}`}>
        {renderTextWithAnimation("Promptify is an open-source AI prompting tool for modern world to discover, create and share creative prompts")}
      </p>
      <Feed/>
    </section>
  );
};

export default Home;

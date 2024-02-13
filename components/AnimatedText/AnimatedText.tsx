"use client";
import React, { useState, useEffect} from 'react';


interface AnimatedTextProps {
    text: string;
    classNameForPeriod: string;
    classNameForText: string;
  }

export function AnimatedText({ text, classNameForPeriod, classNameForText }: AnimatedTextProps) {
    const [words, setWords] = useState<string[]>([]);
  
    useEffect(() => {
        const headerWords = text.split("");
        headerWords.forEach((word, index) => {
          if (index === headerWords.length - 1) {
            // For the last character, set a timeout with special styling
            setTimeout(() => {
              setWords((words) => [...words, word]);
            }, 55 * index);
          } else {
            // For all other characters, set a timeout with normal styling
            setTimeout(() => {
              setWords((words) => [...words, word]);
            }, 50 * index);
          }
        });
      }, [text]);

  
    return (
      <>
        {words.map((word, index) => (
          <span key={index} className={word === '.' || word === '?' ? classNameForPeriod : classNameForText}>
            {word === " " ? "\u00A0" : word}
          </span>
        ))}
      </>
    );
  }
  
import { useState, useEffect } from "react";

export function useTypingEffect(
  words: string[],
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000
) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing - додаємо по одній літері
          if (text.length < currentWord.length) {
            setText(currentWord.slice(0, text.length + 1));
          } else {
            // Пауза перед видаленням
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          // Deleting - видаляємо по одній літері
          if (text.length > 0) {
            setText(text.slice(0, -1));
          } else {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
}

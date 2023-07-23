'use client';

import clsx from 'clsx';
import { useState } from 'react';

interface IAccordion {
  title: string;
  content: string | JSX.Element;
  isDefaultOpen?: boolean;
}

export const Accordion = ({ title, content, isDefaultOpen }: IAccordion) => {
  const [isOpen, setIsOpen] = useState(isDefaultOpen || false);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="border-2 rounded-lg border-gray-800">
      <button
        className={clsx({
          'w-full px-4 py-2 text-left font-bold focus:outline-none': true,
          'hover:bg-gray-800': !isOpen,
        })}
        onClick={toggleAccordion}
      >
        {title}
      </button>
      <div
        className={`${
          isOpen ? 'h-fit' : 'h-0'
        } overflow-hidden animate-fade-in`}
        role="region"
        aria-expanded={isOpen}
        aria-hidden={!isOpen}
      >
        <p className="px-4 py-2 text-left">{content}</p>
      </div>
    </div>
  );
};

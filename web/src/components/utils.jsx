import { Link } from '@mui/material';
import parse, { domToReact } from 'html-react-parser';
import React from 'react';
import twitter from 'twitter-text';

export const parseTimestamp = (timestamp) => {
  const utcDate = new Date(`${timestamp}Z`);
  if (Number.isNaN(utcDate)) return null;
  const [year, month, day, hour, minute, second] = [
    utcDate.getFullYear(),
    (utcDate.getMonth() + 1).toString().padStart(2, '0'),
    utcDate.getDate().toString().padStart(2, '0'),
    utcDate.getHours().toString().padStart(2, '0'),
    utcDate.getMinutes().toString().padStart(2, '0'),
    utcDate.getSeconds().toString().padStart(2, '0'),
  ];
  return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
};

export const parseTweetText = (text) => {
  const replace = (node) => {
    if (node.name === 'a') {
      const { href, title } = node.attribs;
      return (
        <Link href={href} target="_blank" title={title} rel="noreferrer">
          {domToReact(node.children)}
        </Link>
      );
    }
    return node;
  };

  return (
    <>
      {parse(twitter.autoLink(text), { replace })}
    </>
  );
};

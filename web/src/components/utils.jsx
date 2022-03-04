import { Link } from '@mui/material';
import React from 'react';
import parse, { domToReact } from 'html-react-parser';
import twitter from 'twitter-text';

// TODO: local timezone
export const parseTimestamp = (timestamp) => {
  const ts = new Date(timestamp);
  return `${ts.getFullYear()}/${(ts.getMonth() + 1).toString().padStart(2, '0')}/${ts.getDate().toString().padStart(2, '0')} ${ts.getHours().toString().padStart(2, '0')}:${ts.getMinutes().toString().padStart(2, '0')}:${ts.getSeconds().toString().padStart(2, '0')} UTC`;
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

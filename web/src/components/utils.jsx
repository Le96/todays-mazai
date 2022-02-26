// TODO: local timezone
export const parseTimestamp = (timestamp) => {
  const ts = new Date(timestamp);
  return `${ts.getFullYear()}/${(ts.getMonth() + 1).toString().padStart(2, '0')}/${ts.getDate().toString().padStart(2, '0')} ${ts.getHours().toString().padStart(2, '0')}:${ts.getMinutes().toString().padStart(2, '0')}:${ts.getSeconds().toString().padStart(2, '0')} UTC`;
};

// TODO: parseTweetText
export const parstTweetText = (text) => text;

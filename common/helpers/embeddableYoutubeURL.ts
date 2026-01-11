export const embeddableYoutubeURL = (shareURL: string): string => {
  // const regex =
  //   /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
  // const match = url.match(regex);

  // if (match) {
  //   const videoId = match[1];

  //   return `https://www.youtube.com/embed/${videoId}`;
  // }

  // return "";


  try {
    const url = new URL(shareURL);
    const hostname = url.hostname;
    const pathname = url.pathname;

    // Case 1: Short URL (youtu.be)
    if (hostname === 'youtu.be') {
      const videoId = pathname.slice(1);
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Case 2: Standard watch URL
    if (hostname.includes('youtube.com')) {
      // https://www.youtube.com/watch?v=VIDEO_ID
      if (pathname === '/watch') {
        const videoId = url.searchParams.get('v');
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }

      // Case 3: Shorts URL
      // https://www.youtube.com/shorts/VIDEO_ID
      if (pathname.startsWith('/shorts/')) {
        const videoId = pathname.split('/')[2]; // /shorts/VIDEO_ID
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }
    }

    return ""; // Unrecognized format
  } catch (error) {
    return ""; // Invalid URL
  }

};

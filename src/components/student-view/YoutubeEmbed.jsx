const YoutubeEmbed = ({ url = "" }) => {
  // Helper function to extract the video ID from both types of URLs
  const getVideoId = (url) => {
    let videoId = null;

    // Check if the URL is in the youtu.be format
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1];
    }

    // Check if the URL is in the youtube.com format
    else if (url.includes("youtube.com/watch?v=")) {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoId = urlParams.get("v");
    }

    return videoId;
  };

  const videoId = getVideoId(url);

  // If a valid videoId exists, return an iframe
  if (videoId) {
    return (
      <iframe
        className="w-full h-[600px]"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    );
  } else {
    return <p>Invalid YouTube URL</p>;
  }
};

export default YoutubeEmbed;

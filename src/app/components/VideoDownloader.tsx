'use client';
import { useEffect, useState, FormEvent } from 'react';
import Image from 'next/image';
import { LoaderSpinner } from './spinner';

interface VideoData {
  videos?: { items: { url: string; quality: string; hasAudio: boolean }[] };
  audios?: { items: { url: string }[] };
  data?: { play: string, src: string };
  download_url?: string;
  links?: { sdLink: string };
}

export default function VideoDownloader() {
  const [url, setUrl] = useState<string>('');
  const [videos, setVideos] = useState<VideoData | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  console.log("videos ", videos);


  useEffect(() => {
    if (url.length - 1 < url.length) {
      setVideos(null);
      setError('');
    }
  }, [url]);

  const handleSubmit = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (!url) {
      setError('Please enter a URL');
      setVideos(null);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/videodownloader', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      // console.log("response ", response.json());


      const data = await response.json();
      console.log("data ", data);


      if (response.ok) {
        setVideos(data);
        setLoading(false);
      } else {
        setError(data.error);
        setVideos(null);
      }
    } catch (error) {
      setError('Error fetching video data');
      setVideos(null);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 border-red-300">
      <h1 className="text-lg sm:text-3xl text-center mb-6"><span className='text-orange-500/100 italic'>Seamless</span> Video Downloader</h1>
      <div className="flex gap-4 justify-center my-8">
        <Image src="/instagram.svg" alt="instagram" width={48} height={48} />
        <Image src="/tiktok-icons.svg" alt="tiktok" width={48} height={48} />
        <Image src="/facebook.svg" alt="facebook" width={48} height={48} />
        <Image src="/youtube.svg" alt="youtube" width={48} height={48} />
        <Image src="/twitter.svg" alt="youtube" width={48} height={48} />
      </div>
      <form onSubmit={handleSubmit} className="flex w-full gap-4 md:justify-center md:items-center my-4 flex-col md:flex-row">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter video URL"
          className=" border focus-within:scale-[1.02] duration-500 transition-all shadow-xl p-3 w-full max-w-[600px] border-gray-300 rounded outline-none focus:border-blue-500"
        />
        <button type="submit" className="active:scale-[40%] transition-all duration-700 shadow-lg px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-700">
          {loading ? <LoaderSpinner /> : 'Download'}
        </button>
      </form>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {videos && <VideoDisplayer videos={videos} url={url} />}
    </div>
  );
}

interface VideoDisplayerProps {
  videos: VideoData;
  url: string;
}

function VideoDisplayer({ videos, url }: VideoDisplayerProps) {
  return (
    <div className='my-6'>
      <div className="flex flex-col items-center gap-4">
        <div className="max-w-[640px] w-full">
          <video controls className='rounded-lg'>
            <source src={videoRender(url, videos)} type="video/mp4" />
          </video>
          {(url.includes('https://youtu.be/') || url.includes('https://www.youtube.com/')) &&
            videos.videos?.items.map((video, index) => (
              <div key={index} className="flex flex-col gap-4">
                <a target="_blank" href={video.url} className="flex gap-3">
                  {video.quality}
                  {video.hasAudio ? ' (with Audio)' : ' (no Audio)'}
                </a>
                <figure>
                  <figcaption>Listen to the Audio:</figcaption>
                  <audio controls src={videos.audios?.items[1]?.url}></audio>
                  <a href={videos.audios?.items[1]?.url}> Download audio </a>
                </figure>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function videoRender(url: string, videos: VideoData): string | undefined {
  if (url.includes('https://youtu.be/') || url.includes('https://www.youtube.com/')) {
    return videos.videos?.items[0].url;
  } else if (url.includes('https://www.tiktok.com/')) {
    return videos.data?.play;
  } else if (url.includes('https://www.instagram.com/')) {
    return videos.download_url;
  } else if (url.includes('https://www.facebook.com/')) {
    return videos.links?.sdLink;
  } else if (url.includes('https://twitter.com/')) {
    return videos?.data?.src;
  }
}

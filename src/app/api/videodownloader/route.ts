import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosRequestConfig } from 'axios';

export async function POST(req: NextRequest) {
  const { url }: { url: string } = await req.json();
  let options: AxiosRequestConfig;

  let Id = url.split('/').includes('shorts')
    ? url.split('/shorts/')[1]?.split('?')[0]
    : url.split('/')[3]?.split('?')[0];
  console.log("Extracted videoId:", Id); // Debugging




  if (url.includes('https://www.facebook.com/')) {
    options = {
      method: 'GET',
      url: 'https://facebook-video-and-reel-downloader1.p.rapidapi.com/status',
      params: {
        url: url,
      },
      headers: {
        'x-rapidapi-key': '65edbf7688msh6c557d53975b9adp154e24jsn5b8f3ed62de7',
        'x-rapidapi-host': 'facebook-video-and-reel-downloader1.p.rapidapi.com'
      }
    };
  } else if (url.includes('https://www.tiktok.com/')) {
    options = {
      method: 'GET',
      url: 'https://tiktok-video-no-watermark2.p.rapidapi.com/',
      params: { url, hd: '0' },
      headers: {
        'x-rapidapi-key': 'a26f9feb6fmshee2828919b06e7dp17c59cjsnd452b224e229',
        'x-rapidapi-host': 'tiktok-video-no-watermark2.p.rapidapi.com',
      },
    };
  } else if (url.includes('https://www.instagram.com/')) {
    options = {
      method: 'GET',
      url: 'https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/get-info-rapidapi',
      params: { url },
      headers: {
        'x-rapidapi-key': 'a26f9feb6fmshee2828919b06e7dp17c59cjsnd452b224e229',
        'x-rapidapi-host': 'instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com',
      },
    };
    // } else if (
    //   url.includes('https://youtu.be/') ||
    //   url.includes('https://www.youtube.com/') ||
    //   url.includes('https://www.youtube.com/shorts/')
    // ) {

    //   options = {
    //     method: 'GET',
    //     url: 'https://yt-api.p.rapidapi.com/dl',
    //     params: { id: Id },
    //     headers: {
    //       'x-rapidapi-key': 'a26f9feb6fmshee2828919b06e7dp17c59cjsnd452b224e229',
    //       'x-rapidapi-host': 'yt-api.p.rapidapi.com'
    //     }
    //   };

    // options = {
    //   method: 'GET',
    //   url: 'https://youtube-media-downloader.p.rapidapi.com/v2/video/details',
    //   params: {
    //     videoId: Id,
    //   },
    //   headers: {
    //     'x-rapidapi-key': 'a26f9feb6fmshee2828919b06e7dp17c59cjsnd452b224e229',
    //     'x-rapidapi-host': 'youtube-media-downloader.p.rapidapi.com',
    //   },
    // };
  } else if (url.includes('https://twitter.com/')) {
    options = {
      method: 'GET',
      url: 'https://twitter-downloader.p.rapidapi.com/',
      params: {
        url: url,
      },
      headers: {
        'x-rapidapi-key': 'a26f9feb6fmshee2828919b06e7dp17c59cjsnd452b224e229',
        'x-rapidapi-host': 'twitter-downloader.p.rapidapi.com',
      },
    };
  }
  else {
    return NextResponse.json({ error: 'Unsupported platform' }, { status: 400 });
  }

  try {
    const response = await axios.request(options);
    return NextResponse.json(response.data);

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



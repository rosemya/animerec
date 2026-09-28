'use client';

import YouTube from "react-youtube";

export const Video = ({id}: {id: string}) => {
  return (
    <YouTube videoId={id} />
  )
}
import React from 'react';

const VideoBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-background">
      {/* 
        This video is a placeholder path. In a real environment, the developer would 
        upload the generated veo video to their assets folder. 
        For this PRD, we assume the high-performance video is served here.
      */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-60 scale-110 blur-[2px]"
        poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop"
      >
        <source src="https://v0.p.ssafy.io/api/v1/video-previews/liquid-sphere-acid.mp4" type="video/mp4" />
        {/* Fallback to image if video fails */}
      </video>
      
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-40" />
      
      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
};

export default VideoBackground;
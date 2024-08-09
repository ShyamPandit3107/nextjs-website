import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, X, RotateCw, Maximize2 } from "lucide-react";
import Image from "next/image";

const ImageViewer = ({
  src,
  alt,
  className,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [initialZoom, setInitialZoom] = useState(1);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const calculateInitialZoom = () => {
    if (imageRef.current && imageContainerRef.current) {
      const containerWidth = imageContainerRef.current.clientWidth;
      const containerHeight = imageContainerRef.current.clientHeight;
      const imageWidth = imageRef.current.naturalWidth;
      const imageHeight = imageRef.current.naturalHeight;

      const widthRatio = containerWidth / imageWidth;
      const heightRatio = containerHeight / imageHeight;

      return Math.min(widthRatio, heightRatio, 1);
    }
    return 1;
  };

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.2, 3));
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.1));
  };

  const handleRotate = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };

  const handleFitToScreen = () => {
    setScale(initialZoom);
    setRotation(0);
  };

  useEffect(() => {
    if (isOpen) {
      const newInitialZoom = calculateInitialZoom();
      setInitialZoom(newInitialZoom);
      setScale(newInitialZoom);
    } else {
      setScale(1);
      setRotation(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const container = imageContainerRef.current;
    if (container) {
      container.scrollTop =
        (container.scrollHeight - container.clientHeight) / 2;
      container.scrollLeft =
        (container.scrollWidth - container.clientWidth) / 2;
    }
  }, [scale, rotation]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Image
          src={src}
          alt={alt}
          className={`cursor-pointer ${className}`}
          width={width || 500}
          height={height || 300}
        />
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0">
        <div className="relative w-full h-full">
          <div
            ref={imageContainerRef}
            className="overflow-auto w-full h-full"
            style={{
              maxHeight: "calc(90vh - 4rem)", // Adjust for button height
            }}
          >
            <div className="min-w-full min-h-full flex items-center justify-center">
              <Image
                ref={imageRef}
                src={src}
                alt={alt}
                className="max-w-none max-h-none transition-all duration-200 ease-in-out w-auto h-auto"
                style={{
                  transform: `scale(${scale}) rotate(${rotation}deg)`,
                  transformOrigin: "center center",
                }}
                width={1000}
                height={1000}
                onLoad={() => {
                  const newInitialZoom = calculateInitialZoom();
                  setInitialZoom(newInitialZoom);
                  setScale(newInitialZoom);
                }}
              />
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-white hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <Button variant="secondary" size="icon" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" onClick={handleRotate}>
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" onClick={handleFitToScreen}>
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewer;

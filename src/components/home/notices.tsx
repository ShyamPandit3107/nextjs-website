"use client";
import { useNoticeInstitute } from "@/api/api-hooks";
import { useStore } from "@/store";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const Notices = () => {
  const id = useStore((state) => state.id);
  const { data: noticeInstitute } = useNoticeInstitute({ id });
  const announcement = noticeInstitute?.announcement?.slice(0, 5);

  return (
    <article className="m-4 md:m-10 shadow-md border border-gray-200 rounded-md">
      <h1 className="text-center text-2xl md:text-3xl text-primary font-bold my-4">
        Notices
      </h1>
      <div className="mt-4 md:mt-10 flex flex-col items-center justify-center mx-4 md:mx-20 mb-6 md:mb-10 px-4 md:px-10 lg:px-20">
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent className="ml-0 md:ml-4">
            {announcement?.map((item: any) => (
              <CarouselItem
                key={item?._id}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="bg-background shadow-md m-2 md:m-4">
                  <CardHeader className="h-[100px] md:h-[120px] box-border mb-2">
                    <CardTitle className="text-center mb-1 text-sm md:text-base lg:text-lg">
                      {item?.insAnnTitle}
                    </CardTitle>
                    <p className="text-center text-xs md:text-sm">
                      <strong>Date: </strong>
                      {formatDate(item?.createdAt)}
                    </p>
                  </CardHeader>
                  <CardContent className="h-[150px] md:h-[200px] text-sm md:text-base">
                    {item?.insAnnDescription}
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Link href={`/notices?nid=${item?._id}`}>
                      <Button className="hover:opacity-95 hover:bg-primary text-xs md:text-sm lg:text-base">
                        Read More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <Link
          href="/notices"
          className="self-end text-primary text-sm md:text-lg underline flex items-center mt-4 md:mt-6"
        >
          Read More
          <ArrowUpRight className="ml-1" />
        </Link>
      </div>
    </article>
  );
};

export default Notices;

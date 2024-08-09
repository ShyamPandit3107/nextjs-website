"use client";
import { useAllEvents } from "@/api/api-hooks";
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
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const Events = () => {
  const eid = useStore((state) => state.ids.eventId);
  const { data: AllEvents } = useAllEvents(eid);
  console.log(AllEvents);

  return (
    <article className="m-4 sm:m-10 shadow-md border-[1px] border-gray-200 rounded-md">
      <h1 className="text-center text-2xl sm:text-3xl text-primary font-bold my-4">
        Events
      </h1>
      <div className="mt-6 sm:mt-10 flex items-center flex-col justify-center mx-4 sm:mx-30 mb-8 sm:mb-10 px-4 sm:px-20">
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent className="-ml-2 sm:-ml-4">
            {AllEvents?.all_events?.map((item: any) => (
              <CarouselItem
                key={item?._id}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="bg-background shadow-md m-2 sm:m-4">
                  <CardHeader className="h-[80px] sm:h-[100px] box-border mb-2">
                    <CardTitle className="text-center mb-1 text-sm sm:text-base">
                      {item?.event_name}
                    </CardTitle>
                    <p className="text-center text-xs sm:text-sm">
                      <strong>Date : </strong>
                      {formatDate(item?.event_date)}
                    </p>
                  </CardHeader>
                  <CardContent className="h-[150px] sm:h-[200px] flex items-center justify-center text-xs sm:text-sm">
                    {item?.event_status}
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Link href={`/events?eid=${item?._id}`}>
                      <Button className="text-xs sm:text-sm hover:opacity-95 hover:bg-primary">
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
          href="/events"
          className="self-end text-primary text-base sm:text-lg underline flex items-center mt-4 sm:mt-0"
        >
          Read More
          <ArrowUpRight className="ml-1" />
        </Link>
      </div>
    </article>
  );
};

export default Events;

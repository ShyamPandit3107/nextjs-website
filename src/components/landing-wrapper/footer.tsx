import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Footer = ({ instituteAbout }: any) => {
  return (
    <footer className="bg-white text-gray-700">
      <Card className="border-0 rounded-none">
        <CardContent className="p-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Address Section */}
              <div>
                <h3 className="font-bold mb-4">Address</h3>
                <p>{instituteAbout?.insAddress}</p>
                <p className="mt-4">
                  <strong>Contact:</strong>
                  {(instituteAbout?.insPhoneNumber &&
                    typeof instituteAbout?.insPhoneNumber === "bigint") ||
                  typeof instituteAbout?.insPhoneNumber === "number" ? (
                    <p className="text-normal">
                      {instituteAbout?.insPhoneNumber}
                    </p>
                  ) : (
                    instituteAbout?.insPhoneNumber?.map(
                      (item: string, index: number) => (
                        <p className="text-normal" key={index}>
                          {item}
                        </p>
                      )
                    )
                  )}
                </p>
                <p className="mt-4">
                  <strong>Email:</strong>
                </p>
                <p>{instituteAbout?.insEmail}</p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/admissions" className="hover:underline">
                      Admissions
                    </Link>
                  </li>
                  <li>
                    <Link href="/video-gallery" className="hover:underline">
                      Video Gallery
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy" className="hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Gallery and Social Links */}
              <div>
                {/* <h3 className="font-bold mb-4">Gallery</h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <Card className="overflow-hidden">
                    <img
                      src="/api/placeholder/150/150"
                      alt="Gallery 1"
                      className="w-full h-auto"
                    />
                  </Card>
                  <Card className="overflow-hidden">
                    <img
                      src="/api/placeholder/150/150"
                      alt="Gallery 2"
                      className="w-full h-auto"
                    />
                  </Card>
                  <Card className="overflow-hidden">
                    <img
                      src="/api/placeholder/150/150"
                      alt="Gallery 3"
                      className="w-full h-auto"
                    />
                  </Card>
                  <Card className="overflow-hidden">
                    <img
                      src="/api/placeholder/150/150"
                      alt="Gallery 4"
                      className="w-full h-auto"
                    />
                  </Card>
                </div> */}
                <h3 className="font-bold mb-4">Social Links</h3>
                <div className="flex space-x-2 bg">
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="bg-card text-card-foreground"
                  >
                    <Link
                      href={
                        instituteAbout?.landing_control?.footer_links
                          ?.facebook_link ?? "https://www.facebook.com/"
                      }
                    >
                      <Facebook className="h-4 w-4 " />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-card text-card-foreground"
                    size="icon"
                    asChild
                  >
                    <Link
                      href={
                        instituteAbout?.landing_control?.footer_links
                          ?.twitter_link ?? "https://twitter.com/"
                      }
                    >
                      <Twitter className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-card text-card-foreground"
                    size="icon"
                    asChild
                  >
                    <Link
                      href={
                        instituteAbout?.landing_control?.footer_links
                          ?.linkedin_link ?? "https://www.linkedin.com/"
                      }
                    >
                      <Linkedin className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-card text-card-foreground"
                    size="icon"
                    asChild
                  >
                    <Link
                      href={
                        instituteAbout?.landing_control?.footer_links
                          ?.youtube_link ?? "https://www.youtube.com/"
                      }
                    >
                      <Youtube className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-card text-card-foreground"
                    size="icon"
                    asChild
                  >
                    <Link
                      href={
                        instituteAbout?.landing_control?.footer_links
                          ?.youtube_link ?? "https://www.instagram.com/"
                      }
                    >
                      <Instagram className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Separator />
      <div className="py-4 bg-primary text-secondary text-center">
        <p>
          Copyright ©2024 All Rights Reserved | By Software Development Cell
          Qviple, Ltd
        </p>
      </div>
    </footer>
  );
};

export default Footer;

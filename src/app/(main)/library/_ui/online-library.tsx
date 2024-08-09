import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Assuming these are available or you'll create them
import { useStore } from "@/store";
import { useAllBooksByLibrary } from "@/api/api-hooks";
import { imageShowUrl } from "@/lib/BaseUrl";
import Heading from "@/components/ui/heading";
import ImageViewer from "@/components/ui/image-viewer";

export default function LibraryOnline() {
  const libraryId = useStore((state) => state.ids.libraryId);
  const [selectedBook, setSelectedBook] = useState(null);
  const { data: getAllBookByLibrary } = useAllBooksByLibrary({
    lid: libraryId,
    limit: 1000,
    page: 1,
    search: "",
  });
  console.log(getAllBookByLibrary);
  const BookCard = ({ book }: { book: any }) => (
    <Card
      className="flex items-center bg-white hover:bg-gray-50 shadow-md rounded-lg p-2 my-2 mx-4 cursor-pointer"
      onClick={() => setSelectedBook(book)}
    >
      <CardContent className="flex p-0">
        <ImageViewer
          src={`${imageShowUrl}/`}
          alt={book?.bookName}
          width={80}
          height={112}
          className="object-cover rounded-md mr-4"
        />
        <div>
          <h2 className="text-lg font-semibold mb-1">{book?.bookName}</h2>
          <p className="text-gray-600 mb-1">{book?.author}</p>
          <p className="text-gray-500 mb-2">{book?.language}</p>
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full mr-2 ${
                book.bookStatus === "Online" ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-sm font-medium">{book?.bookStatus}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const BookDetailsModal = ({ book, onClose }: { book: any; onClose: any }) => (
    <Dialog open={!!book} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{book?.bookName}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-4">
          <ImageViewer
            src={`/pdf-viewer/${book?.photo}`}
            alt={book?.bookName}
            width={80}
            height={112}
            className="object-cover rounded-md"
          />
          <div>
            <p className="text-gray-600 mb-1 font-semibold">{book?.author}</p>
            <p className="text-gray-500 mb-2">{book?.language}</p>
            <div className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full mr-2 ${
                  book?.bookStatus === "Online" ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span className="text-sm font-medium">{book?.bookStatus}</span>
            </div>
          </div>
        </div>
        <div className="my-2">
          <p className="my-2">
            <strong>Book Publication</strong>: {book?.publication}
          </p>
          <p className="my-2">
            <strong>Pages</strong>: {book?.totalPage}
          </p>
          <p className="my-2">
            <strong>Book Price</strong>: {book?.price}
          </p>
          <p className="my-2">
            <strong>Available</strong>: Penguin Books
          </p>
          <p className="my-2">
            <strong>Description</strong>: Penguin Books
          </p>
        </div>
        <div className="mt-4">
          <Link href={`/pdf-viewer/${book?.attachment?.[0].documentKey}`}>
            <Button>Download</Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="my-2">
      <Heading>Online Library</Heading>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {getAllBookByLibrary?.books?.map((book: any, index: number) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
      {selectedBook && (
        <BookDetailsModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}

import Link from "next/link";
import { FC } from "react";

export default function CreateSet()  {
    return (
      <div>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="h-40 bg-[#4954E0] bg-opacity-80 flex items-center justify-center p-6">
              <div className="text-white text-center">
                <svg
                  className="w-16 h-16 mx-auto mb-2 opacity-90"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                </svg>
                <h3 className="text-xl font-bold">Generate</h3>
              </div>
            </div>
            <div className="p-6">
              <Link
                href="/geenrateflashcards"
                className="inline-flex items-center font-medium"
              >
                Let AI generate flashcards for you
                <svg
                  className="w-4 h-4 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
        </div>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="h-40 bg-[#4954E0] bg-opacity-80 flex items-center justify-center p-6">
              <div className="text-white text-center">
                <svg
                  className="w-16 h-16 mx-auto mb-2 opacity-90"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                </svg>
                <h3 className="text-xl font-bold">Create Manually</h3>
              </div>
            </div>
            <div className="p-6">
              <Link
                href="/manualflashcards"
                className="inline-flex items-center font-medium"
              >
                Create your own flashcard sets
                <svg
                  className="w-4 h-4 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
        </div>
      </div>
    );
}
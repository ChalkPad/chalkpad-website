import Link from "next/link";

export default function CreateSet() {
  return (
    <div className="min-h-screen bg-[#F1F1E8] py-10 px-6 md:px-10 font-satoshi">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#4954E0] mb-4 font-satoshi">
          Create Flashcards
        </h1>
        <p className="text-lg text-[#4954E0] opacity-70 max-w-2xl font-satoshi">
          Choose your preferred method to build your knowledge base
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* AI Generation Card */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            <div className="h-52 bg-gradient-to-br from-[#4954E0] to-[#4954E0]/80 flex items-center justify-center p-6">
              <div className="text-white text-center">
                <div className="bg-white/10 p-4 rounded-full inline-block mb-4">
                  <svg
                    className="w-16 h-16 opacity-90"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold font-satoshi">
                  AI Generation
                </h3>
              </div>
            </div>
            <div className="p-6">
              <p className="mb-6 text-[#4954E0]/80 font-satoshi">
                Use AI to instantly generate comprehensive flashcard sets on any
                topic. Perfect for quick study preparation.
              </p>
              <Link
                href="/main/generateflashcards"
                className="inline-flex items-center py-2 px-4 bg-[#4954E0]/10 rounded-lg font-medium text-[#4954E0] hover:bg-[#4954E0]/20 transition-all group font-satoshi"
              >
                Generate with AI
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
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

          {/* Manual Creation Card */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            <div className="h-52 bg-gradient-to-br from-[#4954E0] to-[#4954E0]/80 flex items-center justify-center p-6">
              <div className="text-white text-center">
                <div className="bg-white/10 p-4 rounded-full inline-block mb-4">
                  <svg
                    className="w-16 h-16 opacity-90"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold font-satoshi">
                  Manual Creation
                </h3>
              </div>
            </div>
            <div className="p-6">
              <p className="mb-6 text-[#4954E0]/80 font-satoshi">
                Build custom flashcard sets with your own content. Ideal for
                personalized study materials and specific learning goals.
              </p>
              <Link
                href="/main/manualflashcards"
                className="inline-flex items-center py-2 px-4 bg-[#4954E0]/10 rounded-lg font-medium text-[#4954E0] hover:bg-[#4954E0]/20 transition-all group font-satoshi"
              >
                Create Manually
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
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

        {/* Alternative Cards View - For Recently Created Sets */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-[#4954E0] mb-6 font-satoshi">
            Recently Created Sets
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Example Set */}
            <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg text-[#4954E0] font-satoshi">
                  Chemistry Basics
                </h3>
                <span className="bg-[#4954E0]/10 text-[#4954E0] text-xs rounded-full px-2 py-1 font-satoshi">
                  12 cards
                </span>
              </div>
              <p className="text-[#4954E0]/70 text-sm mb-4 font-satoshi">
                Elements, compounds, and basic reactions
              </p>
              <Link
                href="/flashcards/chemistry-basics"
                className="text-sm inline-flex items-center text-[#4954E0] hover:underline transition-all group font-satoshi"
              >
                Review set
                <svg
                  className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform"
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

            {/* Example Set */}
            <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg text-[#4954E0] font-satoshi">
                  Spanish Vocabulary
                </h3>
                <span className="bg-[#4954E0]/10 text-[#4954E0] text-xs rounded-full px-2 py-1 font-satoshi">
                  24 cards
                </span>
              </div>
              <p className="text-[#4954E0]/70 text-sm mb-4 font-satoshi">
                Common phrases and essential vocabulary
              </p>
              <Link
                href="/flashcards/spanish-vocab"
                className="text-sm inline-flex items-center text-[#4954E0] hover:underline transition-all group font-satoshi"
              >
                Review set
                <svg
                  className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform"
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

            {/* Create New Set Card */}
            <div className="border-2 border-dashed border-[#4954E0]/30 rounded-xl p-5 flex flex-col items-center justify-center text-center hover:border-[#4954E0]/50 transition-all duration-300">
              <div className="w-12 h-12 bg-[#4954E0]/10 rounded-full flex items-center justify-center mb-3">
                <svg
                  className="w-6 h-6 text-[#4954E0]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-[#4954E0] mb-1 font-satoshi">
                Create New Set
              </h3>
              <p className="text-sm text-[#4954E0]/60 mb-0 font-satoshi">
                Add to your collection
              </p>
            </div>
          </div>
        </div>

        {/* Back to Flashcards Link */}
        <div className="mt-12">
          <Link
            href="/main/home"
            className="inline-flex items-center py-2 px-4 bg-white rounded-lg text-[#4954E0] shadow-sm hover:shadow-md transition-all font-satoshi"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            Back to Flashcards
          </Link>
        </div>
      </div>
    </div>
  );
}

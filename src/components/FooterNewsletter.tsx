// src/components/FooterNewsletter.tsx
"use client";

export function FooterNewsletter() {
   return (
      <form
         onSubmit={(e) => e.preventDefault()}
         className="flex gap-2 w-full sm:w-auto"
      >
         <input
            type="email"
            placeholder="email@kamu.com"
            className="flex-1 sm:w-56 bg-gray-700 border border-gray-600 text-white text-sm px-4 py-2 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
         />
         <button
            type="submit"
            className="bg-green-600 hover:bg-green-500 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap flex-shrink-0"
         >
            Subscribe
         </button>
      </form>
   );
}

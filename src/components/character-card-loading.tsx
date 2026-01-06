const CharacterCardSkeleton = () => {
  return (
  <>
   {
    [...Array(20)].map((_, i) => (
         <main key={i} className="flex flex-col items-center border border-gray-200 rounded-md">
      <section className="py-7 flex flex-col gap-3 w-full px-4">
        
        {/* Image / banner placeholder */}
        <div className="rounded-md w-75 h-40 bg-gray-200 animate-pulse" />

        {/* Title + badge */}
        <h2 className="flex items-center gap-2">
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-16 bg-gray-200 rounded-2xl animate-pulse" />
        </h2>

        {/* Meta pills */}
        <div className="flex items-center gap-2">
          <div className="h-5 w-24 bg-gray-200 rounded-2xl animate-pulse" />
          <div className="h-5 w-20 bg-gray-200 rounded-2xl animate-pulse" />
        </div>

      </section>
    </main>
    ))
   }
  </>
  );
};

export default CharacterCardSkeleton;
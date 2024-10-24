"use client";

export default function SkeletonNews() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {Array(4).fill().map((_, index) => (
        <div key={index} className="p-4 bg-gray-200 rounded-lg animate-pulse">
          <div className="overflow-hidden rounded-lg">
            <div className="w-full h-52 bg-gray-300 rounded-lg"></div> {/* Simula la imagen, ajustado a h-52 */}
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div> {/* Simula la categoría */}
            <div className="h-6 bg-gray-300 rounded w-3/4"></div> {/* Simula el título */}
            <div className="h-4 bg-gray-300 rounded w-2/3"></div> {/* Simula el subtítulo */}
          </div>
          
          <div className="mt-4 h-4 bg-gray-300 rounded w-1/3"></div> {/* Simula la fecha */}
        </div>
      ))}
    </div>
  );
}

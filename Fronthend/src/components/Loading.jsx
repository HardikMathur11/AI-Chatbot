export const LoadingSpinner = () => {
  return (
    <div className="inline-block w-5 h-5 border-2 border-t-2 border-r-transparent border-emerald-400 rounded-full animate-spin"></div>
  );
};

export const LoadingBig = () => {
  return (
    <div className="flex space-x-2 justify-center items-center w=[200px] m-auto mt-[300px]">
      <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-sky-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-full animate-bounce"></div>
    </div>
  );
};

export const LoadingSmall = () => {
  return (
    <div className="flex space-x-2 justify-center items-center">
      <div className="h-4 w-4 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-4 w-4 bg-fuchsia-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-4 w-4 bg-emerald-400 rounded-full animate-bounce"></div>
    </div>
  );
};

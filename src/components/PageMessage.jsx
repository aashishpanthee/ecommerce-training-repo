const PageMessage = ({ message, tone = 'neutral' }) => {
  const toneClass = tone === 'error' ? 'text-red-500' : 'text-gray-500';

  return (
    <div className="bg-linear-to-b from-slate-50 via-white to-slate-100">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <p className={`text-center ${toneClass}`}>{message}</p>
      </div>
    </div>
  );
};

export default PageMessage;

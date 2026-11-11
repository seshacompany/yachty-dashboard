export function HeaderReactionRate() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <p className="text-sidebar dark:text-white/90">
          معدل التفاعل
        </p>
        <p className="font-medium md:text-5xl text-3xl text-sidebar dark:text-white">
          47.62%
        </p>
        <p className="text-sm text-trending-up-color">
          +5.6%
        </p>
      </div>
      <div className="bg-trending-up-color px-4 py-2 rounded-xl flex justify-center items-center">
        <p>
          سنوي
        </p>
      </div>
    </div>
  );
}

type OneItemDetailsOrderProps = {
  title: string,
  value: string
};

export function OneItemDetailsOrder({ title, value }: OneItemDetailsOrderProps) {
  return (
    <div className="flex justify-between py-2 border-b border-solid border-white/5">
      <p className="text-secondary-light">
        {title}
      </p>
      <p className="font-light text-sm">
        {value}
      </p>
    </div>
  );
}

type OneItemCustomersProps = {
  title: string,
  value: string
};

export function OneItemCustomers({ title, value }: OneItemCustomersProps) {
  return (
    <div className="flex justify-between py-2 border-b border-solid border-white/5">
      <p className="text-secondary-light">
        {title}
      </p>
      <p className="text-sm text-secondary-light">
        {value}
      </p>
    </div>
  );
}

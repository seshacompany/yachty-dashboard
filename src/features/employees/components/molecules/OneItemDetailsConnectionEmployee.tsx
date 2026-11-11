type OneItemDetailsConnectionEmployeeProps = {
  value: string | number | boolean,
  title: string,
};

export function OneItemDetailsConnectionEmployee({ title, value }: OneItemDetailsConnectionEmployeeProps) {
  return (
    <div className="flex justify-between">
      <p className="text-sidebar/90 dark:text-white/90">
        {title}
      </p>
      <p className="text-sidebar/70 dark:text-white/70">
        {value}
      </p>
    </div>
  );
}

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function SearchCustomers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("email") || "");

  useEffect(() => {
    setValue(searchParams.get("email") || "");
  }, [searchParams]);

  useEffect(() => {
    const currentEmail = searchParams.get("email") || "";
    if (value === currentEmail) return;

    const timer = setTimeout(() => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        if (value.trim()) {
          params.set("email", value.trim());
        } else {
          params.delete("email");
        }
        params.delete("page");
        return params;
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [value, searchParams, setSearchParams]);

  const handleClear = () => {
    setValue("");
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete("email");
      params.delete("page");
      return params;
    });
  };

  return (
    <div className="flex-1 p-2 border rounded-lg border-sidebar/20 dark:border-white/20 bg-white dark:bg-card-dark flex gap-2 items-center">
      <Search size={18} className="text-sidebar/60 dark:text-white/60 shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="البحث بالبريد الإلكتروني..."
        className="focus:outline-none text-sidebar dark:text-white placeholder:text-sidebar/50 dark:placeholder:text-white/40 flex-1 text-sm bg-transparent"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="text-sidebar/50 dark:text-white/40 hover:text-sidebar dark:hover:text-white cursor-pointer"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

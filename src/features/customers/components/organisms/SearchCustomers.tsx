import { Mail, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function SearchCustomers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentEmail = searchParams.get("email") || "";
  const currentPhone = searchParams.get("phone") || "";

  const [emailValue, setEmailValue] = useState(currentEmail);
  const [phoneValue, setPhoneValue] = useState(currentPhone);

  useEffect(() => {
    setEmailValue(currentEmail);
  }, [currentEmail]);

  useEffect(() => {
    setPhoneValue(currentPhone);
  }, [currentPhone]);

  useEffect(() => {
    if (emailValue.trim() === currentEmail.trim()) return;

    const timer = setTimeout(() => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        if (emailValue.trim()) {
          params.set("email", emailValue.trim());
        } else {
          params.delete("email");
        }
        params.set("page", "1");
        return params;
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [emailValue, currentEmail, setSearchParams]);

  useEffect(() => {
    if (phoneValue.trim() === currentPhone.trim()) return;

    const timer = setTimeout(() => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        if (phoneValue.trim()) {
          params.set("phone", phoneValue.trim());
        } else {
          params.delete("phone");
        }
        params.set("page", "1");
        return params;
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [phoneValue, currentPhone, setSearchParams]);

  const handleClearEmail = () => {
    setEmailValue("");
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete("email");
      params.set("page", "1");
      return params;
    });
  };

  const handleClearPhone = () => {
    setPhoneValue("");
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete("phone");
      params.set("page", "1");
      return params;
    });
  };

  return (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
      {/* Email Search */}
      <div className="p-2 border rounded-lg border-sidebar/20 dark:border-white/20 bg-white dark:bg-card-dark flex gap-2 items-center">
        <Mail
          size={17}
          className="text-sidebar/60 dark:text-white/60 shrink-0"
        />
        <input
          type="text"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          placeholder="البحث بالبريد الإلكتروني..."
          className="focus:outline-none text-sidebar dark:text-white placeholder:text-sidebar/50 dark:placeholder:text-white/40 flex-1 text-sm bg-transparent min-w-0"
        />
        {emailValue && (
          <button
            type="button"
            onClick={handleClearEmail}
            className="text-sidebar/50 dark:text-white/40 hover:text-sidebar dark:hover:text-white cursor-pointer"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Phone Search */}
      <div className="p-2 border rounded-lg border-sidebar/20 dark:border-white/20 bg-white dark:bg-card-dark flex gap-2 items-center">
        <Phone
          size={17}
          className="text-sidebar/60 dark:text-white/60 shrink-0"
        />
        <input
          type="text"
          value={phoneValue}
          onChange={(e) => setPhoneValue(e.target.value)}
          placeholder="البحث برقم الهاتف..."
          className="focus:outline-none text-sidebar dark:text-white placeholder:text-sidebar/50 dark:placeholder:text-white/40 flex-1 text-sm bg-transparent min-w-0"
        />
        {phoneValue && (
          <button
            type="button"
            onClick={handleClearPhone}
            className="text-sidebar/50 dark:text-white/40 hover:text-sidebar dark:hover:text-white cursor-pointer"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

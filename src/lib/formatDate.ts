export function formatDateToDDMMYYYY(dateString: string): string {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

export function formatTimeAgo(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);

    const diffMs = now.getTime() - date.getTime();

    const seconds = Math.floor(diffMs / 1000);
    if (seconds < 60) {
        return `${seconds} ثانية`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} دقيقة`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} ساعة`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
        return `${days} يوم`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
        return `${months} شهر`;
    }

    const years = Math.floor(months / 12);
    return `${years} سنة`;
}
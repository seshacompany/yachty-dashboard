
type DetailsMessageProps = {
    value: string;
    title: string;
};

export function OneItemDetailsMessage({ value, title }: DetailsMessageProps) {
    return (
        <div className="flex">
            <p>
                {title + " : "}
            </p>
            <p>
                {value}
            </p>
        </div>
    );
}

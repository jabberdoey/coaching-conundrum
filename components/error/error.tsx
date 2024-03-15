export default function Error({ message }: { message: string; }) {
    return (
        <div className="pt-5">
            {message}
        </div>
    );
}

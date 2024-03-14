export default function Page({
    params,
}: {
    params: { id: string; }
}) {
    return (
        <div>
            <h1>Booking</h1>
            <p>{`Student id: ${params.id}`}</p>
        </div>
    );
}

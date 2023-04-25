import Link from 'next/link';
import Image from 'next/image';

export default function ({data}) {
    return (
        <>
            <div className="events_page">
                {data.map((event) => (
                    <Link key={event.id} href={`/events/${event.id}`} className="card">
                            <Image src={event.image} alt={event.title} width={500} height={500} /> 
                            <h2>{event.title} </h2>
                    </Link>
                ))}
            </div>
        </>
    )
}

export async function getStaticProps() {
    const data = await import('@/data.json');

    return {
        props: {
            data: data.events_categories
        }
    }
}
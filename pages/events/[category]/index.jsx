
import Link from 'next/link';
import Image from 'next/image';

export default function EventsByCategory({ data,category }) {
    return (
        <>
            <div className="cat_events">
                <h1> Events in {category} </h1>

                <div className="content">
                    {data.map((event) => (
                        <Link key={event.id} href={`/events/${event.city}/${event.id}`} className="card">
                                <Image width={300} height={300} alt={event.title} src={event.image} />
                                <h2> {event.title} </h2>
                                <p> {event.description} </p>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const data = await import('@/data.json');
    const categories = data.events_categories;
    const paths = categories.map(category => ({
        params: {
            category: category.id
        }
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const data = await import('@/data.json');
    const events = data.allEvents;

    const category = context.params.category;
    const filterEvents = events.filter(event => event.city === category);
 
    return {
        props: {
            data: filterEvents,
            category
        }
    }
}
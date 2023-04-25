import Image from 'next/image';

export default function Event({ data }) {
    const onSubmit = () => {

    }

    return (
        <>
            <div className="event_single_page">
                <h1> {data.title} </h1>
                <Image src={data.image} width={1000} height={500} alt={data.title} />
                <p> {data.description} </p>
                <form onSubmit={onSubmit} className="email_registration">
                    <label> Get Registered for this event!</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Please insert your email here"
                    />
                    <button type="submit"> Submit</button>
                </form>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const data = await import('@/data.json');
    const events = data.allEvents;
    const paths = events.map(event => (
        {
            params: {
                category: event.city,
                id: event.id
            }
        }
    ))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const id = context.params.id;
    const data = await import('@/data.json');
    const events = data.allEvents;

    const event = events.find((event) => id === event.id);


    return {
        props: {
            data: event
        }
    }
}
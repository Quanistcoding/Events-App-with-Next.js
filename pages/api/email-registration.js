import path from 'path';
import fs from 'fs';

function buildPath() {
  return path.join(process.cwd(), 'data.json');
}

function extractData(filePath) {
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export default function handler(req, res) {
  const { method } = req;

  const filePath = buildPath();
  const { events_categories, allEvents } = extractData(filePath);

  if (!allEvents) {
    return res.status(404).json({
      status: 404,
      message: 'Events data not found',
    });
  }

  if (method === 'POST') {
    const { email, eventId } = req.body;

    if (!email | !email.includes('@')) {
      return res.json({ message: 'Invalid email address' });
    }

    const targetEven = allEvents.find(ev => ev.id === eventId);

    if(targetEven.emails_registered.includes(email))
      return res.send({ message: 'Email already registered' });

    const newAllEvents = allEvents.map((ev) => {
      if (ev.id === eventId && !ev.emails_registered.includes(email)) {
        return {
          ...ev,
          emails_registered: [...ev.emails_registered, email],
        };
      }      
      return ev;
    });

    fs.writeFileSync(filePath, JSON.stringify({ events_categories, allEvents: newAllEvents }));

    res.status(201).json({
      message: `You have been registered successfully with the email: ${email} for the event: ${eventId}`,
    });
  }
}

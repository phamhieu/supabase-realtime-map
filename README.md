# Live Tracker Map
Build with supabase realtime and leafletjs. [[Demo App]](https://realtime-map.vercel.app/)

<p align="center">
<kbd>
<img src="https://media.giphy.com/media/iDU80ngpsSddc0ObGI/giphy.gif" alt="Demo"/>
</kbd>
</p>

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fphamhieu%2Fsupabase-realtime-map&project-name=my-supabase-realtime-map&repository-name=my-supabase-realtime-map&demo-title=Realtime%20map%20demo&demo-description=A%20demo%20project%20deployed%20on%20vercel&demo-url=https%3A%2F%2Frealtime-map.vercel.app&demo-image=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FiDU80ngpsSddc0ObGI%2Fgiphy.gif&integration-ids=oac_jUduyjQgOyzev1fjrW83NYOv&external-id=supabase_realtime_map)

## How to use
#### Clone this folder
```bash
git clone https://github.com/supabase/supabase
cd supabase/examples/live-tracker-map
```

#### Install dependencies
```bash
npm install 
```

#### Start the app
```bash
# Open a terminal and run:
npm run dev
```
Visit http://localhost:4000 and start testing!

## Test with your own Supabase Project
#### Create locations table
Go to [app.supabase.io](https://app.supabase.io/), create a new organisation and project if you haven't had one.  
Run this sql query to create `locations` table.
```sql
CREATE TABLE locations (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  ref VARCHAR(40)
);
```

#### Setup env vars
Make a .env.local in this folder with the following, you can get these values from your project dashboard at [app.supabase.io](https://app.supabase.io/):
```bash
NEXT_PUBLIC_SUPABASE_ENDPOINT=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_APIKEY=<your-supabase-key>
```

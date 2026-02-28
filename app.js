let eventsCount = document.querySelector('.events-count')
let eventsList = document.querySelector('.events')
// let arr = [1,2,3,4,5]
// arr.forEach((e)=>{
//     const li = document.createElement('li')
//     li.textContent = e;
//     eventsList.append(li)
// })

async function eventDisplay() {
    // const url = `https://site.api.espn.com/apis/site/v2/sports/mma/ufc/scoreboard`;
    const today = new Date();

    const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, "");

    // console.log(formattedDate);
    const url = `https://site.api.espn.com/apis/site/v2/sports/mma/ufc/scoreboard?dates=${formattedDate}-20261231`

    try {
        const response = await fetch(url)
        const data = await response.json();
        console.log(data)
        console.log(data.events.length)
        const eventCount = data.events.length;
        if(eventCount > 1){
             eventsCount.textContent = `${eventCount} Events`;
        }else{
            eventsCount.textContent = `${eventCount} Event`
        }
        // const events = data.events.map((e)=>{
        //     return e.name;
        // })
        const upcomingEvents = data.events.map((e) => {
            return e;
        })

        console.log(upcomingEvents[0])
        upcomingEvents.forEach(element => {

            const li = document.createElement('li')
            const date = document.createElement('p')
            date.style.fontSize = '1.2rem'
            const rawDate = element.date;
            const dateObj = new Date(rawDate);

            const formattedDate = dateObj.toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            });
            date.textContent = formattedDate;
            li.append(date)
            const name = document.createElement('h3')
            name.textContent = element.name;
            li.append(name)

            const venue = document.createElement('p')
            venue.style.fontSize = '1.3rem'
            const venueData = element.venues?.[0];

            if (venueData) {
                const city = venueData.address?.city || "";
                const state = venueData.address?.state || "";
                const country = venueData.address?.country || "";

                venue.textContent = `${venueData.fullName}, ${city}, ${state}  ${country}`;
            }

            li.append(venue)
            eventsList.append(li)
        });
        console.log(upcomingEvents)
        // console.log(events)
    } catch (error) {
        console.log(error)
    }
}

eventDisplay()

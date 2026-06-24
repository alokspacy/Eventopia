import mongoose from "mongoose";
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";
import Booking from "../models/Booking.js";

const connectDB = async () => {
  // Disable command buffering so queries fail fast when database is disconnected
  mongoose.set("bufferCommands", false);

  if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes("YOUR_MONGODB_URI")) {
    console.error("❌ DATABASE ERROR: MONGODB_URI is missing or set to placeholder in server/.env");
    return;
  }

  try {
    mongoose.connection.on("connected", () =>
      console.log("Database connected")
    );

    // Resolve MONGODB_URI query parameters correctly by inserting database name before '?'
    let dbUri = process.env.MONGODB_URI;
    if (dbUri.includes("?")) {
      const parts = dbUri.split("?");
      const base = parts[0].endsWith("/") ? parts[0] : parts[0] + "/";
      dbUri = `${base}eventopia?${parts[1]}`;
    } else {
      const base = dbUri.endsWith("/") ? dbUri : dbUri + "/";
      dbUri = `${base}eventopia`;
    }

    console.log("Connecting to Database at URL:", dbUri.replace(/:([^@]+)@/, ":****@")); // hide password in logs
    await mongoose.connect(dbUri);    // Seed database if movie count is less than 10 to include 13 total blockbuster movies
    const movieCount = await Movie.countDocuments();
    if (movieCount < 10) {
      console.log("Clearing existing data and seeding 13 movies and shows...");
      
      await Movie.deleteMany({});
      await Show.deleteMany({});
      await Booking.deleteMany({});
 
      const initialMovies = [
        {
          _id: "324544",
          title: "In the Lost Lands",
          overview: "A queen sends the powerful and feared sorceress Gray Alys to the ghostly wilderness of the Lost Lands in search of a magical power, where she and her guide, the drifter Boyce, must outwit and outfight both man and demon.",
          poster_path: "/dDlfjR7gllmr8HTeN6rfrYhTdwX.jpg",
          backdrop_path: "/oI5uHu7lrQ0mBBH1c8OHCAkCq4x.jpg",
          genres: [{ id: 28, name: "Action" }, { id: 14, name: "Fantasy" }, { id: 12, name: "Adventure" }],
          casts: [
            { name: "Milla Jovovich", profile_path: "/usWnHCzbADijULREZYSJ0qfM00y.jpg" },
            { name: "Dave Bautista", profile_path: "/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg" }
          ],
          release_date: "2025-02-27",
          original_language: "en",
          tagline: "She seeks the power to free her people.",
          vote_average: 6.4,
          runtime: 102,
          trailerUrl: "https://www.youtube.com/watch?v=WpW36ldAqnM"
        },
        {
          _id: "1232546",
          title: "Until Dawn",
          overview: "One year after her sister Melanie mysteriously disappeared, Clover and her friends head into the remote valley where she vanished in search of answers.",
          poster_path: "/bLY5yN4MKVynZ2HMZWElTOGBgBe.jpg",
          backdrop_path: "/3xKJ0nyUTlySmMBCpOcsuSnFPI1.jpg",
          genres: [{ id: 27, name: "Horror" }, { id: 9648, name: "Mystery" }],
          casts: [
            { name: "Milla Jovovich", profile_path: "/usWnHCzbADijULREZYSJ0qfM00y.jpg" }
          ],
          release_date: "2025-04-23",
          original_language: "en",
          tagline: "Every night a different nightmare.",
          vote_average: 6.4,
          runtime: 103,
          trailerUrl: "https://www.youtube.com/watch?v=-sAOWhvheK8"
        },
        {
          _id: "552524",
          title: "Lilo & Stitch",
          overview: "The wildly funny and touching story of a lonely Hawaiian girl and the fugitive alien who helps to mend her broken family.",
          poster_path: "/mKKqV23MQ0uakJS8OCE2TfV5jNS.jpg",
          backdrop_path: "/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg",
          genres: [{ id: 10751, name: "Family" }, { id: 35, name: "Comedy" }, { id: 878, name: "Science Fiction" }],
          casts: [
            { name: "Dave Bautista", profile_path: "/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg" }
          ],
          release_date: "2025-05-17",
          original_language: "en",
          tagline: "Hold on to your coconuts.",
          vote_average: 7.1,
          runtime: 108,
          trailerUrl: "https://www.youtube.com/watch?v=1pHDWnXmK7Y"
        },
        {
          _id: "550",
          title: "Fight Club",
          overview: "A ticking-time bomb insomniac and a slippery soap salesman channel male aggression into a shocking new form of therapy. Their concept catches on, with underground fight clubs forming in every town.",
          poster_path: "/jSziioSwPVrOy9Yow3XhWIBDjq1.jpg",
          backdrop_path: "/c6OLXfKAk5BKeR6broC8pYiCquX.jpg",
          genres: [{ id: 18, name: "Drama" }],
          casts: [
            { name: "Edward Norton", profile_path: "/5Ik19X2xh6uS096tCc7xevm34gu.jpg" },
            { name: "Brad Pitt", profile_path: "/ccD51kk7J45ehU4V7GUj511tnDk.jpg" }
          ],
          release_date: "1999-10-15",
          original_language: "en",
          tagline: "Mischief. Mayhem. Soap.",
          vote_average: 8.4,
          runtime: 139,
          trailerUrl: "https://www.youtube.com/watch?v=qtR39562acE"
        },
        {
          _id: "27205",
          title: "Inception",
          overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets, is offered a chance to regain his old life as a payment for a task considered to be impossible.",
          poster_path: "/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
          backdrop_path: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
          genres: [{ id: 28, name: "Action" }, { id: 878, name: "Science Fiction" }, { id: 12, name: "Adventure" }],
          casts: [
            { name: "Leonardo DiCaprio", profile_path: "/wo2hJv012qqd0t6Gt75qGAIvixm.jpg" },
            { name: "Joseph Gordon-Levitt", profile_path: "/33g421k8Zp46G94eJ0s04gS04S4.jpg" }
          ],
          release_date: "2010-07-15",
          original_language: "en",
          tagline: "Your mind is the scene of the crime.",
          vote_average: 8.3,
          runtime: 148,
          trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0"
        },
        {
          _id: "157336",
          title: "Interstellar",
          overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
          poster_path: "/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg",
          backdrop_path: "/2ssWTSVklAEc98frZUQhgtGHx7s.jpg",
          genres: [{ id: 12, name: "Adventure" }, { id: 18, name: "Drama" }, { id: 878, name: "Science Fiction" }],
          casts: [
            { name: "Matthew McConaughey", profile_path: "/hZ8ILV09vdxpf2hnS0zSg6w2s23.jpg" },
            { name: "Anne Hathaway", profile_path: "/o01wJy9ZkRZaAlP7y1YmcJ2R8Zf.jpg" }
          ],
          release_date: "2014-11-05",
          original_language: "en",
          tagline: "Mankind was born on Earth. It was never meant to die here.",
          vote_average: 8.4,
          runtime: 169,
          trailerUrl: "https://www.youtube.com/watch?v=zSWdZATo3Es"
        },
        {
          _id: "155",
          title: "The Dark Knight",
          overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations.",
          poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
          backdrop_path: "/cfT29Im5VDvjE0RpyKOSdCKZal7.jpg",
          genres: [{ id: 28, name: "Action" }, { id: 80, name: "Crime" }, { id: 18, name: "Drama" }],
          casts: [
            { name: "Christian Bale", profile_path: "/wo2hJv012qqd0t6Gt75qGAIvixm.jpg" },
            { name: "Heath Ledger", profile_path: "/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg" }
          ],
          release_date: "2008-07-16",
          original_language: "en",
          tagline: "Why So Serious?",
          vote_average: 8.5,
          runtime: 152,
          trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY"
        },
        {
          _id: "76600",
          title: "Avatar: The Way of Water",
          overview: "Set more than a decade after the events of the first film, learn the story of the Sully family, the trouble that follows them, the lengths they go to keep each other safe, and the battles they fight to stay alive.",
          poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
          backdrop_path: "/kJsPVzdyBrYHLomuNv5SJDXUQ2f.jpg",
          genres: [{ id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 878, name: "Science Fiction" }],
          casts: [
            { name: "Sam Worthington", profile_path: "/wo2hJv012qqd0t6Gt75qGAIvixm.jpg" },
            { name: "Zoe Saldana", profile_path: "/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg" }
          ],
          release_date: "2022-12-14",
          original_language: "en",
          tagline: "Return to Pandora.",
          vote_average: 7.6,
          runtime: 192,
          trailerUrl: "https://www.youtube.com/watch?v=d9MyW72ELq0"
        },
        {
          _id: "693134",
          title: "Dune: Part Two",
          overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.",
          poster_path: "/heM4XKC0jA8fTSNe8F7oUkcJV7Z.jpg",
          backdrop_path: "/eZ239CUp1d6OryZEBPnO2n87gMG.jpg",
          genres: [{ id: 878, name: "Science Fiction" }, { id: 12, name: "Adventure" }],
          casts: [
            { name: "Timothée Chalamet", profile_path: "/wo2hJv012qqd0t6Gt75qGAIvixm.jpg" },
            { name: "Zendaya", profile_path: "/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg" }
          ],
          release_date: "2024-02-27",
          original_language: "en",
          tagline: "Long live the fighters.",
          vote_average: 8.2,
          runtime: 166,
          trailerUrl: "https://www.youtube.com/watch?v=Way9Dexny3w"
        },
        {
          _id: "634649",
          title: "Spider-Man: No Way Home",
          overview: "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange, the stakes become even more dangerous.",
          poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
          backdrop_path: "/AeK2MPOpYrOOgZNfFnfwp0L8tNn.jpg",
          genres: [{ id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 878, name: "Science Fiction" }],
          casts: [
            { name: "Tom Holland", profile_path: "/wo2hJv012qqd0t6Gt75qGAIvixm.jpg" },
            { name: "Zendaya", profile_path: "/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg" }
          ],
          release_date: "2021-12-15",
          original_language: "en",
          tagline: "The Multiverse Unleashed.",
          vote_average: 8.0,
          runtime: 148,
          trailerUrl: "https://www.youtube.com/watch?v=JfVOs4VSpmA"
        },
        {
          _id: "299534",
          title: "Avengers: Endgame",
          overview: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions.",
          poster_path: "/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
          backdrop_path: "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
          genres: [{ id: 28, name: "Action" }, { id: 878, name: "Science Fiction" }, { id: 12, name: "Adventure" }],
          casts: [
            { name: "Robert Downey Jr.", profile_path: "/wo2hJv012qqd0t6Gt75qGAIvixm.jpg" },
            { name: "Chris Evans", profile_path: "/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg" }
          ],
          release_date: "2019-04-24",
          original_language: "en",
          tagline: "Avenge the fallen.",
          vote_average: 8.3,
          runtime: 181,
          trailerUrl: "https://www.youtube.com/watch?v=TcMBFSGZo1A"
        },
        {
          _id: "872585",
          title: "Oppenheimer",
          overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
          poster_path: "/8Gxv2wSbs2eWgH0aStwY26ZmqfO.jpg",
          backdrop_path: "/neeNHeXjMF5fXoCJRsOmkNGC7q.jpg",
          genres: [{ id: 18, name: "Drama" }, { id: 36, name: "History" }],
          casts: [
            { name: "Cillian Murphy", profile_path: "/wo2hJv012qqd0t6Gt75qGAIvixm.jpg" },
            { name: "Emily Blunt", profile_path: "/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg" }
          ],
          release_date: "2023-07-19",
          original_language: "en",
          tagline: "The world forever changes.",
          vote_average: 8.1,
          runtime: 180,
          trailerUrl: "https://www.youtube.com/watch?v=uYPbbksJxIg"
        },
        {
          _id: "558449",
          title: "Gladiator II",
          overview: "Years after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius is forced to enter the Colosseum after his home is conquered by the tyrannical Emperors who now lead Rome.",
          poster_path: "/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
          backdrop_path: "/tOqIwliWMovSIZ9DyvHcHI7p2im.jpg",
          genres: [{ id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 18, name: "Drama" }],
          casts: [
            { name: "Paul Mescal", profile_path: "/wo2hJv012qqd0t6Gt75qGAIvixm.jpg" },
            { name: "Denzel Washington", profile_path: "/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg" }
          ],
          release_date: "2024-11-13",
          original_language: "en",
          tagline: "A hero will rise again.",
          vote_average: 7.2,
          runtime: 148,
          trailerUrl: "https://www.youtube.com/watch?v=1dHQw_t22P8"
        }
      ];
 
      await Movie.create(initialMovies);

      // Fixed far-future showtimes so they remain valid until 2030
      const futureDates = [
        "2026-07-15T14:30:00",
        "2026-12-25T18:00:00",
        "2027-06-10T15:00:00",
        "2028-03-20T16:00:00",
        "2029-11-05T17:00:00",
      ];

      const initialShows = [];
      initialMovies.forEach((movie) => {
        futureDates.forEach((dateStr, i) => {
          initialShows.push({
            movie: movie._id,
            showDateTime: new Date(dateStr),
            showPrice: [250, 350, 250, 300, 300][i],
            occupiedSeats: {}
          });
        });
      });

      await Show.create(initialShows);
      console.log("Database seeded successfully!");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;

import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";
import { useAppContext } from "../../context/AppContext";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const ListShows = () => {
  const { axios, getToken, user } = useAppContext();

  const currency = import.meta.env.VITE_CURRENCY;

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const getAllShow = async () => {
    try {
      const { data } = await axios.get("/api/admin/all-shows", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      setShows(data.shows);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteShow = async (showId, movieTitle) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the show for "${movieTitle}"? This will also remove all bookings linked to this show.`
    );
    if (!confirmed) return;

    setDeletingId(showId);
    try {
      const { data } = await axios.delete(`/api/admin/delete-show/${showId}`, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        toast.success(data.message);
        setShows((prev) => prev.filter((s) => s._id !== showId));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete show");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    if (user) {
      getAllShow();
    }
  }, [user]);

  return !loading ? (
    <>
      <Title text1="List" text2="Shows" />
      <div className="max-w-5xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
          <thead>
            <tr className="bg-primary/20 text-left text-white">
              <th className="p-2 font-medium pl-5">Movie Name</th>
              <th className="p-2 font-medium">Show Time</th>
              <th className="p-2 font-medium">Total Bookings</th>
              <th className="p-2 font-medium">Earnings</th>
              <th className="p-2 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {shows.map((show, index) => (
              <tr
                key={index}
                className="border-b border-primary/10 bg-primary/5 even:bg-primary/10"
              >
                <td className="p-2 min-w-45 pl-5">{show.movie?.title || "Unknown"}</td>
                <td className="p-2">{dateFormat(show.showDateTime)}</td>
                <td className="p-2">
                  {Object.keys(show.occupiedSeats).length}
                </td>
                <td className="p-2">
                  {currency}{" "}
                  {Object.keys(show.occupiedSeats).length * show.showPrice}
                </td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleDeleteShow(show._id, show.movie?.title)}
                    disabled={deletingId === show._id}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 hover:text-red-300 border border-red-500/20 transition duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Delete this show"
                  >
                    <Trash2 size={16} className={deletingId === show._id ? "animate-pulse" : ""} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {shows.length === 0 && (
          <p className="text-gray-400 text-center mt-8 text-sm">No active shows found.</p>
        )}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ListShows;

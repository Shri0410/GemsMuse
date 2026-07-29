import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Journals = () => {
  const [journals, setJournals] = useState([]);
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const res = await fetch("/api/journals");
      const data = await res.json();
      if (Array.isArray(data)) {
        setJournals(data);
      } else {
        setJournals([]);
      }
    } catch (error) {
      console.error("Error fetching journals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this journal?"))
      return;
    try {
      await fetch(`/api/journals/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchJournals();
    } catch (error) {
      console.error("Error deleting journal:", error);
    }
  };

  if (loading)
    return <div className="p-8 text-center">Loading journals...</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8 animate-slide-up">
        <div>
          <h2 className="text-3xl font-serif text-gray-800">Journals</h2>
          <p className="text-gray-500 mt-1">Manage your editorial content</p>
        </div>
        <Link
          to="/dashboard/journals/new"
          className="btn-luxury flex items-center gap-2"
        >
          <span>+ New Story</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in delay-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Article
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {journals.map((journal, index) => (
                <tr
                  key={journal.id}
                  className="hover:bg-amber-50/30 transition-colors duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-16 rounded overflow-hidden bg-gray-100">
                        {journal.image_url ? (
                          <img
                            src={`/${journal.image_url}`}
                            alt={journal.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-300 text-xs">
                            No Img
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900 font-serif max-w-xs truncate">
                          {journal.title}
                        </div>
                        <div className="text-xs text-gray-500 truncate max-w-xs">
                          {journal.excerpt}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-50 text-amber-800">
                      {journal.category || "Uncategorized"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {journal.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-xs text-green-600 font-medium">
                      Published
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/dashboard/journals/${journal.id}`}
                      className="text-amber-600 hover:text-amber-900 mr-4 font-semibold hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(journal.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {journals.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No journal entries found. Create your first story.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Journals;

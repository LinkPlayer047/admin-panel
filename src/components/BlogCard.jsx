export default function BlogCard({ blog, onEdit, onDelete }) {
  return (
    <div className="border rounded shadow bg-white hover:shadow-lg transition overflow-hidden">
      <img src={blog.image} className="h-48 w-full object-cover rounded-t" />

      <div className="p-4 flex flex-col h-full">
        <h2 className="font-bold text-lg break-words">{blog.title}</h2>
        <p className="text-gray-800 break-words">{blog.subtitle}</p>

        <p className="mt-2 text-gray-800 break-words overflow-hidden text-ellipsis max-h-20">
          {blog.content.split(" ").slice(0, 20).join(" ")}...
        </p>

        <div className="flex justify-between mt-3">
          <button
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
            onClick={onEdit}
          >
            Edit
          </button>

          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BlogCard({ blog, onEdit, onDelete }) {
  return (
    <div className="border rounded shadow bg-white overflow-hidden hover:shadow-lg transition">
      <img src={blog.image} className="h-48 w-full object-cover rounded-t" />

      <div className="p-4">
        <h2 className="font-bold text-lg">{blog.title}</h2>
        <p className="text-gray-600">{blog.subtitle}</p>

        <p className="mt-2 leading-relaxed text-gray-700 line-clamp-2">
          {blog.content}
        </p>

        <div className="flex justify-between mt-3">
          <button
            className="bg-yellow-500 text-white px-3 py-1 rounded"
            onClick={onEdit}
          >
            Edit
          </button>

          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BlogCard({ blog, onEdit, onDelete }) {
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden border border-gray-300">
      <img
        src={blog.image}
        alt={blog.title}
        className="h-48 w-full object-cover rounded-t-lg"
      />

      <div className="p-4 flex flex-col h-full">
  <h2 className="text-lg font-bold text-gray-900 break-words mb-1">
    {blog.title}
  </h2>

  <p className="text-gray-700 text-sm break-words mb-2">
    {blog.subtitle}
  </p>

  {/* Content with manual 3-line clamp using inline style */}
  <p
    className="text-gray-800 text-sm"
    style={{
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      wordBreak: "break-all",       // added to fix overflow issue
      overflowWrap: "break-word",   // added to fix overflow issue
    }}
    title={blog.content} // optional: full content on hover tooltip
  >
    {blog.content}
  </p>

  <div className="flex justify-between mt-auto gap-2 pt-3">
    <button
      className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition font-semibold"
      onClick={onEdit}
    >
      Edit
    </button>
    <button
      className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition font-semibold"
      onClick={onDelete}
    >
      Delete
    </button>
  </div>
</div>

    </div>
  );
}

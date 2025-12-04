export default function BlogCard({ blog, onEdit, onDelete }) {
  return (
    <div className="max-w-sm w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-200">
      {/* Blog Image */}
      <img
        src={blog.image}
        alt={blog.title}
        className="h-48 w-full object-cover rounded-t-2xl"
      />

      {/* Blog Content */}
      <div className="p-5 flex flex-col h-full">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 break-words mb-1">
          {blog.title}
        </h2>

        {/* Subtitle */}
        <p className="text-gray-700 text-sm break-words mb-3 line-clamp-1">
          {blog.subtitle}
        </p>

        {/* Content with line-clamp */}
        <p className="text-gray-800 text-sm line-clamp-3 break-words mb-4">
          {blog.content}
        </p>

        {/* Action Buttons */}
        <div className="flex justify-between mt-auto gap-2">
          <button
            onClick={onEdit}
            className="flex-1 bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

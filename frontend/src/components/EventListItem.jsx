const EventListItem = ({ title = "과제 이름", tags = ["#Reading", "#AR"] }) => {
  return (
    <div className="py-2 px-6 grid gap-2 transition-all cursor-pointer hover:bg-red-50">
      <p className="font-medium">{title}</p>
      <ul className="flex gap-2">
        {tags.map((tag) => (
          <li className="text-xs text-gray-500" key={tag}>
            #{tag}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EventListItem

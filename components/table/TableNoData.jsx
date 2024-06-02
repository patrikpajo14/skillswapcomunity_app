export default function TableNoData({ isNotFound, title }) {
  return (
    <tr>
      {isNotFound ? (
        <td colSpan={12}>
          <p className="flex items-center justify-center h-[160px] text-lg font-semibold">
            {title ? title : "No Data In Table"}
          </p>
        </td>
      ) : (
        <td colSpan={12} style={{ padding: 0 }} />
      )}
    </tr>
  );
}

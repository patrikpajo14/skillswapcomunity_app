export default function TableEmptyRows({ emptyRows, height }) {
  if (!emptyRows) {
    return null;
  }

  return (
    <tr
      style={{
        ...(height && {
          height: height * emptyRows,
        }),
      }}
    >
      <td className="p-0" colSpan={9} />
    </tr>
  );
}

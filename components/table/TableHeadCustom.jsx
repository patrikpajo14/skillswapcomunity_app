export default function TableHeadCustom({ headLabel, sx }) {
  return (
    <thead className={sx}>
      <tr>
        {headLabel.map((headCell) => (
          <th
            key={headCell.id}
            align={headCell.align || "left"}
            style={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            {headCell.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

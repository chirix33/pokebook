export function PageSizeSelector({ pageSize, setPageSize }) {
  const options = [8, 10, 20, 24]; // Define the page size options you want to offer

  return (
    <select className='page-size-selector' value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
      {options.map(size => (
        <option key={size} value={size}>{size}</option>
      ))}
    </select>
  )
}

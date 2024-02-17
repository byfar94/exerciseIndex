export default function Sidebar() {
  return (
    <section id='sidebar'>
      <ul>
        <li>
          <a>All</a>
        </li>
      </ul>
      <ul className='bp-list'>
        <p>Body Part:</p>
        <li>
          <a>Hand</a>
        </li>
        <li>
          <a>Wrist</a>
        </li>
        <li>
          <a>Elbow</a>
        </li>
        <li>
          <a>Shoulder</a>
        </li>
      </ul>
      <ul className='et-list'>
        <p>Exercise Type:</p>
        <li>
          <a>AAROM</a>
        </li>
        <li>
          <a>AROM</a>
        </li>
        <li>
          <a>PROM</a>
        </li>
        <li>
          <a>Stretch</a>
        </li>
      </ul>
    </section>
  );
}

const Chartbox = (idname) => {
  return `
    <div class="chartbox">

      <div>
        <select class="chart-selector chart${idname}">
          <option value="bar">Bar Chart</label>
          <option value="line">Line Chart</label>
          <option value="pie">Pie Chart</label>
        </select>
      </div>

      <canvas id="${idname}"></canvas>
    </div>
  `;
};

export default Chartbox;

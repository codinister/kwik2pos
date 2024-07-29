
const Table = ( tablehead,tablebody,tableBodyClass) => (` 
    <div class="div-table">
    <div class="div-table-inner">
        <div class="div-table-head">
            ${tablehead}
              <!--<ul>
                <li>Name</li>
                <li>Phone</li>
                <li>Residence</li>
              </ul>-->
        </div>
        <div class="div-table-body ${tableBodyClass}">
            ${tablebody}
            <!--<ul>
            <li>Name</li>
            <li>Phone</li>
            <li>Residence</li>
            </ul>
            <ul>
            <li>Name</li>
            <li>Phone</li>
            <li>Residence</li>
            </ul>-->
        </div>
        </div>
    </div>

`)

export default Table
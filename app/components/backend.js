import BackendTemplate from "./backendTemplate"
import DataTable from "datatables.net-dt"


const Backend = () => {
    // DataTables initialisation
let table = new DataTable('#myTable', {
    // ... configuration options
});

    return(
        <BackendTemplate>
            <table>
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Date Listed</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>33 19 Ave SW</td>
                        <td>11/05/2025</td>
                        <td>Beutiful 2 story townhouse</td>
                    </tr>
                    <tr>
                        <td>112 Malborough Rd NE</td>
                        <td>2/01/2025</td>
                        <td>Newly built condo with 2 bedroom</td>
                    </tr>
                    <tr>
                        <td>26 Evanston ridge</td>
                        <td>10/12/2025</td>
                        <td>New flat with driveway</td>
                    </tr>
                </tbody>
            </table>
        </BackendTemplate>
    )
}

export default Backend
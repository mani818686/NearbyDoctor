$.ajax({
    url: "/api/other/DoctorAppointments/"+localStorage.userid,
    method: "GET",
    success: function(result) {
        //console.log(JSON.stringify(result.result));
        doctorlist=result.result.Appointments;
        console.log(doctorlist);
        code=`<table class="table">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Patient Name</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>`;
        for(var i=0;i<doctorlist.length;i++)
        {
            code+=` <tr>
            <th scope="row">${i+1}</th>
            <td>${doctorlist[i].PatientName}</td>
            <td>${doctorlist[i].date}</td>
            <td>${doctorlist[i].time}</td>
          </tr>`
        }
        code+=`</tbody>
        </table>`
        $("#doctors").html(code);
    },
    error: function(err) {
        console.log("Error");
       // alert("Please Enter Valid Question") //change this url ....
    }
});
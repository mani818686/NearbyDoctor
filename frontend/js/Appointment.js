
const userId=location.href.split("/").splice(-1)[0]
$.ajax({
    url: "/api/other/Appointments/"+userId,
    method: "GET",
    success: function(result) {
        console.log(result.result);
        data=result.result.Appointments;
        code=`<table class="table">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Doctor Name</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>`;
        for(var i=0;i<data.length;i++)
        {
            code+=` <tr>
            <th scope="row">${i+1}</th>
            <td>${data[i].DoctorName}</td>
            <td>${data[i].date}</td>
            <td>${data[i].time}</td>
          </tr>`
        }
        code+=`</tbody>
        </table>`
        $("#doctors").html(code);
    },
    error: function(err) {
        console.log(err);
       // alert("Please Enter Valid Question") //change this url ....
    }
});